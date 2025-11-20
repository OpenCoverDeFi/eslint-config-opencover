import type { RulesConfig } from '@eslint/core';

export const importRules: Partial<RulesConfig> = {
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
