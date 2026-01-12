import type { RulesConfig } from '@eslint/core';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import vitest from '@vitest/eslint-plugin';

const eslintDisabledRuleByTypescript = tseslint.configs.recommended[1].rules; // Disabled eslint rules that are already handled by typescript
const eslintRecommendedRules = tseslint.configs.recommended[2].rules; // Recommended rules
const eslintRecommendedTypeCheckedOnlyRules = tseslint.configs.recommendedTypeCheckedOnly[2].rules; // Recommended type checked only rules
const eslintStrictTypeCheckedOnlyRules = tseslint.configs.strictTypeCheckedOnly[2].rules; // Strict type checked only rules

const baseEslintRules: Partial<RulesConfig> = {
    // Apply rules here, so glob will be applying to files we want to lint only, and not for everything
    // Also it will be clear what rules are used
    // and we can just use print when updating package versions, and update the Rules.md file
    ...eslint.configs.recommended.rules,
    ...eslintRecommendedRules,
    ...eslintDisabledRuleByTypescript,
    ...eslintRecommendedTypeCheckedOnlyRules,
    ...eslintStrictTypeCheckedOnlyRules,
};

export const openCoverTypescriptRules: Partial<RulesConfig> = {
    ...baseEslintRules,
    // TypeScript rules
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
            },
        },
    ],
    // ESLint rules
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
    'no-use-before-define': ['off'],
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
    // Stylistic rules
    'stylistic/padding-line-between-statements': [
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
    // Import rules
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
    // Unicorn rules
    'unicorn/no-array-callback-reference': 'error',
    'unicorn/filename-case': [
        'error',
        {
            case: 'kebabCase',
        },
    ],
};

export const openCoverTestRules: Partial<RulesConfig> = {
    ...vitest.configs.recommended.rules,
    '@typescript-eslint/no-unsafe-assignment': 'off', // We want expect.any and similar in tests
    'vitest/padding-around-before-all-blocks': 'error',
    'vitest/padding-around-describe-blocks': 'error',
    'vitest/padding-around-before-each-blocks': 'error',
    'vitest/padding-around-after-all-blocks': 'error',
    'vitest/padding-around-after-each-blocks': 'error',
    'vitest/padding-around-test-blocks': 'error',
};
