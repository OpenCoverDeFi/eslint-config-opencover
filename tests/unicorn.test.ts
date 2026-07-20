import { describe, it, expect } from 'vitest';
import { calculateConfig, lint } from './lint.js';

describe('unicorn', () => {
    describe('unicorn/name-replacements', () => {
        it('allows conventional abbreviations', async () => {
            const config = await calculateConfig('file.ts');
            const rule = config?.rules?.['unicorn/name-replacements'];

            expect(Array.isArray(rule) ? rule[0] : rule).toBe(0);
        });
    });

    describe('unicorn/no-array-callback-reference', () => {
        it('allows inline arrow functions', async () => {
            const results = await lint('const result = arr.filter((x) => isValid(x));', 'file.ts');

            results.forEach((result) => {
                expect(result.messages.filter((m) => m.ruleId === 'unicorn/no-array-callback-reference')).toHaveLength(
                    0
                );
            });
        });

        it('allows builtin Boolean reference', async () => {
            const results = await lint('const result = arr.filter(Boolean);', 'file.ts');

            results.forEach((result) => {
                expect(result.messages.filter((m) => m.ruleId === 'unicorn/no-array-callback-reference')).toHaveLength(
                    0
                );
            });
        });

        it('bans user-defined function passed directly', async () => {
            const results = await lint('const result = arr.filter(isValid);', 'file.ts');

            results.forEach((result) => {
                expect(result.messages.filter((m) => m.ruleId === 'unicorn/no-array-callback-reference')).toHaveLength(
                    1
                );
            });
        });
    });

    describe('unicorn/filename-case', () => {
        it('allows kebab-case filenames', async () => {
            const results = await lint('// Ok', 'my-component.ts');

            results.forEach((result) => {
                expect(result.messages.filter((m) => m.ruleId === 'unicorn/filename-case')).toHaveLength(0);
            });
        });

        it('bans PascalCase filenames', async () => {
            const results = await lint('// Bad', 'MyComponent.ts');

            results.forEach((result) => {
                expect(result.messages.filter((m) => m.ruleId === 'unicorn/filename-case')).toHaveLength(1);
            });
        });

        it.each(['js', 'jsx', 'ts', 'tsx'])(
            'allows .%s files in Next.js dynamic route directories',
            async (extension) => {
                const config = await calculateConfig(`src/app/proof-of-cover/[requestId]/page.${extension}`);

                expect(config?.rules?.['unicorn/filename-case']).toEqual([0]);
            }
        );

        it.each(['[...requestIds]', '[[...requestIds]]'])('allows Next.js %s route directories', async (directory) => {
            const config = await calculateConfig(`app/proof-of-cover/${directory}/page.tsx`);

            expect(config?.rules?.['unicorn/filename-case']).toEqual([0]);
        });

        it.each([
            'packages/api/src/app/api/[...slug]/route.ts',
            'packages/app/src/app/alerts/[workspaceId]/page.tsx',
            'packages/admin/app/users/[[...userIds]]/page.tsx',
        ])('allows Next.js dynamic route directories in package workspaces: %s', async (file) => {
            const config = await calculateConfig(file);

            expect(config?.rules?.['unicorn/filename-case']).toEqual([0]);
        });

        it('does not treat other workspace roots as Next.js package workspaces', async () => {
            const config = await calculateConfig('services/api/src/app/api/[...slug]/route.ts');

            expect(config?.rules?.['unicorn/filename-case']).toEqual([2]);
        });

        it('still bans camel-case static route directories', async () => {
            const results = await lint('export {};', 'src/app/proofOfCover/page.js');

            results.forEach((result) => {
                expect(result.messages.filter((m) => m.ruleId === 'unicorn/filename-case')).toHaveLength(1);
            });
        });

        it('still bans PascalCase filenames in static route directories', async () => {
            const results = await lint('export {};', 'src/app/proof-of-cover/MyComponent.js');

            results.forEach((result) => {
                expect(result.messages.filter((m) => m.ruleId === 'unicorn/filename-case')).toHaveLength(1);
            });
        });
    });

    describe('unicorn/prefer-node-protocol', () => {
        it('requires node: protocol for builtins', async () => {
            const results = await lint("import fs from 'fs';", 'file.ts');

            results.forEach((result) => {
                expect(result.messages.filter((m) => m.ruleId === 'unicorn/prefer-node-protocol')).toHaveLength(1);
            });
        });

        it('allows node: protocol', async () => {
            const results = await lint("import fs from 'node:fs';", 'file.ts');

            results.forEach((result) => {
                expect(result.messages.filter((m) => m.ruleId === 'unicorn/prefer-node-protocol')).toHaveLength(0);
            });
        });
    });

    describe('unicorn/prefer-uint8array-base64', () => {
        it('remains enabled when Unicorn removes it from the recommended preset', async () => {
            const config = await calculateConfig('file.ts');

            expect(config?.rules?.['unicorn/prefer-uint8array-base64']).toEqual([2]);
        });
    });
});
