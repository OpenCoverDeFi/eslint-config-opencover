// Plugin for the rule no-unnecessary-optional-chain
import type { TSESTree } from '@typescript-eslint/utils';
import { ESLintUtils } from '@typescript-eslint/utils';
import { createRule, getTypeFromESTreeNode, isTypeNullable } from '../utils.js';

export const rule = createRule({
    name: 'no-unnecessary-optional-chain',
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow unnecessary optional chaining',
        },
        messages: {
            unnecessaryOptionalChain: 'Unnecessary optional chain - the value is not nullable',
        },
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        const services = ESLintUtils.getParserServices(context);
        const checker = services.program.getTypeChecker();

        return {
            ChainExpression(node: TSESTree.ChainExpression) {
                const type = getTypeFromESTreeNode(services, checker, node);

                // Check if the type includes null or undefined
                if (!isTypeNullable(type)) {
                    context.report({
                        node,
                        messageId: 'unnecessaryOptionalChain',
                    });
                }
            },
        };
    },
});
