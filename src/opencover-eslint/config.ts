import type { ESLint } from 'eslint';
import { rule as noUnnecessaryOptionalChainRule } from './rule-definitions/no-unnecessary-optional-chain.js';
import { rule as filenameNoDotsRule } from './rule-definitions/filename-no-dots.js';
import { rule as noUnnecessaryAsAssertionRule } from './rule-definitions/no-unnecessary-as-assertion.js';
import { rule as noUnnecessaryTypeofRule } from './rule-definitions/no-unnecessary-typeof.js';
import { rule as noUnnecessaryLogicalOrRule } from './rule-definitions/no-unnecessary-logical-or.js';
import { rule as noUnnecessaryNullishCoalescingRule } from './rule-definitions/no-unnecessary-nullish-coalescing.js';
import { rule as complexityRequiresReturnTypeRule } from './rule-definitions/complexity-requires-return-type.js';
import { rule as todoNoteCommentStyleRule } from './rule-definitions/todo-note-comment-style.js';

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
