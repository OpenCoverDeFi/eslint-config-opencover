// Plugin for the rule no-unnecessary-logical-or
import type { TSESTree } from '@typescript-eslint/utils';
import { ESLintUtils } from '@typescript-eslint/utils';
import { createRule, getTypeFromESTreeNode, isAnyOrUnknown, isNullishLiteral, isTypeNullable } from '../utils.js';

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
});
