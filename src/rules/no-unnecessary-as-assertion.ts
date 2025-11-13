// Plugin for the rule no-unnecessary-as-assertion
import type { TSESTree } from '@typescript-eslint/utils';
import { ESLintUtils } from '@typescript-eslint/utils';
import * as ts from 'typescript';
import { createRule, getTypeFromESTreeNode, isAnyOrUnknown } from '../utils.js';

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
		return {
			TSAsExpression(node: TSESTree.TSAsExpression): void {
				const services = ESLintUtils.getParserServices(context);
				const checker = services.program.getTypeChecker();
				const tsAsExpression = services.esTreeNodeToTSNodeMap.get(node);

				if (!ts.isAsExpression(tsAsExpression)) {
					return;
				}

				// Skip "as const" assertions - they are not type assertions
				if (tsAsExpression.type.getText() === 'const') {
					return;
				}

				const expressionType = getTypeFromESTreeNode(services, checker, node.expression);
				const assertedType = getTypeFromESTreeNode(services, checker, node.typeAnnotation);

				if (isAnyOrUnknown(expressionType)) {
					return;
				}

				const isAssignable = checker.isTypeAssignableTo(expressionType, assertedType);
				const isReverseAssignable = checker.isTypeAssignableTo(assertedType, expressionType);
				const tsExpression = services.esTreeNodeToTSNodeMap.get(node.expression);
				if (!ts.isExpression(tsExpression)) {
					return;
				}

				const isUnnecessaryUnionNarrowing = checkUnionNarrowing(
					expressionType,
					assertedType,
					tsExpression,
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
