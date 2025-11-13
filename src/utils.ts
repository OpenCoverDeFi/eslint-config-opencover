import type { TSESTree } from '@typescript-eslint/utils';
import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';
import type { ParserServices } from '@typescript-eslint/utils';
import * as ts from 'typescript';

export const createRule = ESLintUtils.RuleCreator((name) => `https://opencover.com/rules/${name}`);

export function getTypeFromESTreeNode(services: ParserServices, checker: ts.TypeChecker, node: TSESTree.Node): ts.Type {
	const tsNode = services.esTreeNodeToTSNodeMap.get(node);
	return checker.getTypeAtLocation(tsNode);
}

export function isNullishLiteral(node: TSESTree.Node): boolean {
	return (
		(node.type === AST_NODE_TYPES.Literal && node.value == null) ||
		(node.type === AST_NODE_TYPES.Identifier && node.name === 'undefined')
	);
}

export function isTypeNullable(type: ts.Type): boolean {
	// Check if the type includes null or undefined
	const hasNullOrUndefined = (type.flags & (ts.TypeFlags.Null | ts.TypeFlags.Undefined)) !== 0;
	const isUnionWithNullable =
		type.isUnion() && type.types.some((t) => (t.flags & (ts.TypeFlags.Null | ts.TypeFlags.Undefined)) !== 0);
	return hasNullOrUndefined || isUnionWithNullable;
}

export function isAnyOrUnknown(type: ts.Type): boolean {
	const isAny = (type.flags & ts.TypeFlags.Any) !== 0;
	const isUnknown = (type.flags & ts.TypeFlags.Unknown) !== 0 || type.getSymbol()?.getName() === 'unknown';
	return isAny || isUnknown;
}
