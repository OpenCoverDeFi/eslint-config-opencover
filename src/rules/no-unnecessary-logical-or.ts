// Plugin for the rule no-unnecessary-logical-or
import type { TSESTree } from '@typescript-eslint/utils';
import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';
import * as ts from 'typescript';
import { createRule } from '../utils.js';

function isNullishLiteral(node: TSESTree.Node): boolean {
	return (
		(node.type === AST_NODE_TYPES.Literal && node.value == null) ||
		(node.type === AST_NODE_TYPES.Identifier && node.name === 'undefined')
	);
}

function isTypeNullable(type: ts.Type): boolean {
	// Check if the type includes null or undefined
	const hasNullOrUndefined = (type.flags & (ts.TypeFlags.Null | ts.TypeFlags.Undefined)) !== 0;
	const isUnionWithNullable =
		type.isUnion() && type.types.some((t) => (t.flags & (ts.TypeFlags.Null | ts.TypeFlags.Undefined)) !== 0);
	return hasNullOrUndefined || isUnionWithNullable;
}

export const rule = createRule({
	name: 'no-unnecessary-logical-or',
	meta: {
		type: 'problem',
		docs: {
			description: 'Disallow unnecessary logical OR with null or undefined',
		},
		messages: {
			unnecessaryLogicalOr: 'Unnecessary logical OR - the value is not nullable',
		},
		schema: [],
	},
	defaultOptions: [],
	create(context) {
		const services = ESLintUtils.getParserServices(context);
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
				const leftTsNode = services.esTreeNodeToTSNodeMap.get(node.left);
				const leftType = checker.getTypeAtLocation(leftTsNode);

				// Skip if the type is any or unknown
				if ((leftType.flags & ts.TypeFlags.Any) !== 0 || (leftType.flags & ts.TypeFlags.Unknown) !== 0) {
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
});
