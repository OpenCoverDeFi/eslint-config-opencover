// Plugin for the rule no-unnecessary-typeof
import type { TSESTree } from '@typescript-eslint/utils';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import type { ParserServices } from '@typescript-eslint/utils';
import type { TypeChecker, Type } from 'typescript';
import { TypeFlags } from 'typescript';
import type { RuleContext, RuleDefinition, RuleDefinitionTypeOptions } from '@eslint/core';
import { getParserServices, getTypeFromESTreeNode } from '../utils.js';

type RuleOptions = [];
type MessageIds = 'unnecessaryTypeof';

type Options = RuleDefinitionTypeOptions & {
    MessageIds: MessageIds;
    RuleOptions: RuleOptions;
};

function checkTypeofPattern(
    typeofSide: TSESTree.Node,
    literalSide: TSESTree.Node
): { typeofNode: TSESTree.UnaryExpression; typeofString: string } | undefined {
    if (
        typeofSide.type === AST_NODE_TYPES.UnaryExpression &&
        typeofSide.operator === 'typeof' &&
        literalSide.type === AST_NODE_TYPES.Literal &&
        typeof literalSide.value === 'string'
    ) {
        return { typeofNode: typeofSide, typeofString: literalSide.value };
    }
}

// Check if a type matches a typeof string exactly (not a union)
function isExactType(type: Type, typeofString: string, checker: TypeChecker): boolean {
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
            return (type.flags & TypeFlags.String) !== 0;
        case 'number':
            return (type.flags & TypeFlags.Number) !== 0;
        case 'bigint':
            return (type.flags & TypeFlags.BigInt) !== 0;
        case 'symbol':
            return (type.flags & TypeFlags.ESSymbol) !== 0;
        case 'undefined':
            return (type.flags & TypeFlags.Undefined) !== 0;
        case 'object':
            // Object type but not null, undefined, or a union
            return (
                (type.flags & TypeFlags.Object) !== 0 &&
                typeString !== 'null' &&
                typeString !== 'undefined' &&
                !typeString.includes('|')
            );
        case 'function':
            // Function type
            return (
                (type.flags & TypeFlags.Object) !== 0 &&
                (typeString.includes('=>') || typeString === 'Function') &&
                !typeString.includes('|')
            );
        default:
            return false;
    }
}

function handleBinaryExpression(
    node: TSESTree.BinaryExpression,
    context: RuleContext<Options>,
    services: ParserServices,
    checker: TypeChecker
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

function createRuleVisitor(context: RuleContext<Options>) {
    return {
        BinaryExpression(node: TSESTree.BinaryExpression) {
            const services = getParserServices<MessageIds, RuleOptions, Options>(context);
            if (!services.program) {
                return;
            }
            const checker = services.program.getTypeChecker();
            handleBinaryExpression(node, context, services, checker);
        },
    };
}

export const rule: RuleDefinition<Options> = {
    create(context: Readonly<RuleContext<Options>>) {
        return createRuleVisitor(context);
    },
    meta: {
        type: 'problem' as const,
        docs: {
            description: 'Disallow unnecessary typeof checks when TypeScript already knows the type',
            url: 'https://opencover.com/rules/no-unnecessary-typeof',
        },
        messages: {
            unnecessaryTypeof: 'Unnecessary typeof check - TypeScript already knows this type',
        },
        schema: [],
    },
};
