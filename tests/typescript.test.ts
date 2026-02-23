import { RuleTester } from 'eslint';
import tseslint from 'typescript-eslint';
import { describe, it } from 'vitest';
import { typescript } from '@/configs/typescript.js';

/**
 * Tests for the typescript config layer.
 *
 * Rules are pulled directly from the typescript config's plugin reference so
 * tests always reflect the actual registered rule objects and options.
 *
 * Note: type-aware rules require a full TS project and are not tested here.
 * Syntax-only rules are covered using the TS parser.
 */

const tester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        parser: tseslint.parser,
    },
});

// Plugin registered in the upstream base config object.
const tsPlugin = (typescript[0].plugins ?? {})['@typescript-eslint'];

// Our custom rules live in the last config object.
const rules = typescript[typescript.length - 1].rules ?? {};

function opts(entry: unknown): unknown[] {
    return Array.isArray(entry) ? entry.slice(1) : [];
}

describe('typescript config rules', () => {
    it('consistent-type-imports: value import used only as type should become import type', () => {
        tester.run('@typescript-eslint/consistent-type-imports', tsPlugin.rules['consistent-type-imports'], {
            valid: [
                {
                    code: "import type { Foo } from './foo';",
                    options: opts(rules['@typescript-eslint/consistent-type-imports']),
                },
            ],
            invalid: [
                {
                    code: "import { Foo } from './foo'; const x: Foo = 1 as unknown as Foo;",
                    options: opts(rules['@typescript-eslint/consistent-type-imports']),
                    output: "import type { Foo } from './foo'; const x: Foo = 1 as unknown as Foo;",
                    errors: [{ messageId: 'typeOverValue' }],
                },
            ],
        });
    });

    it('no-non-null-assertion: disallows ! operator', () => {
        tester.run('@typescript-eslint/no-non-null-assertion', tsPlugin.rules['no-non-null-assertion'], {
            valid: [{ code: 'const x = foo ?? bar;' }],
            invalid: [
                {
                    code: 'const x = foo!.bar;',
                    errors: [
                        {
                            messageId: 'noNonNull',
                            suggestions: [{ messageId: 'suggestOptionalChain', output: 'const x = foo?.bar;' }],
                        },
                    ],
                },
            ],
        });
    });

    it('no-unused-vars: ignores identifiers prefixed with underscore', () => {
        tester.run('@typescript-eslint/no-unused-vars', tsPlugin.rules['no-unused-vars'], {
            valid: [
                {
                    code: 'const _unused = 1;',
                    options: opts(rules['@typescript-eslint/no-unused-vars']),
                },
                {
                    code: 'const used = 1; console.warn(used);',
                    options: opts(rules['@typescript-eslint/no-unused-vars']),
                },
            ],
            invalid: [
                {
                    code: 'const unused = 1;',
                    options: opts(rules['@typescript-eslint/no-unused-vars']),
                    errors: [{ messageId: 'unusedVar' }],
                },
            ],
        });
    });

    it('no-restricted-types: bans Map type', () => {
        tester.run('@typescript-eslint/no-restricted-types', tsPlugin.rules['no-restricted-types'], {
            valid: [
                {
                    code: 'const x: Record<string, number> = {};',
                    options: opts(rules['@typescript-eslint/no-restricted-types']),
                },
            ],
            invalid: [
                {
                    code: 'const x: Map<string, number> = new Map();',
                    options: opts(rules['@typescript-eslint/no-restricted-types']),
                    errors: [{ message: "Don't use `Map` as a type. Map is not allowed. Use Object instead." }],
                },
            ],
        });
    });

    it('explicit-member-accessibility: requires access modifiers on class members', () => {
        tester.run(
            '@typescript-eslint/explicit-member-accessibility',
            tsPlugin.rules['explicit-member-accessibility'],
            {
                valid: [
                    { code: 'class Foo { public name: string = ""; }' },
                    { code: 'class Foo { private age: number = 0; }' },
                ],
                invalid: [
                    {
                        code: 'class Foo { name: string = ""; }',
                        errors: [
                            {
                                messageId: 'missingAccessibility',
                                suggestions: [
                                    {
                                        messageId: 'addExplicitAccessibility',
                                        output: 'class Foo { public name: string = ""; }',
                                    },
                                    {
                                        messageId: 'addExplicitAccessibility',
                                        output: 'class Foo { private name: string = ""; }',
                                    },
                                    {
                                        messageId: 'addExplicitAccessibility',
                                        output: 'class Foo { protected name: string = ""; }',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            }
        );
    });
});
