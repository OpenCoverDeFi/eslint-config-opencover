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

export default {
    meta: {
        name: 'opencover-eslint',
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
} as const satisfies ESLint.Plugin;
