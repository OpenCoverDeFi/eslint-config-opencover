import type { ESLint } from 'eslint';
import {
    complexityRequiresReturnTypeRule,
    filenameNoDotsRule,
    noUnnecessaryAsAssertionRule,
    noUnnecessaryLogicalOrRule,
    noUnnecessaryNullishCoalescingRule,
    noUnnecessaryOptionalChainRule,
    noUnnecessaryTypeofRule,
    todoNoteCommentStyleRule,
} from './rules/index.js';

export default {
    meta: {
        name: 'opencover-eslint',
        version: '3.0.0',
    },
    rules: {
        'no-unnecessary-optional-chain': noUnnecessaryOptionalChainRule,
        'filename-no-dots': filenameNoDotsRule,
        'no-unnecessary-as-assertion': noUnnecessaryAsAssertionRule,
        'no-unnecessary-typeof': noUnnecessaryTypeofRule,
        'no-unnecessary-logical-or': noUnnecessaryLogicalOrRule,
        'no-unnecessary-nullish-coalescing': noUnnecessaryNullishCoalescingRule,
        'complexity-requires-return-type': complexityRequiresReturnTypeRule,
        'todo-note-comment-style': todoNoteCommentStyleRule,
    },
} as const satisfies ESLint.Plugin;
