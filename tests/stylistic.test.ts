import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import { stylistic } from '@/configs/stylistic.js';

/**
 * Tests for the stylistic config layer.
 * Rules are pulled from the stylistic config's plugin reference.
 */

const tester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
    },
});

const styPlugin = (stylistic[0].plugins ?? {})['stylistic'];
const rule = styPlugin.rules['padding-line-between-statements'];

describe('stylistic config rules', () => {
    it('padding-line-between-statements: requires blank line before function declarations', () => {
        tester.run('stylistic/padding-line-between-statements', rule, {
            valid: [
                {
                    code: 'const x = 1;\n\nfunction foo() {}',
                    options: [
                        { blankLine: 'always', prev: '*', next: 'function' },
                        { blankLine: 'always', prev: 'function', next: '*' },
                    ],
                },
            ],
            invalid: [
                {
                    code: 'const x = 1;\nfunction foo() {}',
                    output: 'const x = 1;\n\nfunction foo() {}',
                    options: [
                        { blankLine: 'always', prev: '*', next: 'function' },
                        { blankLine: 'always', prev: 'function', next: '*' },
                    ],
                    errors: [{ messageId: 'expectedBlankLine' }],
                },
            ],
        });
    });

    it('padding-line-between-statements: requires blank line after function declarations', () => {
        tester.run('stylistic/padding-line-between-statements', rule, {
            valid: [
                {
                    code: 'function foo() {}\n\nconst x = 1;',
                    options: [
                        { blankLine: 'always', prev: 'function', next: '*' },
                        { blankLine: 'always', prev: '*', next: 'function' },
                    ],
                },
            ],
            invalid: [
                {
                    code: 'function foo() {}\nconst x = 1;',
                    output: 'function foo() {}\n\nconst x = 1;',
                    options: [
                        { blankLine: 'always', prev: 'function', next: '*' },
                        { blankLine: 'always', prev: '*', next: 'function' },
                    ],
                    errors: [{ messageId: 'expectedBlankLine' }],
                },
            ],
        });
    });

    it('padding-line-between-statements: requires blank line before if statements', () => {
        tester.run('stylistic/padding-line-between-statements', rule, {
            valid: [
                {
                    code: 'const x = 1;\n\nif (x) {}',
                    options: [{ blankLine: 'always', prev: '*', next: 'if' }],
                },
            ],
            invalid: [
                {
                    code: 'const x = 1;\nif (x) {}',
                    output: 'const x = 1;\n\nif (x) {}',
                    options: [{ blankLine: 'always', prev: '*', next: 'if' }],
                    errors: [{ messageId: 'expectedBlankLine' }],
                },
            ],
        });
    });
});
