// Plugin for the rule no-unnecessary-as-assertion
import type { TSESTree } from '@typescript-eslint/utils';
import { ESLintUtils } from '@typescript-eslint/utils';
import * as ts from 'typescript';
import type { RuleContext, RuleDefinition, RuleDefinitionTypeOptions } from '@eslint/core';
import { getTypeFromESTreeNode, isAnyOrUnknown } from '../utils.js';

type RuleOptions = [];
type MessageIds = 'unnecessaryAsAssertion';

type NoUnnecessaryAsAssertionRuleDefinitionTypeOptions = RuleDefinitionTypeOptions & {
    MessageIds: MessageIds;
    RuleOptions: RuleOptions;
};

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

export const rule: RuleDefinition<NoUnnecessaryAsAssertionRuleDefinitionTypeOptions> = {
    meta: {
        type: 'problem' as const,
        docs: {
            description: 'Disallow unnecessary "as" type assertions',
            url: 'https://opencover.com/rules/no-unnecessary-as-assertion',
        },
        messages: {
            unnecessaryAsAssertion: 'Unnecessary "as" type assertion - the expression is already of this type',
        },
        schema: [],
    },
    create(context: RuleContext<NoUnnecessaryAsAssertionRuleDefinitionTypeOptions>) {
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
};
