import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import unicornPlugin from 'eslint-plugin-unicorn';
import vitest from '@vitest/eslint-plugin';
import { defineConfig } from 'eslint/config';
import opencoverPlugin from './opencover-eslint-config.js';

const config = defineConfig([
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        plugins: {
            import: importPlugin,
            unicorn: unicornPlugin,
            '@opencover-eslint': opencoverPlugin,
        },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 2024,
                sourceType: 'module',
                projectService: true,
            },
        },
        settings: {
            'import/resolver': {
                typescript: {},
            },
        },
        rules: {
            '@opencover-eslint/no-unnecessary-optional-chain': 'error',
            '@opencover-eslint/filename-no-dots': [
                'error',
                {
                    ignorePattern: ['^.+\\.config\\.[^.]+$'],
                },
            ],
            '@opencover-eslint/no-unnecessary-as-assertion': 'error',
            '@opencover-eslint/no-unnecessary-typeof': 'error',
            '@opencover-eslint/no-unnecessary-logical-or': 'error',
            '@opencover-eslint/complex-functions-require-return-type': [
                'error',
                {
                    maxComplexity: 10,
                },
            ],
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports',
                    disallowTypeAnnotations: false,
                },
            ],
            '@typescript-eslint/explicit-member-accessibility': 'error',
            '@typescript-eslint/member-ordering': 'error',
            '@typescript-eslint/no-non-null-assertion': 'error',
            '@typescript-eslint/no-restricted-types': [
                'error',
                {
                    types: {
                        Map: {
                            message: 'Map is not allowed. Use Object instead.',
                        },
                        Set: {
                            message: 'Set is not allowed. Use Object instead.',
                        },
                    },
                },
            ],
            'no-restricted-syntax': [
                'error',
                {
                    selector: 'TSEnumDeclaration',
                    message: 'Enums are not allowed.',
                },
            ],
            'block-spacing': ['error', 'always'],
            'capitalized-comments': [
                'warn',
                'always',
                {
                    ignoreConsecutiveComments: true,
                },
            ],
            'comma-spacing': ['error', { before: false, after: true }],
            'import/order': [
                'warn',
                {
                    pathGroups: [
                        {
                            pattern: '@dc/**',
                            group: 'parent',
                            position: 'before',
                        },
                    ],
                },
            ],
            'import/prefer-default-export': 'off',
            'key-spacing': ['warn', { mode: 'strict' }],
            'keyword-spacing': ['error', { before: true }],
            'no-console': ['error', { allow: ['warn', 'error'] }],
            'no-multi-spaces': 'error',
            'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 1 }],
            'no-unneeded-ternary': 'error',
            'no-use-before-define': ['error', { variables: true, functions: true, classes: true }],
            'object-curly-spacing': ['warn', 'always'],
            'quote-props': [1, 'as-needed'],
            quotes: [2, 'single', { avoidEscape: true }],
            semi: ['error', 'always'],
            'space-before-blocks': ['error', 'always'],
            'space-in-parens': ['error', 'never'],
            'space-infix-ops': 'error',
            'spaced-comment': [
                'error',
                'always',
                {
                    block: {
                        balanced: true,
                    },
                },
            ],
            'unicorn/no-array-callback-reference': 'error',
            'unicorn/filename-case': [
                'error',
                {
                    case: 'kebabCase',
                },
            ],
        },
    },
    {
        files: ['**/*.test.ts'],
        plugins: {
            '@vitest': vitest,
        },
        rules: {
            '@vitest/padding-around-before-all-blocks': 'error',
            '@vitest/padding-around-describe-blocks': 'error',
            '@vitest/padding-around-before-each-blocks': 'error',
            '@vitest/padding-around-after-all-blocks': 'error',
            '@vitest/padding-around-after-each-blocks': 'error',
            '@vitest/padding-around-test-blocks': 'error',
        },
        settings: {
            vitest: {
                typecheck: true,
            },
        },
        languageOptions: {
            globals: {
                ...vitest.environments.env.globals,
            },
        },
    },
]);

export default config;
