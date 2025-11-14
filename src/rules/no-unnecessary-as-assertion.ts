// Plugin for the rule no-unnecessary-as-assertion
import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext, RuleDefinition, RuleDefinitionTypeOptions } from '@eslint/core';
import type { TypeChecker, Type, Expression } from 'typescript';
import { isAsExpression, isStringLiteral, isNumericLiteral, isExpression } from 'typescript';
import { getParserServices, getTypeFromESTreeNode, isAnyOrUnknown } from '../utils.js';

type RuleOptions = [];
type MessageIds = 'unnecessaryAsAssertion';

type NoUnnecessaryAsAssertionRuleDefinitionTypeOptions = RuleDefinitionTypeOptions & {
    MessageIds: MessageIds;
    RuleOptions: RuleOptions;
};

function checkUnionNarrowing(
    expressionType: Type,
    assertedType: Type,
    expression: Expression,
    checker: TypeChecker
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

    if (isStringLiteral(expression) || isNumericLiteral(expression)) {
        const literalType = checker.getTypeAtLocation(expression);
        return checker.isTypeAssignableTo(literalType, assertedType);
    }

    return false;
}

function createRuleVisitor(context: RuleContext<NoUnnecessaryAsAssertionRuleDefinitionTypeOptions>) {
    return {
        TSAsExpression(node: TSESTree.TSAsExpression): void {
            const services = getParserServices<
                MessageIds,
                RuleOptions,
                NoUnnecessaryAsAssertionRuleDefinitionTypeOptions
            >(context);
            if (!services.program) {
                return;
            }
            const checker = services.program.getTypeChecker();
            const tsAsExpression = services.esTreeNodeToTSNodeMap.get(node);

            if (!isAsExpression(tsAsExpression)) {
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
            if (!isExpression(tsExpression)) {
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
}

export const rule: RuleDefinition<NoUnnecessaryAsAssertionRuleDefinitionTypeOptions> = {
    create(context: Readonly<RuleContext<NoUnnecessaryAsAssertionRuleDefinitionTypeOptions>>) {
        return createRuleVisitor(context);
    },
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
};
