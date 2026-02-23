import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import { unicorn } from '@/configs/unicorn.js';

/**
 * Tests for the unicorn config layer.
 * Rules are pulled from the unicorn config's plugin reference.
 */

const tester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
    },
});

const unicornPlugin = (unicorn[0].plugins ?? {})['unicorn'];

describe('unicorn config rules', () => {
    it('unicorn/no-array-callback-reference: disallows passing user-defined functions directly as callbacks', () => {
        tester.run('unicorn/no-array-callback-reference', unicornPlugin.rules['no-array-callback-reference'], {
            valid: [
                { code: 'const result = arr.filter((x) => isValid(x));' },
                { code: 'const result = arr.filter(Boolean);' },
            ],
            invalid: [
                {
                    code: 'const result = arr.filter(isValid);',
                    errors: [
                        {
                            messageId: 'error-with-name',
                            suggestions: [
                                {
                                    messageId: 'replace-with-name',
                                    output: 'const result = arr.filter((element) => isValid(element));',
                                },
                                {
                                    messageId: 'replace-with-name',
                                    output: 'const result = arr.filter((element, index) => isValid(element, index));',
                                },
                                {
                                    messageId: 'replace-with-name',
                                    output: 'const result = arr.filter((element, index, array) => isValid(element, index, array));',
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    });

    it('unicorn/filename-case: enforces kebab-case filenames', () => {
        tester.run('unicorn/filename-case', unicornPlugin.rules['filename-case'], {
            valid: [
                {
                    code: '// valid',
                    filename: 'my-component.ts',
                    options: [{ case: 'kebabCase' }],
                },
            ],
            invalid: [
                {
                    code: '// invalid',
                    filename: 'MyComponent.ts',
                    options: [{ case: 'kebabCase' }],
                    errors: [{ messageId: 'filename-case' }],
                },
            ],
        });
    });
});
