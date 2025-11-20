import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import unicorn from 'eslint-plugin-unicorn';
import vitest from '@vitest/eslint-plugin';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';
import type { RulesConfig } from '@eslint/core';
import opencover from './opencover/opencover-eslint-config.js';

const GLOBAL_IGNORE_PATTERNS = ['node_modules', 'dist', 'coverage', '.temp', '.git', 'yarn.lock', 'eslint.config.mjs'];

const PARSER_OPTIONS = {
    ecmaVersion: 2024,
    sourceType: 'module',
    projectService: true,
};

const LANGUAGE_OPTIONS = {
    parser: tseslint.parser,
    parserOptions: PARSER_OPTIONS,
};

const opencoverRules: Partial<RulesConfig> = {
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
    '@opencover-eslint/no-unnecessary-nullish-coalescing': 'error',
    '@opencover-eslint/complexity-requires-return-type': [
        'error',
        {
            maxComplexity: 10,
        },
    ],
    '@opencover-eslint/todo-note-comment-style': 'error',
};

const typescriptRules: Partial<RulesConfig> = {
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
    '@typescript-eslint/no-unused-vars': [
        'error',
        {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
        },
    ],
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
};

const eslintRules: Partial<RulesConfig> = {
    'block-spacing': ['error', 'always'],
    'capitalized-comments': [
        'warn',
        'always',
        {
            ignoreConsecutiveComments: true,
        },
    ],
    'comma-spacing': ['error', { before: false, after: true }],
    'key-spacing': ['warn', { mode: 'strict' }],
    'keyword-spacing': ['error', { before: true }],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 1 }],
    'no-restricted-syntax': [
        'error',
        {
            selector: 'TSEnumDeclaration',
            message: 'Enums are not allowed.',
        },
    ],
    'no-unneeded-ternary': 'error',
    'no-use-before-define': ['error', { variables: true, functions: true, classes: true }],
    'object-curly-spacing': ['warn', 'always'],
    'quote-props': ['warn', 'as-needed'],
    quotes: ['error', 'single', { avoidEscape: true }],
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
    'lines-between-class-members': [
        'error',
        'always',
        {
            exceptAfterSingleLine: true,
        },
    ],
};

const stylisticRules: Partial<RulesConfig> = {
    '@stylistic/padding-line-between-statements': [
        'error',
        {
            blankLine: 'always',
            prev: '*',
            next: ['function', 'class', 'export'],
        },
        {
            blankLine: 'always',
            prev: ['function', 'class', 'export'],
            next: '*',
        },
        {
            blankLine: 'always',
            prev: '*',
            next: 'if',
        },
        {
            blankLine: 'always',
            prev: 'block-like',
            next: 'if',
        },
        {
            blankLine: 'always',
            prev: 'if',
            next: '*',
        },
    ],
};

const importRules: Partial<RulesConfig> = {
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
};

const unicornRules: Partial<RulesConfig> = {
    'unicorn/no-array-callback-reference': 'error',
    'unicorn/filename-case': [
        'error',
        {
            case: 'kebabCase',
        },
    ],
};

const vitestPaddingRules: Partial<RulesConfig> = {
    '@vitest/padding-around-before-all-blocks': 'error',
    '@vitest/padding-around-describe-blocks': 'error',
    '@vitest/padding-around-before-each-blocks': 'error',
    '@vitest/padding-around-after-all-blocks': 'error',
    '@vitest/padding-around-after-each-blocks': 'error',
    '@vitest/padding-around-test-blocks': 'error',
};

const config = defineConfig([
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    globalIgnores(GLOBAL_IGNORE_PATTERNS),
    {
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
            import: importPlugin,
            unicorn,
            '@opencover-eslint': opencover,
            '@stylistic': stylistic,
        },
        languageOptions: LANGUAGE_OPTIONS,
        rules: {
            ...opencoverRules,
            ...typescriptRules,
            ...eslintRules,
            ...stylisticRules,
            ...importRules,
            ...unicornRules,
        },
    },
    {
        files: ['tests/**/*.ts', 'tests/**/*.tsx', '**/*.test.ts', '**/*.test.tsx'],
        plugins: {
            '@vitest': vitest,
        },
        languageOptions: {
            ...LANGUAGE_OPTIONS,
            globals: {
                ...vitest.environments.env.globals,
            },
        },
        rules: {
            '@typescript-eslint/no-unsafe-assignment': 'off', // We want expect.any and similar in tests
            ...vitestPaddingRules,
        },
        settings: {
            vitest: {
                typecheck: true,
            },
        },
    },
]);

export default config;
