import { describe, it, expect } from 'vitest';
import { lint } from './setup.js';

describe('typescript scoping', () => {
    it('does not apply TypeScript rules to .js files', () => {
        const messages = lint('const _x = 1;', 'file.js');

        expect(messages.filter((m) => m.ruleId?.startsWith('@typescript-eslint/'))).toHaveLength(0);
    });

    it('applies TypeScript rules to .ts files', () => {
        const messages = lint('const unused = 1;', 'file.ts');

        expect(messages.filter((m) => m.ruleId === '@typescript-eslint/no-unused-vars')).toHaveLength(1);
    });
});

describe('test config scoping', () => {
    it('applies vitest rules to test files', () => {
        const messages = lint("it('no assertion', () => { const x = 1; });", 'foo.test.ts');

        expect(messages.some((m) => m.ruleId?.startsWith('vitest/'))).toBe(true);
    });

    it('does not apply vitest rules to non-test files', () => {
        const messages = lint('const _x = 1;', 'foo.ts');

        expect(messages.filter((m) => m.ruleId?.startsWith('vitest/'))).toHaveLength(0);
    });
});
