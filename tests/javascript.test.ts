import { RuleTester } from 'eslint';
import { builtinRules } from 'eslint/use-at-your-own-risk';
import tseslint from 'typescript-eslint';
import { describe, it } from 'vitest';
import { javascript } from '@/configs/javascript.js';

/**
 * Tests for the javascript config layer.
 *
 * Rules are ESLint builtins. We read the configured options directly from
 * the javascript config so tests always reflect the real rule configuration.
 */

const tester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
    },
});

// The rules config object where all our rules live.
const rules = javascript[1].rules ?? {};

// Helper: given a rule entry [severity, ...options], return the options slice.
function opts(entry: unknown): unknown[] {
    return Array.isArray(entry) ? entry.slice(1) : [];
}

describe('javascript config rules', () => {
    it('no-console: allows warn and error, disallows log', () => {
        tester.run('no-console', builtinRules.get('no-console') as NonNullable<ReturnType<typeof builtinRules.get>>, {
            valid: [
                { code: 'console.warn("ok");', options: opts(rules['no-console']) },
                { code: 'console.error("ok");', options: opts(rules['no-console']) },
            ],
            invalid: [
                {
                    code: 'console.log("not ok");',
                    options: opts(rules['no-console']),
                    errors: [
                        {
                            messageId: 'limited',
                            suggestions: [{ messageId: 'removeConsole', output: '' }],
                        },
                    ],
                },
            ],
        });
    });

    it('quotes: enforces single quotes with avoidEscape', () => {
        tester.run('quotes', builtinRules.get('quotes') as NonNullable<ReturnType<typeof builtinRules.get>>, {
            valid: [
                { code: "const x = 'hello';", options: opts(rules['quotes']) },
                { code: 'const x = "it\'s fine";', options: opts(rules['quotes']) },
            ],
            invalid: [
                {
                    code: 'const x = "hello";',
                    options: opts(rules['quotes']),
                    output: "const x = 'hello';",
                    errors: [{ messageId: 'wrongQuotes' }],
                },
            ],
        });
    });

    it('semi: requires semicolons', () => {
        tester.run('semi', builtinRules.get('semi') as NonNullable<ReturnType<typeof builtinRules.get>>, {
            valid: [{ code: 'const x = 1;', options: opts(rules['semi']) }],
            invalid: [
                {
                    code: 'const x = 1',
                    options: opts(rules['semi']),
                    output: 'const x = 1;',
                    errors: [{ messageId: 'missingSemi' }],
                },
            ],
        });
    });

    it('no-restricted-syntax: bans TS enums', () => {
        const tsTester = new RuleTester({
            languageOptions: {
                ecmaVersion: 2022,
                sourceType: 'module',
                parser: tseslint.parser,
            },
        });

        tsTester.run(
            'no-restricted-syntax',
            builtinRules.get('no-restricted-syntax') as NonNullable<ReturnType<typeof builtinRules.get>>,
            {
                valid: [{ code: 'const x = 1;', options: opts(rules['no-restricted-syntax']) }],
                invalid: [
                    {
                        code: 'enum Direction { Up, Down }',
                        options: opts(rules['no-restricted-syntax']),
                        errors: [{ message: 'Enums are not allowed.' }],
                    },
                ],
            }
        );
    });

    it('no-unneeded-ternary: disallows unnecessary ternary expressions', () => {
        tester.run(
            'no-unneeded-ternary',
            builtinRules.get('no-unneeded-ternary') as NonNullable<ReturnType<typeof builtinRules.get>>,
            {
                valid: [{ code: 'const x = a ? b : c;' }],
                invalid: [
                    {
                        code: 'const x = a ? true : false;',
                        output: 'const x = !!a;',
                        errors: [{ messageId: 'unnecessaryConditionalExpression' }],
                    },
                ],
            }
        );
    });

    it('spaced-comment: requires space after //', () => {
        tester.run(
            'spaced-comment',
            builtinRules.get('spaced-comment') as NonNullable<ReturnType<typeof builtinRules.get>>,
            {
                valid: [{ code: '// This is fine', options: opts(rules['spaced-comment']) }],
                invalid: [
                    {
                        code: '//not fine',
                        options: opts(rules['spaced-comment']),
                        output: '// not fine',
                        errors: [{ messageId: 'expectedSpaceAfter' }],
                    },
                ],
            }
        );
    });
});
