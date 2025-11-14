// Plugin for the rule no-unnecessary-optional-chain
import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext, RuleDefinition, RuleDefinitionTypeOptions } from '@eslint/core';
import { getParserServices, getTypeFromESTreeNode, isTypeNullable } from '../utils.js';

type RuleOptions = [];
const MessageIds = 'unnecessaryOptionalChain';
type MessageIds = typeof MessageIds;

type Options = RuleDefinitionTypeOptions & {
    MessageIds: MessageIds;
    RuleOptions: RuleOptions;
};

function createRuleVisitor(context: RuleContext<Options>) {
    return {
        ChainExpression(node: TSESTree.ChainExpression) {
            const services = getParserServices<MessageIds, RuleOptions, Options>(context);

            if (!services.program) return;

            // Check if the type includes null or undefined
            if (!isTypeNullable(getTypeFromESTreeNode(services, services.program.getTypeChecker(), node))) {
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
