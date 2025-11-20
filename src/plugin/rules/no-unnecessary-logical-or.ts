import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext, RuleDefinition, RuleDefinitionTypeOptions } from '@eslint/core';
import { checkUnnecessaryOperator } from '../utils.js';

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
            checkUnnecessaryOperator(context, node, '||', MessageIds);
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
