import fs from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { execa } from 'execa';
import { glob } from 'tinyglobby';
import { afterAll, beforeAll, it } from 'vitest';
import type { OptionsConfig, TypedFlatConfigItem } from '@/types.js';

const timeout = 60_000;

beforeAll(async () => {
    await fs.rm('_fixtures', { recursive: true, force: true });
});

afterAll(async () => {
    await fs.rm('_fixtures', { recursive: true, force: true });
});

runWithConfig('default', {});

runWithConfig(
    'react',
    {
        react: true,
    },
    { extraInput: 'fixtures/input-react', skip: true }
);

runWithConfig('no-style', {
    stylistic: false,
});

runWithConfig('no-test', {
    test: false,
});

interface RunOptions {
    extraInput?: string;
    skip?: boolean;
}

function runWithConfig(
    name: string,
    configs: OptionsConfig,
    { skip }: RunOptions = {},
    ...items: TypedFlatConfigItem[]
) {
    const test = skip ? it.skip : it.concurrent;

    test(
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
import opencover from '@opencover/eslint-config'

export default opencover(
  ${JSON.stringify(configs)},
  ...${JSON.stringify(items)},
)
`.trimStart()
            );

            await execa('pnpm', ['exec', 'eslint', '.', '--fix'], {
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
