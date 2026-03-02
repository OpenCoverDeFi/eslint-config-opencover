import { describe, it, expect } from 'vitest';
import { lint } from './setup.js';

describe('no-console', () => {
    it('allows console.warn and console.error', () => {
        const messages = lint('console.warn("ok"); console.error("ok");', 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'no-console')).toHaveLength(0);
    });

    it('disallows console.log', () => {
        const messages = lint('console.log("not ok");', 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'no-console')).toHaveLength(1);
    });
});

describe('quotes', () => {
    it('enforces single quotes', () => {
        const messages = lint('const x = "hello";', 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'quotes')).toHaveLength(1);
    });

    it('allows single quotes', () => {
        const messages = lint("const _x = 'hello';", 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'quotes')).toHaveLength(0);
    });
});

describe('semi', () => {
    it('requires semicolons', () => {
        const messages = lint('const x = 1', 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'semi')).toHaveLength(1);
    });

    it('allows semicolons', () => {
        const messages = lint('const _x = 1;', 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'semi')).toHaveLength(0);
    });
});

describe('no-restricted-syntax', () => {
    it('bans TS enums', () => {
        const messages = lint('enum Direction { Up, Down }', 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'no-restricted-syntax')).toHaveLength(1);
        expect(messages.find((m) => m.ruleId === 'no-restricted-syntax')?.message).toContain('Enums are not allowed');
    });

    it('allows union types as enum alternatives', () => {
        const messages = lint("type Direction = 'up' | 'down';", 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'no-restricted-syntax')).toHaveLength(0);
    });
});

describe('no-unneeded-ternary', () => {
    it('bans boolean ternaries', () => {
        const messages = lint('const x = a ? true : false;', 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'no-unneeded-ternary')).toHaveLength(1);
    });

    it('allows non-trivial ternaries', () => {
        const messages = lint("const _x = a ? 'yes' : 'no';", 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'no-unneeded-ternary')).toHaveLength(0);
    });
});

describe('spaced-comment', () => {
    it('requires space after //', () => {
        const messages = lint('//not fine', 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'spaced-comment')).toHaveLength(1);
    });

    it('allows space after //', () => {
        const messages = lint('// Fine', 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'spaced-comment')).toHaveLength(0);
    });
});

describe('capitalized-comments', () => {
    it('warns on lowercase comments', () => {
        const messages = lint('// not capitalized', 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'capitalized-comments')).toHaveLength(1);
    });

    it('allows capitalized comments', () => {
        const messages = lint('// Fine comment', 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'capitalized-comments')).toHaveLength(0);
    });
});

describe('lines-between-class-members', () => {
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

        expect(messages.filter((m) => m.ruleId === 'lines-between-class-members')).toHaveLength(1);
    });

    it('allows single-line class members without blank line', () => {
        const code = ['class Foo {', '  public a = 1;', '  public b = 2;', '}'].join('\n');
        const messages = lint(code, 'test.ts');

        expect(messages.filter((m) => m.ruleId === 'lines-between-class-members')).toHaveLength(0);
    });
});
