import type { ESLint } from 'eslint';
import { rule as noUnnecessaryOptionalChainRule } from './rules/no-unnecessary-optional-chain.js';
import { rule as filenameNoDotsRule } from './rules/filename-no-dots.js';
import { rule as noUnnecessaryAsAssertionRule } from './rules/no-unnecessary-as-assertion.js';
import { rule as noUnnecessaryTypeofRule } from './rules/no-unnecessary-typeof.js';
import { rule as noUnnecessaryLogicalOrRule } from './rules/no-unnecessary-logical-or.js';
import { rule as noUnnecessaryNullishCoalescingRule } from './rules/no-unnecessary-nullish-coalescing.js';
import { rule as complexityRequiresReturnTypeRule } from './rules/complexity-requires-return-type.js';
import { rule as todoNoteCommentStyleRule } from './rules/todo-note-comment-style.js';

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
