// Plugin for the rule no-unnecessary-optional-chain.mjs
import { ESLintUtils } from '@typescript-eslint/utils';
import * as ts from 'typescript';

export const rule = ESLintUtils.RuleCreator((name) => `https://your-docs-url/${name}`)({
	name: 'no-unnecessary-optional-chain',
	meta: {
		type: 'problem',
		docs: {
			description: 'Disallow unnecessary optional chaining',
			recommended: 'error',
		},
		messages: {
			unnecessaryOptionalChain: 'Unnecessary optional chain - the value is not nullable',
		},
		schema: [],
	},
	defaultOptions: [],
	create(context) {
		const services = ESLintUtils.getParserServices(context);
		const checker = services.program.getTypeChecker();

		return {
			ChainExpression(node) {
				const tsNode = services.esTreeNodeToTSNodeMap.get(node.expression);
				const type = checker.getTypeAtLocation(tsNode);

				// Check if the type is nullable (null | undefined)
				const isNullable =
					(type.flags & ts.TypeFlags.Null) !== 0 ||
					(type.flags & ts.TypeFlags.Undefined) !== 0 ||
					(type.isUnion() &&
						type.types.some(
							(t) => (t.flags & ts.TypeFlags.Null) !== 0 || (t.flags & ts.TypeFlags.Undefined) !== 0
						));

				if (!isNullable) {
					context.report({
						node,
						messageId: 'unnecessaryOptionalChain',
					});
				}
			},
		};
	},
});
