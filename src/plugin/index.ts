import type { ESLint } from 'eslint';
import {
    noComplexWithoutReturnTypeRule,
    noDotsInFilenameRule,
    noUnnecessaryAsAssertionRule,
    noUnnecessaryLogicalOrRule,
    noUnnecessaryNullishCoalescingRule,
    noUnnecessaryOptionalChainRule,
    noUnnecessaryTypeofRule,
    todoFormatRule,
} from './rules/index.js';

const plugin = {
    meta: {
        name: 'opencover/eslint/plugin',
        version: '3.0.0',
    },
    rules: {
        'no-unnecessary-optional-chain': noUnnecessaryOptionalChainRule,
        'no-dots-in-filename': noDotsInFilenameRule,
        'no-unnecessary-as-assertion': noUnnecessaryAsAssertionRule,
        'no-unnecessary-typeof': noUnnecessaryTypeofRule,
        'no-unnecessary-logical-or': noUnnecessaryLogicalOrRule,
        'no-unnecessary-nullish-coalescing': noUnnecessaryNullishCoalescingRule,
        'no-complex-without-return-type': noComplexWithoutReturnTypeRule,
        'todo-format': todoFormatRule,
    },
    configs: {
        // NOTE (@eniko1556, 2025-11-21): we can also export third party rules as part of this plugin
        recommended: [
            {
                rules: {
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
                },
            },
        ],
    },
} as const satisfies ESLint.Plugin;

export default plugin;
