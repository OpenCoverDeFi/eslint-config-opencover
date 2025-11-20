import type { RulesConfig } from '@eslint/core';

export const unicornRules: Partial<RulesConfig> = {
    'unicorn/no-array-callback-reference': 'error',
    'unicorn/filename-case': [
        'error',
        {
            case: 'kebabCase',
        },
    ],
};
