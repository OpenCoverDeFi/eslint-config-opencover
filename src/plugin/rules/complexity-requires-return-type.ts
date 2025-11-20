import type { TSESTree } from '@typescript-eslint/utils';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import type { RuleContext, RuleDefinition, RuleDefinitionTypeOptions } from '@eslint/core';

type RuleOptions = [
    {
        maxComplexity?: number;
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

// NOTE (@eniko1556, 2025-11-19): null as that comes from the typing inherited
function traverse(node: TSESTree.Node | null, skipNestedFunctions: boolean = true): number {
    if (!node) return 0;

    function traverseAll(nodes: (TSESTree.Node | null)[]): number {
        return nodes.reduce((sum, n) => sum + traverse(n, skipNestedFunctions), 0);
    }

    switch (node.type) {
        // Skip nested function declarations (they have their own complexity)
        case AST_NODE_TYPES.FunctionDeclaration:
        case AST_NODE_TYPES.FunctionExpression:
            return skipNestedFunctions ? 0 : traverse((node as TSESTree.FunctionDeclaration).body);

        // Complexity-adding control flow (each adds 1 + complexity of conditions/children)
        case AST_NODE_TYPES.IfStatement:
            return 1 + traverse(node.test) + traverse(node.consequent) + traverse(node.alternate);
        case AST_NODE_TYPES.ForStatement:
            return 1 + traverse(node.init) + traverse(node.test) + traverse(node.update) + traverse(node.body);
        case AST_NODE_TYPES.ForInStatement:
        case AST_NODE_TYPES.ForOfStatement:
            return 1 + traverse(node.left) + traverse(node.right) + traverse(node.body);
        case AST_NODE_TYPES.WhileStatement:
        case AST_NODE_TYPES.DoWhileStatement:
            return 1 + traverse(node.test) + traverse(node.body);
        case AST_NODE_TYPES.ConditionalExpression:
            return 1 + traverse(node.test) + traverse(node.consequent) + traverse(node.alternate);
        case AST_NODE_TYPES.LogicalExpression:
            // Every logical operator adds complexity (standard cyclomatic complexity)
            return 1 + traverse(node.left) + traverse(node.right);
        case AST_NODE_TYPES.SwitchStatement: {
            // Switch itself adds 1, each case adds 1 (default case also adds 1)
            const caseComplexity = node.cases.reduce(
                (sum, c) => sum + 1 + (c.test ? traverse(c.test) : 0) + traverseAll(c.consequent),
                0
            );
            return 1 + traverse(node.discriminant) + caseComplexity;
        }

        // Try-catch-finally (catch adds 1 for the branch)
        case AST_NODE_TYPES.TryStatement: {
            let complexity = traverse(node.block);

            if (node.handler) {
                // Catch clause itself adds complexity
                complexity += 1 + traverse(node.handler.param) + traverse(node.handler.body);
            }

            complexity += traverse(node.finalizer);

            return complexity;
        }

        // Pass-through nodes (just traverse children, no complexity added)
        case AST_NODE_TYPES.BlockStatement:
            return traverseAll(node.body);
        case AST_NODE_TYPES.ExpressionStatement:
            return traverse(node.expression);
        case AST_NODE_TYPES.ReturnStatement:
            return node.argument ? traverse(node.argument) : 0;
        case AST_NODE_TYPES.VariableDeclaration:
            return traverseAll(node.declarations.map((d) => d.init));
        case AST_NODE_TYPES.LabeledStatement:
            return traverse(node.body);
        case AST_NODE_TYPES.WithStatement:
            return traverse(node.object) + traverse(node.body);

        // Expression nodes (traverse operands without adding complexity)
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
            return traverseAll(node.elements);
        case AST_NODE_TYPES.ObjectExpression:
            return traverseAll(
                node.properties.flatMap((p) => (p.type === AST_NODE_TYPES.Property ? [p.key, p.value] : []))
            );
        case AST_NODE_TYPES.SequenceExpression:
            return traverseAll(node.expressions);

        // Modern JS features
        case AST_NODE_TYPES.ChainExpression:
            return traverse(node.expression);

        // Default: no complexity
        default:
            return 0;
    }
}

function calculateComplexity(node: FunctionNode, context: RuleContext<Options>, maxComplexity: number): void {
    // Skip if already has return type annotation
    if (node.returnType) return;

    // Calculate complexity: base of 1 + all branching complexity in body
    const bodyComplexity = traverse(node.body as TSESTree.Node, true);
    const totalComplexity = 1 + bodyComplexity;

    if (totalComplexity > maxComplexity) {
        context.report({
            node,
            messageId: MessageIds,
            data: { complexity: totalComplexity.toString() },
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
        type: 'suggestion' as const,
        docs: {
            description:
                'Require explicit return types for functions with high cyclomatic complexity. ' +
                'Complexity is calculated as: 1 (base) + 1 for each branching construct ' +
                '(if/for/while/switch case/catch/logical operator/ternary). ' +
                'Nested functions are not counted toward parent complexity.',
            url: 'https://dev.opencover.com/rules/complexity-requires-return-type',
        },
        messages: {
            missingReturnType:
                'Function has cyclomatic complexity of {{complexity}} (max: {{maxComplexity}}). ' +
                'Functions with high complexity must have an explicit return type annotation.',
        },
        schema: [
            {
                type: 'object',
                properties: {
                    maxComplexity: {
                        type: 'number',
                        default: DEFAULT_MAX_COMPLEXITY,
                        minimum: 1,
                        description: 'Maximum allowed cyclomatic complexity',
                    },
                },
                additionalProperties: false,
            },
        ],
    },
};
