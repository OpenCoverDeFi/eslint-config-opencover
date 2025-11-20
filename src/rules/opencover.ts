import type { RulesConfig } from '@eslint/core';

export const opencoverRules: Partial<RulesConfig> = {
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
