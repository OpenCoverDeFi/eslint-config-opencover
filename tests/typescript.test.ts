import { describe, it, expect } from 'vitest';
import { lint } from './lint.js';

describe('consistent-type-imports', () => {
    it('requires import type for type-only imports', () => {
        const messages = lint("import { Foo } from './foo'; const x: Foo = 1 as unknown as Foo;", 'test.ts');

        expect(messages.filter((m) => m.ruleId === '@typescript-eslint/consistent-type-imports')).toHaveLength(1);
    });
});

describe('no-non-null-assertion', () => {
    it('bans non-null assertions', () => {
        const messages = lint('const x = foo!.bar;', 'test.ts');

        expect(messages.filter((m) => m.ruleId === '@typescript-eslint/no-non-null-assertion')).toHaveLength(1);
    });

    it('allows safe property access', () => {
        const messages = lint('const _x = foo?.bar;', 'test.ts');

        expect(messages.filter((m) => m.ruleId === '@typescript-eslint/no-non-null-assertion')).toHaveLength(0);
    });
});

describe('no-unused-vars', () => {
    it('allows underscore-prefixed unused vars', () => {
        const messages = lint('const _unused = 1;', 'test.ts');

        expect(messages.filter((m) => m.ruleId === '@typescript-eslint/no-unused-vars')).toHaveLength(0);
    });

    it('bans unused vars without underscore prefix', () => {
        const messages = lint('const unused = 1;', 'test.ts');

        expect(messages.filter((m) => m.ruleId === '@typescript-eslint/no-unused-vars')).toHaveLength(1);
    });
});

describe('no-restricted-types', () => {
    it('bans Map type', () => {
        const messages = lint('const x: Map<string, number> = new Map();', 'test.ts');

        expect(messages.filter((m) => m.ruleId === '@typescript-eslint/no-restricted-types')).toHaveLength(1);
        expect(messages.find((m) => m.ruleId === '@typescript-eslint/no-restricted-types')?.message).toContain(
            'Map is not allowed'
        );
    });

    it('allows Record type', () => {
        const messages = lint('const _x: Record<string, number> = {};', 'test.ts');

        expect(messages.filter((m) => m.ruleId === '@typescript-eslint/no-restricted-types')).toHaveLength(0);
    });
});

describe('explicit-member-accessibility', () => {
    it('requires access modifiers on class members', () => {
        const messages = lint('class Foo { name: string = ""; }', 'test.ts');

        expect(messages.filter((m) => m.ruleId === '@typescript-eslint/explicit-member-accessibility')).toHaveLength(1);
    });

    it('allows members with explicit access modifiers', () => {
        const messages = lint('class Foo { public name: string = ""; }', 'test.ts');

        expect(messages.filter((m) => m.ruleId === '@typescript-eslint/explicit-member-accessibility')).toHaveLength(0);
    });

    it('allows constructors without access modifier', () => {
        const messages = lint('class Foo { constructor() {} }', 'test.ts');

        expect(messages.filter((m) => m.ruleId === '@typescript-eslint/explicit-member-accessibility')).toHaveLength(0);
    });
});

describe('explicit-function-return-type', () => {
    it('requires return type on function declarations', () => {
        const messages = lint('export function foo() { return 1; }', 'test.ts');

        expect(messages.filter((m) => m.ruleId === '@typescript-eslint/explicit-function-return-type')).toHaveLength(1);
    });

    it('requires return type on arrow functions', () => {
        const messages = lint('export const foo = () => 1;', 'test.ts');

        expect(messages.filter((m) => m.ruleId === '@typescript-eslint/explicit-function-return-type')).toHaveLength(1);
    });

    it('allows functions with explicit return types', () => {
        const messages = lint('export function foo(): number { return 1; }', 'test.ts');

        expect(messages.filter((m) => m.ruleId === '@typescript-eslint/explicit-function-return-type')).toHaveLength(0);
    });
});

describe('explicit-module-boundary-types', () => {
    it('requires return type on exported functions', () => {
        const messages = lint('export function foo() { return 1; }', 'test.ts');

        expect(messages.filter((m) => m.ruleId === '@typescript-eslint/explicit-module-boundary-types')).toHaveLength(
            1
        );
    });

    it('requires return type on exported arrow functions', () => {
        const messages = lint('export const foo = () => 1;', 'test.ts');

        expect(messages.filter((m) => m.ruleId === '@typescript-eslint/explicit-module-boundary-types')).toHaveLength(
            1
        );
    });

    it('allows exported functions with explicit return types', () => {
        const messages = lint('export function foo(): number { return 1; }', 'test.ts');

        expect(messages.filter((m) => m.ruleId === '@typescript-eslint/explicit-module-boundary-types')).toHaveLength(
            0
        );
    });
});

describe('prefer-nullish-coalescing', () => {
    it('allows || in conditional tests', () => {
        const messages = lint(
            'declare const a: string | undefined; declare const b: string | undefined; if (a || b) {}',
            'test.ts'
        );

        const nullishMessages = messages.filter((m) => m.ruleId === '@typescript-eslint/prefer-nullish-coalescing');
        expect(nullishMessages).toHaveLength(0);
    });

    it.todo('allows || with booleans', () => {
        const messages = lint('declare const a: boolean; const _x: boolean = a || false;', 'test.ts');

        const nullishMessages = messages.filter((m) => m.ruleId === '@typescript-eslint/prefer-nullish-coalescing');
        expect(nullishMessages).toHaveLength(0);
    });

    it('flags || for nullable string assignment', () => {
        const messages = lint("declare const a: string | undefined; const _x: string = a || 'fallback';", 'test.ts');

        expect(messages.filter((m) => m.ruleId === '@typescript-eslint/prefer-nullish-coalescing')).toHaveLength(1);
    });
});

describe('member-ordering', () => {
    it('enforces member ordering in classes', () => {
        const code = ['class Foo {', '  public method(): void { return; }', '', '  public static field = 1;', '}'].join(
            '\n'
        );
        const messages = lint(code, 'test.ts');

        expect(messages.filter((m) => m.ruleId === '@typescript-eslint/member-ordering')).toHaveLength(1);
    });
});
