import type { TSESTree } from '@typescript-eslint/utils';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import { createRule } from '../utils.js';

type FunctionNode = TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression;

function traverse(node: TSESTree.Node, state: { complexity: number }): void {
	// Count decision points based on node type
	switch (node.type) {
		case AST_NODE_TYPES.IfStatement: {
			state.complexity++;
			traverse(node.test, state);
			traverse(node.consequent, state);
			if (node.alternate) {
				traverse(node.alternate, state);
			}
			return;
		}

		case AST_NODE_TYPES.SwitchStatement: {
			traverse(node.discriminant, state);
			for (const switchCase of node.cases) {
				state.complexity++; // Each case adds complexity
				if (switchCase.test) {
					traverse(switchCase.test, state);
				}
				for (const statement of switchCase.consequent) {
					traverse(statement, state);
				}
			}
			return;
		}

		case AST_NODE_TYPES.SwitchCase: {
			// SwitchCase is already handled in SwitchStatement
			// This case is here for completeness but shouldn't be hit in normal traversal
			if (node.test) {
				traverse(node.test, state);
			}
			for (const statement of node.consequent) {
				traverse(statement, state);
			}
			return;
		}

		case AST_NODE_TYPES.ForStatement: {
			state.complexity++;
			if (node.init) {
				traverse(node.init, state);
			}
			if (node.test) {
				traverse(node.test, state);
			}
			if (node.update) {
				traverse(node.update, state);
			}
			traverse(node.body, state);
			return;
		}

		case AST_NODE_TYPES.ForInStatement: {
			state.complexity++;
			traverse(node.left, state);
			traverse(node.right, state);
			traverse(node.body, state);
			return;
		}

		case AST_NODE_TYPES.ForOfStatement: {
			state.complexity++;
			traverse(node.left, state);
			traverse(node.right, state);
			traverse(node.body, state);
			return;
		}

		case AST_NODE_TYPES.WhileStatement: {
			state.complexity++;
			traverse(node.test, state);
			traverse(node.body, state);
			return;
		}

		case AST_NODE_TYPES.DoWhileStatement: {
			state.complexity++;
			traverse(node.body, state);
			traverse(node.test, state);
			return;
		}

		case AST_NODE_TYPES.ConditionalExpression: {
			state.complexity++;
			traverse(node.test, state);
			traverse(node.consequent, state);
			traverse(node.alternate, state);
			return;
		}

		case AST_NODE_TYPES.LogicalExpression: {
			if (node.operator === '||' || node.operator === '&&') {
				state.complexity++;
			}
			traverse(node.left, state);
			traverse(node.right, state);
			return;
		}

		case AST_NODE_TYPES.BlockStatement: {
			for (const statement of node.body) {
				traverse(statement, state);
			}
			return;
		}

		case AST_NODE_TYPES.ExpressionStatement: {
			traverse(node.expression, state);
			return;
		}

		case AST_NODE_TYPES.ReturnStatement: {
			if (node.argument) {
				traverse(node.argument, state);
			}
			return;
		}

		case AST_NODE_TYPES.VariableDeclaration: {
			for (const declarator of node.declarations) {
				if (declarator.init) {
					traverse(declarator.init, state);
				}
			}
			return;
		}

		case AST_NODE_TYPES.AssignmentExpression: {
			traverse(node.left, state);
			traverse(node.right, state);
			return;
		}

		case AST_NODE_TYPES.BinaryExpression: {
			traverse(node.left, state);
			traverse(node.right, state);
			return;
		}

		case AST_NODE_TYPES.UnaryExpression: {
			traverse(node.argument, state);
			return;
		}

		case AST_NODE_TYPES.CallExpression: {
			traverse(node.callee, state);
			for (const arg of node.arguments) {
				traverse(arg, state);
			}
			return;
		}

		case AST_NODE_TYPES.MemberExpression: {
			traverse(node.object, state);
			if (node.computed) {
				traverse(node.property, state);
			}
			return;
		}

		case AST_NODE_TYPES.ArrayExpression: {
			for (const element of node.elements) {
				if (element) {
					traverse(element, state);
				}
			}
			return;
		}

		case AST_NODE_TYPES.ObjectExpression: {
			for (const property of node.properties) {
				if (property.type === AST_NODE_TYPES.Property) {
					traverse(property.key, state);
					traverse(property.value, state);
				}
			}
			return;
		}

		case AST_NODE_TYPES.SequenceExpression: {
			for (const expression of node.expressions) {
				traverse(expression, state);
			}
			return;
		}

		case AST_NODE_TYPES.LabeledStatement: {
			traverse(node.body, state);
			return;
		}

		case AST_NODE_TYPES.BreakStatement:
		case AST_NODE_TYPES.ContinueStatement:
		case AST_NODE_TYPES.ThrowStatement: {
			if ('argument' in node) {
				traverse(node.argument, state);
			}
			return;
		}

		case AST_NODE_TYPES.TryStatement: {
			traverse(node.block, state);
			if (node.handler) {
				if (node.handler.param) {
					traverse(node.handler.param, state);
				}
				traverse(node.handler.body, state);
			}
			if (node.finalizer) {
				traverse(node.finalizer, state);
			}
			return;
		}

		case AST_NODE_TYPES.WithStatement: {
			traverse(node.object, state);
			traverse(node.body, state);
			return;
		}

		default:
			// For other node types, recursively traverse children if they exist
			// This handles any node types we might have missed
			if ('body' in node && node.body) {
				const body = node.body;
				if (Array.isArray(body)) {
					for (const child of body) {
						traverse(child, state);
					}
				} else {
					traverse(body, state);
				}
			}
			if ('test' in node && node.test) {
				traverse(node.test as TSESTree.Node, state);
			}
			if ('consequent' in node && node.consequent) {
				const consequent = node.consequent as TSESTree.Statement[];
				if (Array.isArray(consequent)) {
					for (const stmt of consequent) {
						traverse(stmt, state);
					}
				} else {
					traverse(consequent, state);
				}
			}
			if ('alternate' in node && node.alternate) {
				traverse(node.alternate as TSESTree.Node, state);
			}
			if ('expressions' in node && Array.isArray(node.expressions)) {
				for (const expr of node.expressions) {
					traverse(expr, state);
				}
			}
			if ('arguments' in node && Array.isArray(node.arguments)) {
				for (const arg of node.arguments) {
					traverse(arg, state);
				}
			}
			if ('elements' in node && Array.isArray(node.elements)) {
				for (const element of node.elements) {
					if (element) {
						traverse(element, state);
					}
				}
			}
			if ('properties' in node && Array.isArray(node.properties)) {
				for (const prop of node.properties) {
					if ('value' in prop) {
						traverse(prop.value as TSESTree.Node, state);
					}
					if ('key' in prop) {
						traverse(prop.key as TSESTree.Node, state);
					}
				}
			}
	}
}

