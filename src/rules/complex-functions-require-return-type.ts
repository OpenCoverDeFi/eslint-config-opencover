import type { TSESTree } from '@typescript-eslint/utils';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import type { RuleContext, RuleDefinition, RuleDefinitionTypeOptions } from '@eslint/core';

type RuleOptions = {
    maxComplexity: number;
};
type MessageIds = 'missingReturnType';

type MissingReturnTypeRuleDefinitionTypeOptions = RuleDefinitionTypeOptions & {
    MessageIds: MessageIds;
    RuleOptions: RuleOptions;
};
type FunctionNode = TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression;

function traverse(node: TSESTree.Node): number {
    // Count decision points based on node type
    switch (node.type) {
        case AST_NODE_TYPES.IfStatement: {
            let complexity = 1; // If statement adds complexity
            complexity += traverse(node.test);
            complexity += traverse(node.consequent);
            if (node.alternate) {
                complexity += traverse(node.alternate);
            }
            return complexity;
        }

        case AST_NODE_TYPES.SwitchStatement: {
            return (
                traverse(node.discriminant) +
                node.cases.reduce((complexity, switchCase) => {
                    complexity += 1; // Each case adds complexity
                    if (switchCase.test) {
                        complexity += traverse(switchCase.test);
                    }
                    return (
                        complexity +
                        switchCase.consequent.reduce(
                            (caseComplexity, statement) => caseComplexity + traverse(statement),
                            0
                        )
                    );
                }, 0)
            );
        }

        case AST_NODE_TYPES.SwitchCase: {
            // SwitchCase is already handled in SwitchStatement
            // This case is here for completeness but shouldn't be hit in normal traversal
            return (
                (node.test ? traverse(node.test) : 0) +
                node.consequent.reduce((complexity, statement) => complexity + traverse(statement), 0)
            );
        }

        case AST_NODE_TYPES.ForStatement: {
            let complexity = 1; // For loop adds complexity
            if (node.init) {
                complexity += traverse(node.init);
            }
            if (node.test) {
                complexity += traverse(node.test);
            }
            if (node.update) {
                complexity += traverse(node.update);
            }
            complexity += traverse(node.body);
            return complexity;
        }

        case AST_NODE_TYPES.ForInStatement: {
            let complexity = 1; // For-in loop adds complexity
            complexity += traverse(node.left);
            complexity += traverse(node.right);
            complexity += traverse(node.body);
            return complexity;
        }

        case AST_NODE_TYPES.ForOfStatement: {
            let complexity = 1; // For-of loop adds complexity
            complexity += traverse(node.left);
            complexity += traverse(node.right);
            complexity += traverse(node.body);
            return complexity;
        }

        case AST_NODE_TYPES.WhileStatement: {
            let complexity = 1; // While loop adds complexity
            complexity += traverse(node.test);
            complexity += traverse(node.body);
            return complexity;
        }

        case AST_NODE_TYPES.DoWhileStatement: {
            let complexity = 1; // Do-while loop adds complexity
            complexity += traverse(node.body);
            complexity += traverse(node.test);
            return complexity;
        }

        case AST_NODE_TYPES.ConditionalExpression: {
            let complexity = 1; // Ternary adds complexity
            complexity += traverse(node.test);
            complexity += traverse(node.consequent);
            complexity += traverse(node.alternate);
            return complexity;
        }

        case AST_NODE_TYPES.LogicalExpression: {
            let complexity = 0;
            if (node.operator === '||' || node.operator === '&&') {
                complexity = 1; // Logical operators add complexity
            }
            complexity += traverse(node.left);
            complexity += traverse(node.right);
            return complexity;
        }

        case AST_NODE_TYPES.BlockStatement: {
            return node.body.reduce((complexity, statement) => complexity + traverse(statement), 0);
        }

        case AST_NODE_TYPES.ExpressionStatement: {
            return traverse(node.expression);
        }

        case AST_NODE_TYPES.ReturnStatement: {
            return node.argument ? traverse(node.argument) : 0;
        }

        case AST_NODE_TYPES.VariableDeclaration: {
            return node.declarations.reduce(
                (complexity, declarator) => complexity + (declarator.init ? traverse(declarator.init) : 0),
                0
            );
        }

        case AST_NODE_TYPES.AssignmentExpression: {
            return traverse(node.left) + traverse(node.right);
        }

        case AST_NODE_TYPES.BinaryExpression: {
            return traverse(node.left) + traverse(node.right);
        }

        case AST_NODE_TYPES.UnaryExpression: {
            return traverse(node.argument);
        }

        case AST_NODE_TYPES.CallExpression: {
            return traverse(node.callee) + node.arguments.reduce((complexity, arg) => complexity + traverse(arg), 0);
        }

        case AST_NODE_TYPES.MemberExpression: {
            let complexity = traverse(node.object);
            if (node.computed) {
                complexity += traverse(node.property);
            }
            return complexity;
        }

        case AST_NODE_TYPES.ArrayExpression: {
            return node.elements.reduce((complexity, element) => complexity + (element ? traverse(element) : 0), 0);
        }

        case AST_NODE_TYPES.ObjectExpression: {
            return node.properties.reduce((complexity, property) => {
                if (property.type === AST_NODE_TYPES.Property) {
                    return complexity + traverse(property.key) + traverse(property.value);
                }
                return complexity;
            }, 0);
        }

        case AST_NODE_TYPES.SequenceExpression: {
            return node.expressions.reduce((complexity, expression) => complexity + traverse(expression), 0);
        }

        case AST_NODE_TYPES.LabeledStatement: {
            return traverse(node.body);
        }

        case AST_NODE_TYPES.ThrowStatement: {
            return traverse(node.argument);
        }

        case AST_NODE_TYPES.TryStatement: {
            let complexity = traverse(node.block);
            if (node.handler) {
                if (node.handler.param) {
                    complexity += traverse(node.handler.param);
                }
                complexity += traverse(node.handler.body);
            }
            if (node.finalizer) {
                complexity += traverse(node.finalizer);
            }
            return complexity;
        }

        case AST_NODE_TYPES.WithStatement: {
            return traverse(node.object) + traverse(node.body);
        }

        default:
            return 0;
    }
}

function checkFunction(
    node: FunctionNode,
    context: RuleContext<MissingReturnTypeRuleDefinitionTypeOptions>,
    options: RuleOptions
): void {
    // Skip if already has return type
    if (node.returnType) return;

    const complexity = traverse(node.body) + 1;

    if (complexity > options.maxComplexity) {
        context.report({
            node,
            messageId: 'missingReturnType',
            data: { complexity: complexity.toString() },
        });
    }
}

function createRuleVisitor(context: RuleContext<MissingReturnTypeRuleDefinitionTypeOptions>) {
    const rawOptions = (context.options[0] as { maxComplexity?: number } | undefined) ?? {};
    const options: { maxComplexity: number } = { maxComplexity: rawOptions.maxComplexity ?? 10 };
    return {
        FunctionDeclaration(node: TSESTree.FunctionDeclaration) {
            checkFunction(node, context, options);
        },
        FunctionExpression(node: TSESTree.FunctionExpression) {
            checkFunction(node, context, options);
        },
        ArrowFunctionExpression(node: TSESTree.ArrowFunctionExpression) {
            checkFunction(node, context, options);
        },
    };
}

export const rule: RuleDefinition<MissingReturnTypeRuleDefinitionTypeOptions> = {
    create(context: RuleContext<MissingReturnTypeRuleDefinitionTypeOptions>) {
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
