import { RuleTester } from 'eslint';
import tseslint from 'typescript-eslint';
import { describe, it } from 'vitest';
import { test } from '@/configs/test.js';

/**
 * Tests for the test config layer.
 * Rules are pulled from the test config's plugin reference.
 */

const tester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        parser: tseslint.parser,
        globals: test[0].languageOptions?.globals,
    },
});

const vitestPlugin = (test[0].plugins ?? {})['vitest'];

describe('test config rules', () => {
    it('vitest/expect-expect: warns when a test has no assertions', () => {
        tester.run('vitest/expect-expect', vitestPlugin.rules['expect-expect'], {
            valid: [{ code: "it('passes', () => { expect(1).toBe(1); });" }],
            invalid: [
                {
                    code: "it('no assertion', () => { const x = 1; });",
                    errors: [{ messageId: 'noAssertions' }],
                },
            ],
        });
    });

    it('vitest/no-identical-title: disallows duplicate test names', () => {
        tester.run('vitest/no-identical-title', vitestPlugin.rules['no-identical-title'], {
            valid: [{ code: "it('test one', () => {}); it('test two', () => {});" }],
            invalid: [
                {
                    code: "it('duplicate', () => {}); it('duplicate', () => {});",
                    errors: [{ messageId: 'multipleTestTitle' }],
                },
            ],
        });
    });

    it('vitest/padding-around-test-blocks: requires blank lines around test blocks', () => {
        tester.run('vitest/padding-around-test-blocks', vitestPlugin.rules['padding-around-test-blocks'], {
            valid: [{ code: "const x = 1;\n\nit('test', () => {});\n\nconst y = 2;" }],
            invalid: [
                {
                    code: "const x = 1;\nit('test', () => {});",
                    output: "const x = 1;\n\nit('test', () => {});",
                    errors: [{ messageId: 'missingPadding' }],
                },
            ],
        });
    });

    it('vitest/padding-around-describe-blocks: requires blank lines around describe blocks', () => {
        tester.run('vitest/padding-around-describe-blocks', vitestPlugin.rules['padding-around-describe-blocks'], {
            valid: [{ code: "const x = 1;\n\ndescribe('suite', () => {});\n\nconst y = 2;" }],
            invalid: [
                {
                    code: "const x = 1;\ndescribe('suite', () => {});",
                    output: "const x = 1;\n\ndescribe('suite', () => {});",
                    errors: [{ messageId: 'missingPadding' }],
                },
            ],
        });
    });
});
