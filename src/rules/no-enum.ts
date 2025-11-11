import type { TSESTree } from '@typescript-eslint/utils';
import { createRule } from '../utils.js';

export const rule = createRule({
	name: 'no-enum',
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
	defaultOptions: [],
	create(context) {
		return {
			TSEnumDeclaration(node: TSESTree.TSEnumDeclaration) {
				context.report({
					node: node,
					messageId: 'noEnum',
				});
			},
		};
	},
});
