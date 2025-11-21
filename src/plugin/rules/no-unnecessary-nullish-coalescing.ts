import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext, RuleDefinition, RuleDefinitionTypeOptions } from '@eslint/core';
import { checkUnnecessaryOperator } from '@/plugin/utils.js';

type RuleOptions = [];
const MessageIds = 'unnecessaryNullishCoalescing';
type MessageIds = typeof MessageIds;
type Options = RuleDefinitionTypeOptions & {
    MessageIds: MessageIds;
    RuleOptions: RuleOptions;
};

function createRuleVisitor(context: RuleContext<Options>) {
    return {
        LogicalExpression(node: TSESTree.LogicalExpression) {
            checkUnnecessaryOperator(context, node, '??', MessageIds);
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
            description: 'Disallow unnecessary nullish coalescing with null or undefined',
            url: 'https://dev.opencover.com/rules/no-unnecessary-nullish-coalescing',
        },
        messages: {
            unnecessaryNullishCoalescing: 'Unnecessary nullish coalescing - the value is not nullable',
        },
        schema: [],
    },
};
