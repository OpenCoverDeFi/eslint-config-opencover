import { describe, it, expect } from 'vitest';
import { lint } from './lint.js';

describe('stylistic/quotes', () => {
    it('enforces single quotes', () => {
        const messages = lint('const x = "hello";', 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'stylistic/quotes')).toHaveLength(1);
    });

    it('allows single quotes', () => {
        const messages = lint("const _x = 'hello';", 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'stylistic/quotes')).toHaveLength(0);
    });
});

describe('stylistic/semi', () => {
    it('requires semicolons', () => {
        const messages = lint('const x = 1', 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'stylistic/semi')).toHaveLength(1);
    });

    it('allows semicolons', () => {
        const messages = lint('const _x = 1;', 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'stylistic/semi')).toHaveLength(0);
    });
});

describe('stylistic/spaced-comment', () => {
    it('requires space after //', () => {
        const messages = lint('//not fine', 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'stylistic/spaced-comment')).toHaveLength(1);
    });

    it('allows space after //', () => {
        const messages = lint('// Fine', 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'stylistic/spaced-comment')).toHaveLength(0);
    });
});

describe('stylistic/lines-between-class-members', () => {
    it('requires blank line between multi-line class members', () => {
        const code = [
            'class Foo {',
            '  public a(): void {',
            '    return;',
            '  }',
            '  public b(): void {',
            '    return;',
            '  }',
            '}',
        ].join('\n');
        const messages = lint(code, 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'stylistic/lines-between-class-members')).toHaveLength(1);
    });

    it('allows single-line class members without blank line', () => {
        const code = ['class Foo {', '  public a = 1;', '  public b = 2;', '}'].join('\n');
        const messages = lint(code, 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'stylistic/lines-between-class-members')).toHaveLength(0);
    });
});

describe('stylistic/padding-line-between-statements', () => {
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
