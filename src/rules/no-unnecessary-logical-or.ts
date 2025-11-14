// Plugin for the rule no-unnecessary-logical-or
import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext, RuleDefinition, RuleDefinitionTypeOptions } from '@eslint/core';
import {
    getParserServices,
    getTypeFromESTreeNode,
    isAnyOrUnknown,
    isNullishLiteral,
    isTypeNullable,
} from '../utils.js';

type RuleOptions = [];
type MessageIds = 'unnecessaryLogicalOr';

type NoUnnecessaryLogicalOrRuleDefinitionTypeOptions = RuleDefinitionTypeOptions & {
    MessageIds: MessageIds;
    RuleOptions: RuleOptions;
};

export const rule: RuleDefinition<NoUnnecessaryLogicalOrRuleDefinitionTypeOptions> = {
    meta: {
        type: 'problem' as const,
        docs: {
            description: 'Disallow unnecessary logical OR with null or undefined',
            url: 'https://opencover.com/rules/no-unnecessary-logical-or',
        },
        messages: {
            unnecessaryLogicalOr: 'Unnecessary logical OR - the value is not nullable',
        },
        schema: [],
    },
    create(context: RuleContext<NoUnnecessaryLogicalOrRuleDefinitionTypeOptions>) {
        const services = getParserServices<MessageIds, RuleOptions, NoUnnecessaryLogicalOrRuleDefinitionTypeOptions>(
            context
        );
        if (!services.program) {
            return {};
        }
        const checker = services.program.getTypeChecker();

        return {
            LogicalExpression(node: TSESTree.LogicalExpression) {
                if (node.operator !== '||') {
                    return;
                }

                // Check if the right side is null or undefined
                if (!isNullishLiteral(node.right)) {
                    return;
                }

                // Get the type of the left side
                const leftType = getTypeFromESTreeNode(services, checker, node.left);

                // Skip if the type is any or unknown
                if (isAnyOrUnknown(leftType)) {
                    return;
                }

                // Check if the left side is nullable
                if (!isTypeNullable(leftType)) {
                    context.report({
                        node,
                        messageId: 'unnecessaryLogicalOr',
                    });
                }
            },
        };
    },
};
