import type { RulesConfig } from '@eslint/core';
import js from '@eslint/js';
import type { TypedFlatConfigItem } from '../types.js';
import { GLOB_SRC } from '../globs.js';

export function javascript(overrides: Partial<RulesConfig> = {}): TypedFlatConfigItem[] {
    return [
        {
            name: 'opencover/javascript/setup',
            plugins: {
                js,
            },
        },
        {
            name: 'opencover/javascript/rules',
            files: [GLOB_SRC],
            rules: {
                ...js.configs.recommended.rules,

                // Custom OpenCover rules
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

                ...overrides,
            },
        },
    ];
}
