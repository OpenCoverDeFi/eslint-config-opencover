// Plugin for the rule no-unnecessary-as-assertion
import type { TSESTree } from '@typescript-eslint/utils';
import { ESLintUtils } from '@typescript-eslint/utils';
import * as ts from 'typescript';
import { createRule } from '../utils.js';

function isFromAnyOrUnknown(expressionType: ts.Type): boolean {
	const isFromAny = (expressionType.flags & ts.TypeFlags.Any) !== 0;
	const isFromUnknown =
		(expressionType.flags & ts.TypeFlags.Unknown) !== 0 || expressionType.getSymbol()?.getName() === 'unknown';
	return isFromAny || isFromUnknown;
}

function checkUnionNarrowing(
	expressionType: ts.Type,
	assertedType: ts.Type,
	expression: ts.Expression,
	checker: ts.TypeChecker
): boolean {
	if (!expressionType.isUnion()) {
		return false;
	}

	const isMemberOfUnion = expressionType.types.some((unionMember) => {
		const memberToString = checker.typeToString(unionMember);
		const assertedToString = checker.typeToString(assertedType);
		return (
			(checker.isTypeAssignableTo(unionMember, assertedType) &&
				checker.isTypeAssignableTo(assertedType, unionMember)) ||
			memberToString === assertedToString
		);
	});

	if (!isMemberOfUnion) {
		return false;
	}

	if (checker.isTypeAssignableTo(expressionType, assertedType)) {
		return true;
	}

	if (ts.isStringLiteral(expression) || ts.isNumericLiteral(expression)) {
		const literalType = checker.getTypeAtLocation(expression);
		return checker.isTypeAssignableTo(literalType, assertedType);
	}

	return false;
}

export const rule = createRule({
	name: 'no-unnecessary-as-assertion',
	meta: {
		type: 'problem',
		docs: {
			description: 'Disallow unnecessary "as" type assertions',
		},
		messages: {
			unnecessaryAsAssertion: 'Unnecessary "as" type assertion - the expression is already of this type',
		},
		schema: [],
	},
	defaultOptions: [],
	create(context) {
		const services = ESLintUtils.getParserServices(context);
		const checker = services.program.getTypeChecker();

		return {
			TSAsExpression(node: TSESTree.TSAsExpression) {
				const tsAsExpression = services.esTreeNodeToTSNodeMap.get(node);

				if (!ts.isAsExpression(tsAsExpression)) {
					return;
				}

				const expression = tsAsExpression.expression;
				const typeNode = tsAsExpression.type;

				const expressionType = checker.getTypeAtLocation(expression);
				const assertedType = checker.getTypeAtLocation(typeNode);

				if (isFromAnyOrUnknown(expressionType)) {
					return;
				}

				const isAssignable = checker.isTypeAssignableTo(expressionType, assertedType);
				const isReverseAssignable = checker.isTypeAssignableTo(assertedType, expressionType);
				const isUnnecessaryUnionNarrowing = checkUnionNarrowing(
					expressionType,
					assertedType,
					expression,
					checker
				);

				if (isAssignable && isReverseAssignable) {
					context.report({
						node,
						messageId: 'unnecessaryAsAssertion',
					});
				} else if (isUnnecessaryUnionNarrowing) {
					context.report({
						node,
						messageId: 'unnecessaryAsAssertion',
					});
				} else if (isAssignable) {
					const expressionTypeString = checker.typeToString(expressionType);
					const assertedTypeString = checker.typeToString(assertedType);

					if (expressionTypeString === assertedTypeString) {
						context.report({
							node,
							messageId: 'unnecessaryAsAssertion',
						});
					}
				}
			},
		};
	},
});
