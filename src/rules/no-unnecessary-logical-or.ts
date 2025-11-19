import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext, RuleDefinition, RuleDefinitionTypeOptions } from '@eslint/core';
import { getParserServices, getTypeFromESTreeNode, isAnyOrUnknown, isNullishLiteral, isTypeNullable } from '@/utils.js';

type RuleOptions = [];
const MessageIds = 'unnecessaryLogicalOr';
type MessageIds = typeof MessageIds;
type Options = RuleDefinitionTypeOptions & {
    MessageIds: MessageIds;
    RuleOptions: RuleOptions;
};

function createRuleVisitor(context: RuleContext<Options>) {
    return {
        LogicalExpression(node: TSESTree.LogicalExpression) {
            if (node.operator !== '||' || !isNullishLiteral(node.right)) {
                return;
            }

            const services = getParserServices<MessageIds, RuleOptions, Options>(context);

            if (!services.program) return;

            const checker = services.program.getTypeChecker();
            const leftType = getTypeFromESTreeNode(services, checker, node.left);

            if (!isAnyOrUnknown(leftType) && !isTypeNullable(leftType)) {
                context.report({
                    node,
                    messageId: MessageIds,
                });
            }
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
            description: 'Disallow unnecessary logical OR with null or undefined',
            url: 'https://opencover.com/rules/no-unnecessary-logical-or',
        },
        messages: {
            unnecessaryLogicalOr: 'Unnecessary logical OR - the value is not nullable',
        },
        schema: [],
    },
};
