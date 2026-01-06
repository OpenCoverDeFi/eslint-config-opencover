import type { TSESTree } from '@typescript-eslint/utils';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import type { TypeChecker, Type } from 'typescript';
import { TypeFlags } from 'typescript';
import type { RuleContext, RuleDefinition, RuleDefinitionTypeOptions } from '@eslint/core';
import { getParserServices, getTypeFromESTreeNode } from '@/plugin/utils.js';

type RuleOptions = [];
const MessageIds = 'unnecessaryTypeof';
type MessageIds = typeof MessageIds;

type Options = RuleDefinitionTypeOptions & {
    MessageIds: MessageIds;
    RuleOptions: RuleOptions;
};

function extractTypeofPattern(
    left: TSESTree.Node,
    right: TSESTree.Node
): { typeofNode: TSESTree.UnaryExpression; typeofString: string } | undefined {
    const isTypeofExpr = (node: TSESTree.Node): node is TSESTree.UnaryExpression =>
        node.type === AST_NODE_TYPES.UnaryExpression && node.operator === 'typeof';

    const isStringLiteral = (node: TSESTree.Node): node is TSESTree.Literal =>
        node.type === AST_NODE_TYPES.Literal && typeof node.value === 'string';

    if (isTypeofExpr(left) && isStringLiteral(right)) {
        return { typeofNode: left, typeofString: right.value?.toString() ?? '' };
    }

    if (isTypeofExpr(right) && isStringLiteral(left)) {
        return { typeofNode: right, typeofString: left.value?.toString() ?? '' };
    }

    return undefined;
}

// Check if a type exactly matches the typeof string
function isExactType(type: Type, typeofString: string, checker: TypeChecker): boolean {
    const typeString = checker.typeToString(type);

    // Handle boolean special case
    if (typeofString === 'boolean') {
        return typeString === 'boolean' || typeString === 'true | false';
    }

    // Unions require typeof narrowing (except boolean above)
    if (type.isUnion()) return false;

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
            return (
                (type.flags & TypeFlags.Object) !== 0 &&
                !['null', 'undefined'].includes(typeString) &&
                !typeString.includes('|')
            );
        case 'function':
            return (
                (type.flags & TypeFlags.Object) !== 0 &&
                (typeString.includes('=>') || typeString === 'Function') &&
                !typeString.includes('|')
            );
        default:
            return false;
    }
}

function createRuleVisitor(context: RuleContext<Options>) {
    return {
        BinaryExpression(node: TSESTree.BinaryExpression) {
            if (node.operator !== '===' && node.operator !== '!==') return;

            const typeofInfo = extractTypeofPattern(node.left, node.right);

            if (!typeofInfo) return;

            const { typeofNode, typeofString } = typeofInfo;
            const argument = typeofNode.argument;

            // Only check identifiers and member expressions
            if (![AST_NODE_TYPES.Identifier, AST_NODE_TYPES.MemberExpression].includes(argument.type)) {
                return;
            }

            const services = getParserServices(context);

            if (!services.program) return;

            const checker = services.program.getTypeChecker();
            const variableType = getTypeFromESTreeNode(services, checker, argument);

            if (isExactType(variableType, typeofString, checker)) {
                context.report({ node, messageId: MessageIds });
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
            description: 'Disallow unnecessary typeof checks when TypeScript already knows the type',
            url: 'https://opencover.com/development/rules/no-unnecessary-typeof',
        },
        messages: {
            unnecessaryTypeof: 'Unnecessary typeof check - TypeScript already knows this type',
        },
        schema: [],
    },
};
