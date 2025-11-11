// Plugin for the rule no-unnecessary-typeof
import type { Rule } from 'eslint';
import type { TSESTree } from '@typescript-eslint/utils';
import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';
import type { ParserServices } from '@typescript-eslint/utils';
import * as ts from 'typescript';

type RuleContext = Parameters<Rule.RuleModule['create']>[0];
type RuleListener = ReturnType<Rule.RuleModule['create']>;

function extractTypeofInfo(
	node: TSESTree.BinaryExpression
): { typeofNode: TSESTree.UnaryExpression; typeofString: string } | null {
	// Pattern: typeof variable === 'string'
	if (
		node.left.type === AST_NODE_TYPES.UnaryExpression &&
		node.left.operator === 'typeof' &&
		node.right.type === AST_NODE_TYPES.Literal &&
		typeof node.right.value === 'string'
	) {
		return { typeofNode: node.left, typeofString: node.right.value };
	}
	// Pattern: 'string' === typeof variable
	if (
		node.right.type === AST_NODE_TYPES.UnaryExpression &&
		node.right.operator === 'typeof' &&
		node.left.type === AST_NODE_TYPES.Literal &&
		typeof node.left.value === 'string'
	) {
		return { typeofNode: node.right, typeofString: node.left.value };
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

	// For primitive types, check both flags and type string
	if (typeofString === 'string') {
		return (type.flags & ts.TypeFlags.String) !== 0 || typeString === 'string';
	}
	if (typeofString === 'number') {
		return (type.flags & ts.TypeFlags.Number) !== 0 || typeString === 'number';
	}
	if (typeofString === 'bigint') {
		return (type.flags & ts.TypeFlags.BigInt) !== 0 || typeString === 'bigint';
	}
	if (typeofString === 'symbol') {
		return (type.flags & ts.TypeFlags.ESSymbol) !== 0 || typeString === 'symbol';
	}
	if (typeofString === 'undefined') {
		return (type.flags & ts.TypeFlags.Undefined) !== 0 || typeString === 'undefined';
	}

	// For object and function, check the type string representation
	if (typeofString === 'object') {
		// Object type but not null, undefined, or a union
		return (
			(type.flags & ts.TypeFlags.Object) !== 0 &&
			typeString !== 'null' &&
			typeString !== 'undefined' &&
			!typeString.includes('|')
		);
	}
	if (typeofString === 'function') {
		// Function type
		return (
			(type.flags & ts.TypeFlags.Object) !== 0 &&
			(typeString.includes('=>') || typeString === 'Function') &&
			!typeString.includes('|')
		);
	}

	return false;
}

function handleBinaryExpression(
	node: Rule.Node,
	context: RuleContext,
	services: ParserServices,
	checker: ts.TypeChecker
): void {
	const esTreeNode = node as unknown as TSESTree.BinaryExpression;

	// Only check === and !== operators
	if (esTreeNode.operator !== '===' && esTreeNode.operator !== '!==') {
		return;
	}

	const typeofInfo = extractTypeofInfo(esTreeNode);
	if (!typeofInfo) {
		return;
	}

	const { typeofNode, typeofString } = typeofInfo;

	// Get the variable being checked
	const argument = typeofNode.argument;
	if (argument.type !== AST_NODE_TYPES.Identifier && argument.type !== AST_NODE_TYPES.MemberExpression) {
		return;
	}

	// Get the TypeScript node for the variable
	const tsNode = services.esTreeNodeToTSNodeMap.get(argument);

	// Get the type of the variable at the location of the typeof check
	const variableType = checker.getTypeAtLocation(tsNode);

	// Check if the type is already exactly the type being checked (not a union)
	if (isExactType(variableType, typeofString, checker)) {
		context.report({
			node,
			messageId: 'unnecessaryTypeof',
		});
	}
}

export const rule: Rule.RuleModule = {
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
	create(context: RuleContext): RuleListener {
		const services = ESLintUtils.getParserServices(
			context as unknown as Parameters<typeof ESLintUtils.getParserServices>[0]
		);
		const checker = services.program.getTypeChecker();

		return {
			BinaryExpression(node: Rule.Node) {
				handleBinaryExpression(node, context, services, checker);
			},
		} as RuleListener;
	},
};