function calculateComplexity(node: FunctionNode): number {
	const state = { complexity: 1 }; // Base complexity

	// Get the function body
	const body = node.body;
	// Traverse the AST starting from the function body
	traverse(body, state);

	return state.complexity;
}

function checkFunction(
	node: FunctionNode,
	context: Parameters<Parameters<typeof createRule>[0]['create']>[0],
	options: { maxComplexity: number }
): void {
	// Skip if already has return type
	if (node.returnType) return;

	const complexity = calculateComplexity(node);

	if (complexity > options.maxComplexity) {
		context.report({
			node,
			messageId: 'missingReturnType',
			data: { complexity: complexity.toString() },
		});
	}
}

export const rule = createRule({
	name: 'complex-functions-require-return-type',
	meta: {
		type: 'problem',
		docs: {
			description: 'Require explicit return types for complex functions',
		},
		messages: {
			missingReturnType: 'Complex function (complexity: {{complexity}}) must have an explicit return type',
		},
		schema: [
			{
				type: 'object',
				properties: {
					maxComplexity: {
						type: 'number',
						default: 10,
					},
				},
				additionalProperties: false,
			},
		],
	},
	defaultOptions: [{ maxComplexity: 10 }],
	create(context, [options]) {
		return {
			FunctionDeclaration(node) {
				checkFunction(node, context, options);
			},
			FunctionExpression(node) {
				checkFunction(node, context, options);
			},
			ArrowFunctionExpression(node) {
				checkFunction(node, context, options);
			},
		};
	},
});
