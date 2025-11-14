import { basename } from 'node:path';
import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext, RuleDefinition, RuleDefinitionTypeOptions } from '@eslint/core';

type RuleOptions = [
    {
        ignorePattern?: string[];
    },
];

type MessageIds = 'noDotsInFilename';

type FilenameNoDotsRuleDefinitionTypeOptions = RuleDefinitionTypeOptions & {
    MessageIds: MessageIds;
    RuleOptions: RuleOptions;
};

function createRuleVisitor(context: RuleContext<FilenameNoDotsRuleDefinitionTypeOptions>) {
    const option = context.options[0];
    const ignorePatterns = option?.ignorePattern ?? [];

    const filename = basename(context.filename);

    // Check if filename matches any ignore pattern
    if (ignorePatterns.some((pattern) => new RegExp(pattern).test(filename))) {
        return {};
    }

    // Remove file extension (everything after the last dot)
    const lastDotIndex = filename.lastIndexOf('.');
    const nameWithoutExt = lastDotIndex === -1 ? filename : filename.slice(0, lastDotIndex);

    // For test files, remove .test suffix
    const baseName = nameWithoutExt.endsWith('.test')
        ? nameWithoutExt.slice(0, -5) // Remove '.test'
        : nameWithoutExt;

    // Check if base name contains any dots
    if (baseName.includes('.')) {
        return {
            Program(node: TSESTree.Program) {
                context.report({
                    node,
                    messageId: 'noDotsInFilename',
                });
            },
        };
    }

    return {};
}

export const rule: RuleDefinition<FilenameNoDotsRuleDefinitionTypeOptions> = {
    create(context: RuleContext<FilenameNoDotsRuleDefinitionTypeOptions>) {
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
