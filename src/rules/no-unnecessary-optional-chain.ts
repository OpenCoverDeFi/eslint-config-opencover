// Plugin for the rule no-unnecessary-optional-chain
import type { TSESTree } from '@typescript-eslint/utils';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import type { RuleContext, RuleDefinition, RuleDefinitionTypeOptions } from '@eslint/core';
import { getParserServices, getTypeFromESTreeNode, isTypeNullable } from '../utils.js';

type RuleOptions = [];
const MessageIds = 'unnecessaryOptionalChain';
type MessageIds = typeof MessageIds;

type Options = RuleDefinitionTypeOptions & {
    MessageIds: MessageIds;
    RuleOptions: RuleOptions;
};

function getBaseExpressionBeforeOptionalChain(
    expression: TSESTree.Expression | TSESTree.Super
): TSESTree.Expression | TSESTree.Super {
    if (expression.type === AST_NODE_TYPES.ChainExpression) {
        return getBaseExpressionBeforeOptionalChain(expression.expression);
    }

    if (expression.type === AST_NODE_TYPES.MemberExpression) {
        if (expression.object.type === AST_NODE_TYPES.ChainExpression) {
            return getBaseExpressionBeforeOptionalChain(expression.object);
        }

        return expression.object;
    }

    return expression;
}

function createRuleVisitor(context: RuleContext<Options>) {
    return {
        ChainExpression(node: TSESTree.ChainExpression) {
            const services = getParserServices<MessageIds, RuleOptions, Options>(context);

            if (!services.program) return;

            const checker = services.program.getTypeChecker();
            const baseExpression = getBaseExpressionBeforeOptionalChain(node.expression);

            if (!isTypeNullable(getTypeFromESTreeNode(services, checker, baseExpression))) {
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
        type: 'problem' as const,
        docs: {
            description: 'Disallow unnecessary optional chaining',
            url: 'https://opencover.com/rules/no-unnecessary-optional-chain',
        },
        messages: {
            unnecessaryOptionalChain: 'Unnecessary optional chain - the value is not nullable',
        },
        schema: [],
    },
};
