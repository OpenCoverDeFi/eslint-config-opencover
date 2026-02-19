import fs from 'node:fs/promises';
import { join, resolve } from 'node:path';
import type { RulesConfig } from '@eslint/core';
import type { Linter } from 'eslint';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { ESLint } from 'eslint';
import { glob } from 'tinyglobby';
import opencover from '@/index.js';
import opencoverReact from '@/react.js';

const isWindows = process.platform === 'win32';
const timeout = isWindows ? 300_000 : 60_000;

const DEFAULT_PROJECT_SERVICE_CONFIG = {
    languageOptions: {
        parserOptions: {
            projectService: {
                allowDefaultProject: ['_fixtures/**/*.ts', '_fixtures/**/*.tsx', '_fixtures/**/*.js'],
                maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING: 10000,
            },
        },
    },
} as const satisfies Linter.Config<RulesConfig>;

beforeAll(async () => {
    await fs.rm('_fixtures', { recursive: true, force: true });
});

afterAll(async () => {
    await fs.rm('_fixtures', { recursive: true, force: true });
});

describe('Fixture-based tests', () => {
    runWithConfig('default', async () => await opencover());
    runWithConfig('react', async () => await opencoverReact());
});

function runWithConfig(name: string, configFactory: () => Promise<Linter.Config<RulesConfig>[]>) {
    it(
        name,
        async () => {
            const from = resolve('tests/fixtures/input');
            const output = resolve('tests/fixtures/output', name);
            const target = resolve('_fixtures', name);

            // Copy input fixtures to temp directory
            await fs.cp(from, target, {
                recursive: true,
                filter: (src) => {
                    return !src.includes('node_modules');
                },
            });

            // Get the config
            const config = await configFactory();

            // Create ESLint instance
            const eslint = new ESLint({
                overrideConfigFile: true,
                overrideConfig: [...config, DEFAULT_PROJECT_SERVICE_CONFIG],
                ignore: false,
                cwd: target,
            });

            // Get all files to lint
            const files = await glob(['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'], {
                cwd: target,
                ignore: ['node_modules', 'tsconfig.json'],
                absolute: true,
            });

            // Lint and fix all files
            const results = await eslint.lintFiles(files);
            await ESLint.outputFixes(results);

            // Compare each file with snapshots
            for (const file of files) {
                const relativePath = file.replace(target + '/', '');
                const content = await fs.readFile(file, 'utf-8');
                const source = await fs.readFile(join(from, relativePath), 'utf-8');
                const outputPath = join(output, relativePath);

                // If content hasn't changed, remove the output file (if exists)
                if (content === source) {
                    await fs.rm(outputPath, { force: true }).catch(() => {});
                    continue;
                }

                // Write the fixed content as a snapshot and verify
                await fs.mkdir(join(output, relativePath.split('/').slice(0, -1).join('/')), { recursive: true });
                await expect.soft(content).toMatchFileSnapshot(outputPath);
            }
        },
        timeout
    );
}
