// Plugin for the rule no-unnecessary-optional-chain
import type { TSESTree } from '@typescript-eslint/utils';
import { ESLintUtils } from '@typescript-eslint/utils';
import * as ts from 'typescript';
import { createRule } from '../utils.js';

export const rule = createRule({
	name: 'no-unnecessary-optional-chain',
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
	defaultOptions: [],
	create(context) {
		const services = ESLintUtils.getParserServices(context);
		const checker = services.program.getTypeChecker();

		return {
			ChainExpression(node: TSESTree.ChainExpression) {
				const tsNode = services.esTreeNodeToTSNodeMap.get(node);
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
		};
	},
});
