import { basename } from 'node:path';
import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext, RuleDefinition, RuleDefinitionTypeOptions } from '@eslint/core';

type RuleOptions = [
    {
        ignorePattern?: string[];
    },
];
const MessageIds = 'noDotsInFilename';
type MessageIds = typeof MessageIds;
type Options = RuleDefinitionTypeOptions & {
    MessageIds: MessageIds;
    RuleOptions: RuleOptions;
};

function createRuleVisitor(context: RuleContext<Options>) {
    const { ignorePattern = [] } = context.options[0] ?? {};
    const filename = basename(context.filename);

    if (
        !ignorePattern.some((pattern) => new RegExp(pattern).test(filename)) &&
        filename.replace(/(?:\.test)?(?:\.[^.]+)?$/, '').includes('.')
    ) {
        return {
            Program(node: TSESTree.Program) {
                context.report({
                    node,
                    messageId: MessageIds,
                });
            },
        };
    }

    return {};
}

export const rule: RuleDefinition<Options> = {
    create(context: RuleContext<Options>) {
        return createRuleVisitor(context);
    },
    meta: {
        type: 'problem' as const,
        docs: {
            description: 'Disallow dots in filenames (except .test. in test files)',
            url: 'https://opencover.com/rules/filename-no-dots',
        },
        messages: {
            noDotsInFilename: 'Filename should not contain dots (except .test. in test files)',
        },
        schema: [
            {
                type: 'object',
                properties: {
                    ignorePattern: {
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                    },
                },
                additionalProperties: false,
            },
        ],
    },
};
