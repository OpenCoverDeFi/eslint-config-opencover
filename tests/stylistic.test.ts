import { describe, it, expect } from 'vitest';
import { lint } from './setup.js';

describe('padding-line-between-statements', () => {
    it('requires blank line before function', () => {
        const messages = lint('const x = 1;\nfunction foo() {}', 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'stylistic/padding-line-between-statements')).toHaveLength(1);
    });

    it('allows blank line before function', () => {
        const messages = lint('const _x = 1;\n\nfunction foo() {}', 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'stylistic/padding-line-between-statements')).toHaveLength(0);
    });

    it('requires blank line after function', () => {
        const messages = lint('function foo() {}\nconst x = 1;', 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'stylistic/padding-line-between-statements')).toHaveLength(1);
    });

    it('requires blank line before if', () => {
        const messages = lint('const x = 1;\nif (x) {}', 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'stylistic/padding-line-between-statements')).toHaveLength(1);
    });

    it('requires blank line before export', () => {
        const messages = lint('const x = 1;\nexport { x };', 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'stylistic/padding-line-between-statements')).toHaveLength(1);
    });

    it('requires blank line before class', () => {
        const messages = lint('const _x = 1;\nclass Foo {}', 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'stylistic/padding-line-between-statements')).toHaveLength(1);
    });
});
