import { describe, it, expect } from 'vitest';
import { lint } from './setup.js';

describe('padding-line-between-statements', () => {
    it('requires blank line before function', () => {
        const messages = lint('const x = 1;\nfunction foo() {}', 'test.ts');

        expect(messages.some((m) => m.ruleId === 'stylistic/padding-line-between-statements')).toBe(true);
    });

    it('requires blank line after function', () => {
        const messages = lint('function foo() {}\nconst x = 1;', 'test.ts');

        expect(messages.some((m) => m.ruleId === 'stylistic/padding-line-between-statements')).toBe(true);
    });

    it('requires blank line before if', () => {
        const messages = lint('const x = 1;\nif (x) {}', 'test.ts');

        expect(messages.some((m) => m.ruleId === 'stylistic/padding-line-between-statements')).toBe(true);
    });
});
