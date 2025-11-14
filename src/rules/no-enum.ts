// Rules/no-enum.ts
import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext, RuleDefinition, RuleDefinitionTypeOptions } from '@eslint/core';

type RuleOptions = [];
type MessageIds = 'noEnum';

type NoEnumRuleDefinitionTypeOptions = RuleDefinitionTypeOptions & {
    MessageIds: MessageIds;
    RuleOptions: RuleOptions;
};

export const rule: RuleDefinition<NoEnumRuleDefinitionTypeOptions> = {
    meta: {
        type: 'problem' as const,
        docs: {
            description: 'Disallow TypeScript enums',
            url: 'https://opencover.com/rules/no-enum',
        },
        messages: { noEnum: 'Enums are not allowed.' },
        schema: [],
    },
    create(context: RuleContext<NoEnumRuleDefinitionTypeOptions>) {
        return {
            TSEnumDeclaration(node: TSESTree.TSEnumDeclaration) {
                context.report({ node, messageId: 'noEnum' });
            },
        };
    },
};
