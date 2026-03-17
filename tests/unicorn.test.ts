import { describe, it, expect } from 'vitest';
import { lint } from './lint.js';

describe('unicorn', () => {
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
});
