// Plugin for the rule no-unnecessary-optional-chain
import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext, RuleDefinition, RuleDefinitionTypeOptions } from '@eslint/core';
import { getParserServices, getTypeFromESTreeNode, isTypeNullable } from '../utils.js';

type RuleOptions = [];
type MessageIds = 'unnecessaryOptionalChain';

type NoUnnecessaryOptionalChainRuleDefinitionTypeOptions = RuleDefinitionTypeOptions & {
    MessageIds: MessageIds;
    RuleOptions: RuleOptions;
};

export const rule: RuleDefinition<NoUnnecessaryOptionalChainRuleDefinitionTypeOptions> = {
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
    create(context: RuleContext<NoUnnecessaryOptionalChainRuleDefinitionTypeOptions>) {
        const services = getParserServices<
            MessageIds,
            RuleOptions,
            NoUnnecessaryOptionalChainRuleDefinitionTypeOptions
        >(context);
        if (!services.program) {
            return {};
        }
        const checker = services.program.getTypeChecker();

        return {
            ChainExpression(node: TSESTree.ChainExpression) {
                const type = getTypeFromESTreeNode(services, checker, node);

                // Check if the type includes null or undefined
                if (!isTypeNullable(type)) {
                    context.report({
                        node,
                        messageId: 'unnecessaryOptionalChain',
                    });
                }
            },
        };
    },
};
