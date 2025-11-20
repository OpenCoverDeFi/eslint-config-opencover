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

function getOptionalChainMembers(
    expression: TSESTree.Expression | TSESTree.Super,
    members: Array<{
        node: TSESTree.MemberExpression | TSESTree.CallExpression;
        object: TSESTree.Expression | TSESTree.Super;
    }> = []
): Array<{
    node: TSESTree.MemberExpression | TSESTree.CallExpression;
    object: TSESTree.Expression | TSESTree.Super;
}> {
    if (expression.type === AST_NODE_TYPES.MemberExpression && expression.optional) {
        // For optional member expressions, the object being accessed is nullable
        members.push({
            node: expression,
            object: expression.object,
        });
        return getOptionalChainMembers(expression.object, members);
    }

    if (expression.type === AST_NODE_TYPES.CallExpression && expression.optional) {
        // For optional call expressions, the callee is nullable
        members.push({
            node: expression,
            object: expression.callee,
        });
        return getOptionalChainMembers(expression.callee, members);
    }

    if (expression.type === AST_NODE_TYPES.MemberExpression) {
        return getOptionalChainMembers(expression.object, members);
    }

    if (expression.type === AST_NODE_TYPES.CallExpression) {
        return getOptionalChainMembers(expression.callee, members);
    }

    return members;
}

function createRuleVisitor(context: RuleContext<Options>) {
    return {
        ChainExpression(node: TSESTree.ChainExpression) {
            const services = getParserServices<MessageIds, RuleOptions, Options>(context);

            if (!services.program) return;

            const checker = services.program.getTypeChecker();
            const optionalMembers = getOptionalChainMembers(node.expression);

            optionalMembers.forEach(({ node: memberNode, object }) => {
                if (!isTypeNullable(getTypeFromESTreeNode(services, checker, object))) {
                    context.report({
                        node: memberNode,
                        messageId: MessageIds,
                    });
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
            description: 'Disallow unnecessary optional chaining',
            url: 'https://opencover.com/rules/no-unnecessary-optional-chain',
        },
        messages: {
            unnecessaryOptionalChain: 'Unnecessary optional chain - the value is not nullable',
        },
        schema: [],
    },
};
