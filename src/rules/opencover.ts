import type { RulesConfig } from '@eslint/core';

export const opencoverRules: Partial<RulesConfig> = {
    'opencover/no-unnecessary-optional-chain': 'error',
    'opencover/no-dots-in-filename': [
        'error',
        {
            ignorePattern: ['^.+\\.config\\.[^.]+$'],
        },
    ],
    'opencover/no-unnecessary-as-assertion': 'error',
    'opencover/no-unnecessary-typeof': 'error',
    'opencover/no-unnecessary-logical-or': 'error',
    'opencover/no-unnecessary-nullish-coalescing': 'error',
    'opencover/no-complex-without-return-type': [
        'error',
        {
            maxComplexity: 10,
        },
    ],
    'opencover/todo-format': 'error',
};
