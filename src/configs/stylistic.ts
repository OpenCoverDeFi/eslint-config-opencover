import stylisticPlugin from '@stylistic/eslint-plugin';
import { GLOB_SRC } from '../globs.js';
import type { TypedFlatConfigItem } from '../types.js';

export const stylistic: TypedFlatConfigItem[] = [
    {
        name: 'opencover/stylistic',
        files: [GLOB_SRC],
        plugins: {
            stylistic: stylisticPlugin,
        },
        rules: {
            'stylistic/block-spacing': ['error', 'always'],
            'stylistic/comma-spacing': ['error', { before: false, after: true }],
            'stylistic/key-spacing': ['warn', { mode: 'strict' }],
            'stylistic/keyword-spacing': ['error', { before: true }],
            'stylistic/lines-between-class-members': [
                'error',
                'always',
                {
                    exceptAfterSingleLine: true,
                },
            ],
            'stylistic/no-multi-spaces': 'error',
            'stylistic/no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 1 }],
            'stylistic/object-curly-spacing': ['warn', 'always'],
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
            'stylistic/quote-props': ['warn', 'as-needed'],
            'stylistic/quotes': ['error', 'single', { avoidEscape: true }],
            'stylistic/semi': ['error', 'always'],
            'stylistic/space-before-blocks': ['error', 'always'],
            'stylistic/space-in-parens': ['error', 'never'],
            'stylistic/space-infix-ops': 'error',
            'stylistic/spaced-comment': [
                'error',
                'always',
                {
                    block: {
                        balanced: true,
                    },
                },
            ],
        },
    },
];
