import { describe, it, expect } from 'vitest';
import { lint } from './lint.js';

describe('typescript scoping', () => {
    it('does not apply TypeScript rules to .js files', async () => {
        const results = await lint('const _x = 1;', 'file.js');

        results.forEach((result) => {
            expect(result.messages.filter((m) => m.ruleId?.startsWith('@typescript-eslint/'))).toHaveLength(0);
        });
    });

    it('applies TypeScript rules to .ts files', async () => {
        const results = await lint('const unused = 1;', 'tests/scoping.test.ts');

        results.forEach((result) => {
            expect(result.messages.filter((m) => m.ruleId === '@typescript-eslint/no-unused-vars')).toHaveLength(1);
        });
    });
});

describe('test config scoping', () => {
    it('applies vitest rules to test files', async () => {
        const results = await lint("it('no assertion', () => { const x = 1; });", 'tests/scoping.test.ts');

        results.forEach((result) => {
            expect(result.messages.some((m) => m.ruleId?.startsWith('vitest/'))).toBe(true);
        });
    });

    it('does not apply vitest rules to non-test files', async () => {
        const results = await lint('const _x = 1;', 'src/index.ts');

        results.forEach((result) => {
            expect(result.messages.filter((m) => m.ruleId?.startsWith('vitest/'))).toHaveLength(0);
        });
    });
});
