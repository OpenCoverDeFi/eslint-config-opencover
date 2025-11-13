// Plugin for the rule no-unnecessary-typeof
import type { TSESTree } from '@typescript-eslint/utils';
import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';
import type { ParserServices } from '@typescript-eslint/utils';
import * as ts from 'typescript';
import { createRule, getTypeFromESTreeNode } from '../utils.js';

function checkTypeofPattern(
	typeofSide: TSESTree.Node,
	literalSide: TSESTree.Node
): { typeofNode: TSESTree.UnaryExpression; typeofString: string } | null {
	if (
		typeofSide.type === AST_NODE_TYPES.UnaryExpression &&
		typeofSide.operator === 'typeof' &&
		literalSide.type === AST_NODE_TYPES.Literal &&
		typeof literalSide.value === 'string'
	) {
		return { typeofNode: typeofSide, typeofString: literalSide.value };
	}
	return null;
}

// Check if a type matches a typeof string exactly (not a union)
function isExactType(type: ts.Type, typeofString: string, checker: ts.TypeChecker): boolean {
	const typeString = checker.typeToString(type);

	// Special case for boolean - TypeScript represents boolean as true | false union
	// but we still want to catch typeof checks on boolean-typed variables
	if (typeofString === 'boolean') {
		// Check if it's a boolean type (even if represented as a union internally)
		return typeString === 'boolean' || typeString === 'true | false';
	}

	// Check if the type is a union - if so, typeof is necessary for narrowing
	// (except for boolean which we handled above)
	if (type.isUnion()) {
		return false;
	}

	// Check type based on typeof string
	switch (typeofString) {
		case 'string':
			return (type.flags & ts.TypeFlags.String) !== 0;
		case 'number':
			return (type.flags & ts.TypeFlags.Number) !== 0;
		case 'bigint':
			return (type.flags & ts.TypeFlags.BigInt) !== 0;
		case 'symbol':
			return (type.flags & ts.TypeFlags.ESSymbol) !== 0;
		case 'undefined':
			return (type.flags & ts.TypeFlags.Undefined) !== 0;
		case 'object':
			// Object type but not null, undefined, or a union
			return (
				(type.flags & ts.TypeFlags.Object) !== 0 &&
				typeString !== 'null' &&
				typeString !== 'undefined' &&
				!typeString.includes('|')
			);
		case 'function':
			// Function type
			return (
				(type.flags & ts.TypeFlags.Object) !== 0 &&
				(typeString.includes('=>') || typeString === 'Function') &&
				!typeString.includes('|')
			);
		default:
			return false;
	}
}

function handleBinaryExpression(
	node: TSESTree.BinaryExpression,
	context: Parameters<Parameters<typeof createRule>[0]['create']>[0],
	services: ParserServices,
	checker: ts.TypeChecker
): void {
	// Only check === and !== operators
	if (node.operator !== '===' && node.operator !== '!==') {
		return;
	}

	const typeofInfo = checkTypeofPattern(node.left, node.right) || checkTypeofPattern(node.right, node.left);
	if (!typeofInfo) {
		return;
	}

	const { typeofNode, typeofString } = typeofInfo;

	// Get the variable being checked
	const argument = typeofNode.argument;
	if (argument.type !== AST_NODE_TYPES.Identifier && argument.type !== AST_NODE_TYPES.MemberExpression) {
		return;
	}

	// Get the type of the variable at the location of the typeof check
	const variableType = getTypeFromESTreeNode(services, checker, argument);

	// Check if the type is already exactly the type being checked (not a union)
	if (isExactType(variableType, typeofString, checker)) {
		context.report({
			node,
			messageId: 'unnecessaryTypeof',
		});
	}
}

export const rule = createRule({
	name: 'no-unnecessary-typeof',
	meta: {
		type: 'problem',
		docs: {
			description: 'Disallow unnecessary typeof checks when TypeScript already knows the type',
		},
		messages: {
			unnecessaryTypeof: 'Unnecessary typeof check - TypeScript already knows this type',
		},
		schema: [],
	},
	defaultOptions: [],
	create(context) {
		return {
			BinaryExpression(node: TSESTree.BinaryExpression) {
				const services = ESLintUtils.getParserServices(context);
				const checker = services.program.getTypeChecker();
				handleBinaryExpression(node, context, services, checker);
			},
		};
	},
});
