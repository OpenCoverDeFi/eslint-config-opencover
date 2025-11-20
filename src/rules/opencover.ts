import type { RulesConfig } from '@eslint/core';

export const opencoverRules: Partial<RulesConfig> = {
    'opencover/no-unnecessary-optional-chain': 'error',
    'opencover/filename-no-dots': [
        'error',
        {
            ignorePattern: ['^.+\\.config\\.[^.]+$'],
        },
    ],
    'opencover/no-unnecessary-as-assertion': 'error',
    'opencover/no-unnecessary-typeof': 'error',
    'opencover/no-unnecessary-logical-or': 'error',
    'opencover/no-unnecessary-nullish-coalescing': 'error',
    'opencover/complexity-requires-return-type': [
        'error',
        {
            maxComplexity: 10,
        },
    ],
    'opencover/todo-note-comment-style': 'error',
};
