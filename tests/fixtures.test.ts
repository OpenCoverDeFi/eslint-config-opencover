import fs from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execa } from 'execa';
import { glob } from 'tinyglobby';
import { afterAll, beforeAll, it } from 'vitest';
import type { OptionsConfig, TypedFlatConfigItem } from '../src/types.js';

const distDir = resolve(fileURLToPath(import.meta.url), '../../dist');

const isWindows = process.platform === 'win32';
const timeout = isWindows ? 300_000 : 60_000;

beforeAll(async () => {
    await fs.rm('_fixtures', { recursive: true, force: true });
});

afterAll(async () => {
    await fs.rm('_fixtures', { recursive: true, force: true });
});

runWithConfig('default', {});

runWithConfig('react', {
    react: true,
});

runWithConfig('no-style', {
    stylistic: false,
});

runWithConfig('no-test', {
    test: false,
});

function runWithConfig(name: string, configs: OptionsConfig, ...items: TypedFlatConfigItem[]) {
    it.concurrent(
        name,
        async ({ expect }) => {
            const from = resolve('fixtures/input');
            const output = resolve('fixtures/output', name);
            const target = resolve('_fixtures', name);

            await fs.cp(from, target, {
                recursive: true,
                filter: (src) => {
                    return !src.includes('node_modules');
                },
            });

            await fs.writeFile(
                join(target, 'eslint.config.js'),
                `
// @eslint-disable
import opencover from '${join(distDir, 'index.js')}'

export default opencover(
  ${JSON.stringify(configs)},
  ...${JSON.stringify(items)},
)
`.trimStart()
            );

            await execa('npx', ['eslint', '.', '--fix'], {
                cwd: target,
                stdio: 'pipe',
            });

            const files = await glob('**/*', {
                ignore: ['node_modules', 'eslint.config.js'],
                cwd: target,
            });

            await Promise.all(
                files.map(async (file) => {
                    const content = await fs.readFile(join(target, file), 'utf-8');
                    const source = await fs.readFile(join(from, file), 'utf-8');
                    const outputPath = join(output, file);

                    if (content === source) {
                        await fs.rm(outputPath, { force: true });
                        return;
                    }

                    await expect.soft(content).toMatchFileSnapshot(outputPath);
                })
            );
        },
        timeout
    );
}
