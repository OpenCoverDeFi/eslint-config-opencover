import { describe, it, expect } from 'vitest';
import { lint } from './setup.js';

describe('consistent-type-imports', () => {
    it('requires import type for type-only imports', () => {
        const messages = lint("import { Foo } from './foo'; const x: Foo = 1 as unknown as Foo;", 'test.ts');

        expect(messages.some((m) => m.ruleId === '@typescript-eslint/consistent-type-imports')).toBe(true);
    });
});

describe('no-non-null-assertion', () => {
    it('bans non-null assertions', () => {
        const messages = lint('const x = foo!.bar;', 'test.ts');

        expect(messages.some((m) => m.ruleId === '@typescript-eslint/no-non-null-assertion')).toBe(true);
    });
});

describe('no-unused-vars', () => {
    it('allows underscore-prefixed unused vars', () => {
        const messages = lint('const _unused = 1;', 'test.ts');

        expect(messages.filter((m) => m.ruleId === '@typescript-eslint/no-unused-vars')).toHaveLength(0);
    });

    it('bans unused vars without underscore prefix', () => {
        const messages = lint('const unused = 1;', 'test.ts');

        expect(messages.some((m) => m.ruleId === '@typescript-eslint/no-unused-vars')).toBe(true);
    });
});

describe('no-restricted-types', () => {
    it('bans Map type', () => {
        const messages = lint('const x: Map<string, number> = new Map();', 'test.ts');

        expect(messages.some((m) => m.ruleId === '@typescript-eslint/no-restricted-types')).toBe(true);
    });
});

describe('explicit-member-accessibility', () => {
    it('requires access modifiers on class members', () => {
        const messages = lint('class Foo { name: string = ""; }', 'test.ts');

        expect(messages.some((m) => m.ruleId === '@typescript-eslint/explicit-member-accessibility')).toBe(true);
    });
});
