import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync, mkdirSync } from 'fs';
import type { RulesConfig } from '@eslint/core';
import type { Linter } from 'eslint';
import { ESLint } from 'eslint';
import { tempDir } from './global-setup.js';
import defaultConfig from '@/index.js';

type Config = Linter.Config<RulesConfig> | Linter.Config<RulesConfig>[];

export const createTempFile = (filename: string): string => {
    const filePath = join(tempDir, filename);
    const fileDir = dirname(filePath);

    try {
        mkdirSync(fileDir, { recursive: true });
    } catch {
        // Ignore
    }

    writeFileSync(filePath, '', 'utf8');
    return filePath;
};

export const createESLintInstance = (config: Config): ESLint => {
    const configArray = Array.isArray(config) ? config : [config];
    const rootDir = resolve(__dirname, '..');

    return new ESLint({
        overrideConfigFile: true,
        overrideConfig: [
            ...configArray,
            {
                languageOptions: {
                    parserOptions: {
                        projectService: {
                            // NOTE (@eniko1556, 2025-11-19): we need this as we need to create files
                            // For typescript with projectService: true requires files to be created
                            allowDefaultProject: ['.temp/*.ts', '.temp/*.tsx', '.temp/*.test.ts'],
                            maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING: 10000,
                        },
                    },
                },
            },
        ],
        cwd: rootDir,
        ignore: false,
    });
};

export const lintFilePath = async (config: Config, filePath: string): Promise<ESLint.LintResult> => {
    const linter = createESLintInstance(config);
    const results = await linter.lintFiles([filePath]);
    return results[0];
};

export const lintText = async (config: Config, code: string, filePath?: string): Promise<ESLint.LintResult> => {
    return (
        await createESLintInstance(config).lintText(code, {
            filePath: filePath ?? fileURLToPath(import.meta.url),
        })
    )[0];
};

export const lintDefault = async (code: string, filePath?: string) => {
    return await lintText(defaultConfig, code, filePath);
};
