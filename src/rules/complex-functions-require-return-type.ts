import type { TSESTree } from '@typescript-eslint/utils';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import type { RuleContext, RuleDefinition, RuleDefinitionTypeOptions } from '@eslint/core';

type RuleOptions = [
    {
        maxComplexity: number;
    },
];
const MessageIds = 'missingReturnType';
type MessageIds = typeof MessageIds;
type Options = RuleDefinitionTypeOptions & {
    MessageIds: MessageIds;
    RuleOptions: RuleOptions;
};
type FunctionNode = TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression;

const DEFAULT_MAX_COMPLEXITY = 10;

function traverse(node: TSESTree.Node): number {
    function traverseAll(nodes: TSESTree.Node[]): number {
        return nodes.reduce((sum, n) => sum + traverse(n), 0);
    }
    switch (node.type) {
        // Complexity-adding control flow (each adds 1 + children)
        case AST_NODE_TYPES.IfStatement:
            return (
                1 + traverse(node.test) + traverse(node.consequent) + (node.alternate ? traverse(node.alternate) : 0)
            );

        case AST_NODE_TYPES.ForStatement:
            return (
                1 +
                (node.init ? traverse(node.init) : 0) +
                (node.test ? traverse(node.test) : 0) +
                (node.update ? traverse(node.update) : 0) +
                traverse(node.body)
            );

        case AST_NODE_TYPES.ForInStatement:
        case AST_NODE_TYPES.ForOfStatement:
            return 1 + traverse(node.left) + traverse(node.right) + traverse(node.body);

        case AST_NODE_TYPES.WhileStatement:
        case AST_NODE_TYPES.DoWhileStatement:
            return 1 + traverse(node.test) + traverse(node.body);

        case AST_NODE_TYPES.ConditionalExpression:
            return 1 + traverse(node.test) + traverse(node.consequent) + traverse(node.alternate);

        case AST_NODE_TYPES.LogicalExpression:
            return (
                (node.operator === '||' || node.operator === '&&' ? 1 : 0) + traverse(node.left) + traverse(node.right)
            );

        case AST_NODE_TYPES.SwitchStatement:
            return (
                traverse(node.discriminant) +
                node.cases.reduce((sum, c) => sum + 1 + (c.test ? traverse(c.test) : 0) + traverseAll(c.consequent), 0)
            );

        // Passthrough nodes (just traverse children)
        case AST_NODE_TYPES.BlockStatement:
            return traverseAll(node.body);

        case AST_NODE_TYPES.ExpressionStatement:
            return traverse(node.expression);

        case AST_NODE_TYPES.ReturnStatement:
            return node.argument ? traverse(node.argument) : 0;

        case AST_NODE_TYPES.VariableDeclaration:
            return traverseAll(
                node.declarations
                    .map((d) => d.init)
                    .filter((init): init is TSESTree.Expression => init !== null && init !== undefined)
            );

        case AST_NODE_TYPES.TryStatement: {
            let complexity = traverse(node.block);
            if (node.handler) {
                if (node.handler.param) complexity += traverse(node.handler.param);
                complexity += traverse(node.handler.body);
            }
            if (node.finalizer) complexity += traverse(node.finalizer);
            return complexity;
        }
        // Expression nodes (traverse operands)
        case AST_NODE_TYPES.AssignmentExpression:
        case AST_NODE_TYPES.BinaryExpression:
            return traverse(node.left) + traverse(node.right);

        case AST_NODE_TYPES.UnaryExpression:
        case AST_NODE_TYPES.ThrowStatement:
            return traverse(node.argument);

        case AST_NODE_TYPES.CallExpression:
            return traverse(node.callee) + traverseAll(node.arguments);

        case AST_NODE_TYPES.MemberExpression:
            return traverse(node.object) + (node.computed ? traverse(node.property) : 0);

        case AST_NODE_TYPES.ArrayExpression:
            return traverseAll(
                node.elements.filter((el): el is TSESTree.Expression | TSESTree.SpreadElement => el !== null)
            );

        case AST_NODE_TYPES.ObjectExpression:
            return traverseAll(
                node.properties.flatMap((p) => (p.type === AST_NODE_TYPES.Property ? [p.key, p.value] : []))
            );

        case AST_NODE_TYPES.SequenceExpression:
            return traverseAll(node.expressions);

        case AST_NODE_TYPES.LabeledStatement:
            return traverse(node.body);

        case AST_NODE_TYPES.WithStatement:
            return traverse(node.object) + traverse(node.body);

        default:
            return 0;
    }
}

function calculateComplexity(node: FunctionNode, context: RuleContext<Options>, maxComplexity: number): void {
    // Skip if already has return type
    if (node.returnType) return;

    const complexity = traverse(node.body) + 1;

    if (complexity > maxComplexity) {
        context.report({
            node,
            messageId: MessageIds,
            data: { complexity: complexity.toString() },
        });
    }
}

function createRuleVisitor(context: RuleContext<Options>) {
    const { maxComplexity = DEFAULT_MAX_COMPLEXITY } = context.options[0] ?? {};
    return {
        FunctionDeclaration(node: TSESTree.FunctionDeclaration) {
            calculateComplexity(node, context, maxComplexity);
        },
        FunctionExpression(node: TSESTree.FunctionExpression) {
            calculateComplexity(node, context, maxComplexity);
        },
        ArrowFunctionExpression(node: TSESTree.ArrowFunctionExpression) {
            calculateComplexity(node, context, maxComplexity);
        },
    };
}

export const rule: RuleDefinition<Options> = {
    create(context: RuleContext<Options>) {
        return createRuleVisitor(context);
    },
    meta: {
        type: 'problem' as const,
        docs: {
            description: 'Require explicit return types for complex functions',
            url: 'https://opencover.com/rules/complex-functions-require-return-type',
        },
        messages: {
            missingReturnType: 'Complex function (complexity: {{complexity}}) must have an explicit return type',
        },
        schema: [
            {
                type: 'object',
                properties: {
                    maxComplexity: {
                        type: 'number',
                        default: 10,
                    },
                },
                additionalProperties: false,
            },
        ],
    },
};
