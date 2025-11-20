import type { RulesConfig } from '@eslint/core';

export const typescriptRules: Partial<RulesConfig> = {
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
