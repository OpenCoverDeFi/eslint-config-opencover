import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext, RuleDefinition, RuleDefinitionTypeOptions } from '@eslint/core';
import type { TypeChecker, Type, Expression } from 'typescript';
import { isAsExpression, isStringLiteral, isNumericLiteral, isExpression } from 'typescript';
import { getParserServices, getTypeFromESTreeNode, isAnyOrUnknown } from '../utils.js';

type RuleOptions = [];
const MessageIds = 'unnecessaryAsAssertion';
type MessageIds = typeof MessageIds;
type Options = RuleDefinitionTypeOptions & {
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

function createRuleVisitor(context: RuleContext<Options>) {
    return {
        TSAsExpression(node: TSESTree.TSAsExpression): void {
            const services = getParserServices<MessageIds, RuleOptions, Options>(context);

            if (!services.program) {
                return;
            }

            const checker = services.program.getTypeChecker();
            const tsAsExpression = services.esTreeNodeToTSNodeMap.get(node);

            if (!isAsExpression(tsAsExpression) || tsAsExpression.type.getText() === 'const') {
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

            if (
                (isAssignable && isReverseAssignable) ||
                isUnnecessaryUnionNarrowing ||
                (isAssignable && checker.typeToString(expressionType) === checker.typeToString(assertedType))
            ) {
                context.report({
                    node,
                    messageId: MessageIds,
                });
            }
        },
    };
}

export const rule: RuleDefinition<Options> = {
    create(context: Readonly<RuleContext<Options>>) {
        return createRuleVisitor(context);
    },
    meta: {
        type: 'suggestion' as const,
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
