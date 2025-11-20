import type { RuleContext, RuleDefinition, RuleDefinitionTypeOptions } from '@eslint/core';
import { TSESTree } from '@typescript-eslint/utils';

type RuleOptions = [];
const MessageIds = 'invalidTodoNoteFormat' as const;
type MessageIds = typeof MessageIds;
type Options = RuleDefinitionTypeOptions & {
    MessageIds: MessageIds;
    RuleOptions: RuleOptions;
};

const TODO_NOTE_PATTERN = /^\s+(TODO|NOTE).*/i;
const VALID_FORMAT_PATTERN = /^\s+(TODO|NOTE)\s+\(([^,]+),\s*(\d{4}-\d{2}-\d{2})\)\s*:/;

function createRuleVisitor(context: RuleContext<Options>) {
    return {
        Program(node: TSESTree.Program) {
            const comments = node.comments || [];

            comments.forEach((comment) => {
                if (comment.type === TSESTree.AST_TOKEN_TYPES.Line) {
                    const commentText = comment.value;

                    if (TODO_NOTE_PATTERN.test(commentText) && !VALID_FORMAT_PATTERN.test(commentText)) {
                        context.report({
                            node: comment,
                            messageId: MessageIds,
                        });
                    }
                }
            });
        },
    };
}

export const rule: RuleDefinition<Options> = {
    create(context: RuleContext<Options>) {
        return createRuleVisitor(context);
    },
    meta: {
        type: 'suggestion' as const,
        docs: {
            description: 'Enforce specific style for TODO and NOTE comments',
            url: 'https://dev.opencover.com/rules/todo-note-comment-style',
        },
        messages: {
            invalidTodoNoteFormat:
                'TODO and NOTE comments must follow the format: // NOTE (@username, YYYY-MM-DD): or // TODO (@username, YYYY-MM-DD):',
        },
        schema: [],
    },
};
