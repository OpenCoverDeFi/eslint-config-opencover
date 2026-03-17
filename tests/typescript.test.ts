import { describe, it, expect } from 'vitest';
import { lint } from './lint.js';

describe('typescript', () => {
    describe('consistent-type-imports', () => {
        it('requires import type for type-only imports', async () => {
            const results = await lint("import { Foo } from './foo'; const x: Foo = 1 as unknown as Foo;", 'file.ts');

            results.forEach((result) => {
                expect(
                    result.messages.filter((m) => m.ruleId === '@typescript-eslint/consistent-type-imports')
                ).toHaveLength(1);
            });
        });
    });

    describe('no-non-null-assertion', () => {
        it('bans non-null assertions', async () => {
            const results = await lint('const x = foo!.bar;', 'file.ts');

            results.forEach((result) => {
                expect(
                    result.messages.filter((m) => m.ruleId === '@typescript-eslint/no-non-null-assertion')
                ).toHaveLength(1);
            });
        });

        it('allows safe property access', async () => {
            const results = await lint('const _x = foo?.bar;', 'file.ts');

            results.forEach((result) => {
                expect(
                    result.messages.filter((m) => m.ruleId === '@typescript-eslint/no-non-null-assertion')
                ).toHaveLength(0);
            });
        });
    });

    describe('no-unused-vars', () => {
        it('allows underscore-prefixed unused vars', async () => {
            const results = await lint('const _unused = 1;', 'file.ts');

            results.forEach((result) => {
                expect(result.messages.filter((m) => m.ruleId === '@typescript-eslint/no-unused-vars')).toHaveLength(0);
            });
        });

        it('bans unused vars without underscore prefix', async () => {
            const results = await lint('const unused = 1;', 'file.ts');

            results.forEach((result) => {
                expect(result.messages.filter((m) => m.ruleId === '@typescript-eslint/no-unused-vars')).toHaveLength(1);
            });
        });
    });

    describe('no-restricted-types', () => {
        it('bans Map type', async () => {
            const results = await lint('const x: Map<string, number> = new Map();', 'file.ts');

            results.forEach((result) => {
                expect(
                    result.messages.filter((m) => m.ruleId === '@typescript-eslint/no-restricted-types')
                ).toHaveLength(1);
                expect(
                    result.messages.find((m) => m.ruleId === '@typescript-eslint/no-restricted-types')?.message
                ).toContain('Map is not allowed');
            });
        });

        it('allows Record type', async () => {
            const results = await lint('const _x: Record<string, number> = {};', 'file.ts');

            results.forEach((result) => {
                expect(
                    result.messages.filter((m) => m.ruleId === '@typescript-eslint/no-restricted-types')
                ).toHaveLength(0);
            });
        });
    });

    describe('explicit-member-accessibility', () => {
        it('requires access modifiers on class members', async () => {
            const results = await lint('class Foo { name: string = ""; }', 'file.ts');

            results.forEach((result) => {
                expect(
                    result.messages.filter((m) => m.ruleId === '@typescript-eslint/explicit-member-accessibility')
                ).toHaveLength(1);
            });
        });

        it('allows members with explicit access modifiers', async () => {
            const results = await lint('class Foo { public name: string = ""; }', 'file.ts');

            results.forEach((result) => {
                expect(
                    result.messages.filter((m) => m.ruleId === '@typescript-eslint/explicit-member-accessibility')
                ).toHaveLength(0);
            });
        });

        it('allows constructors without access modifier', async () => {
            const results = await lint('class Foo { constructor() {} }', 'file.ts');

            results.forEach((result) => {
                expect(
                    result.messages.filter((m) => m.ruleId === '@typescript-eslint/explicit-member-accessibility')
                ).toHaveLength(0);
            });
        });
    });

    describe('explicit-function-return-type', () => {
        it('requires return type on function declarations', async () => {
            const results = await lint('export function foo() { return 1; }', 'file.ts');

            results.forEach((result) => {
                expect(
                    result.messages.filter((m) => m.ruleId === '@typescript-eslint/explicit-function-return-type')
                ).toHaveLength(1);
            });
        });

        it('requires return type on arrow functions', async () => {
            const results = await lint('export const foo = () => 1;', 'file.ts');

            results.forEach((result) => {
                expect(
                    result.messages.filter((m) => m.ruleId === '@typescript-eslint/explicit-function-return-type')
                ).toHaveLength(1);
            });
        });

        it('allows functions with explicit return types', async () => {
            const results = await lint('export function foo(): number { return 1; }', 'file.ts');

            results.forEach((result) => {
                expect(
                    result.messages.filter((m) => m.ruleId === '@typescript-eslint/explicit-function-return-type')
                ).toHaveLength(0);
            });
        });
    });

    describe('explicit-module-boundary-types', () => {
        it('requires return type on exported functions', async () => {
            const results = await lint('export function foo() { return 1; }', 'file.ts');

            results.forEach((result) => {
                expect(
                    result.messages.filter((m) => m.ruleId === '@typescript-eslint/explicit-module-boundary-types')
                ).toHaveLength(1);
            });
        });

        it('requires return type on exported arrow functions', async () => {
            const results = await lint('export const foo = () => 1;', 'file.ts');

            results.forEach((result) => {
                expect(
                    result.messages.filter((m) => m.ruleId === '@typescript-eslint/explicit-module-boundary-types')
                ).toHaveLength(1);
            });
        });

        it('allows exported functions with explicit return types', async () => {
            const results = await lint('export function foo(): number { return 1; }', 'file.ts');

            results.forEach((result) => {
                expect(
                    result.messages.filter((m) => m.ruleId === '@typescript-eslint/explicit-module-boundary-types')
                ).toHaveLength(0);
            });
        });
    });

    describe('prefer-nullish-coalescing', () => {
        it('allows || in conditional tests', async () => {
            const results = await lint(
                'declare const a: string | undefined; declare const b: string | undefined; if (a || b) {}',
                'file.ts'
            );

            results.forEach((result) => {
                const nullishMessages = result.messages.filter(
                    (m) => m.ruleId === '@typescript-eslint/prefer-nullish-coalescing'
                );
                expect(nullishMessages).toHaveLength(0);
            });
        });

        it('allows || with booleans', async () => {
            const results = await lint('declare const a: boolean; const _x: boolean = a || false;', 'file.ts');

            results.forEach((result) => {
                const nullishMessages = result.messages.filter(
                    (m) => m.ruleId === '@typescript-eslint/prefer-nullish-coalescing'
                );
                expect(nullishMessages).toHaveLength(0);
            });
        });

        it('flags || for nullable string assignment', async () => {
            const results = await lint(
                "declare const a: string | undefined; const _x: string = a || 'fallback';",
                'file.ts'
            );

            results.forEach((result) => {
                expect(
                    result.messages.filter((m) => m.ruleId === '@typescript-eslint/prefer-nullish-coalescing')
                ).toHaveLength(1);
            });
        });
    });

    describe('member-ordering', () => {
        it('enforces member ordering in classes', async () => {
            const code = [
                'class Foo {',
                '  public method(): void { return; }',
                '',
                '  public static field = 1;',
                '}',
            ].join('\n');

            const results = await lint(code, 'file.ts');

            results.forEach((result) => {
                expect(result.messages.filter((m) => m.ruleId === '@typescript-eslint/member-ordering')).toHaveLength(
                    1
                );
            });
        });
    });
});
