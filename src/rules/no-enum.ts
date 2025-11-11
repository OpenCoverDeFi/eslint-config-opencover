import type { Rule } from 'eslint';
import type { TSESTree } from '@typescript-eslint/utils';

type RuleContext = Parameters<Rule.RuleModule['create']>[0];
type RuleListener = ReturnType<Rule.RuleModule['create']>;

export const rule: Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Disallow TypeScript enums',
		},
		messages: {
			noEnum: 'Enums are not allowed. Use union types or const objects instead.',
		},
		schema: [],
	},
	create(context: RuleContext): RuleListener {
		return {
			TSEnumDeclaration(node: TSESTree.TSEnumDeclaration) {
				context.report({
					node: node,
					messageId: 'noEnum',
				});
			},
		} as unknown as RuleListener;
	},
};
