// Plugin for the rule no-unnecessary-optional-chain
import type { Rule } from 'eslint';
import type { TSESTree } from '@typescript-eslint/utils';
import { ESLintUtils } from '@typescript-eslint/utils';
import * as ts from 'typescript';

type RuleContext = Parameters<Rule.RuleModule['create']>[0];
type RuleListener = ReturnType<Rule.RuleModule['create']>;

export const rule: Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Disallow unnecessary optional chaining',
		},
		messages: {
			unnecessaryOptionalChain: 'Unnecessary optional chain - the value is not nullable',
		},
		schema: [],
	},
	create(context: RuleContext): RuleListener {
		const services = ESLintUtils.getParserServices(
			context as unknown as Parameters<typeof ESLintUtils.getParserServices>[0]
		);
		const checker = services.program.getTypeChecker();

		return {
			ChainExpression(node: Rule.Node) {
				const tsNode = services.esTreeNodeToTSNodeMap.get(node as unknown as TSESTree.ChainExpression);
				const type = checker.getTypeAtLocation(tsNode);

				// Check if the type includes null or undefined
				const hasNullOrUndefined = (type.flags & (ts.TypeFlags.Null | ts.TypeFlags.Undefined)) !== 0;
				const isUnionWithNullable =
					type.isUnion() &&
					type.types.some((t) => (t.flags & (ts.TypeFlags.Null | ts.TypeFlags.Undefined)) !== 0);

				if (!hasNullOrUndefined && !isUnionWithNullable) {
					context.report({
						node,
						messageId: 'unnecessaryOptionalChain',
					});
				}
			},
		} as RuleListener;
	},
};
