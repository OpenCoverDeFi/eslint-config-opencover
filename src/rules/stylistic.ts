import type { RulesConfig } from '@eslint/core';

export const stylisticRules: Partial<RulesConfig> = {
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
};
