import { basename } from 'node:path';
import type { TSESTree } from '@typescript-eslint/utils';
import { createRule } from '../utils.js';

type Options = [
    {
        ignorePattern?: string[];
    },
];

type OptionsObject = Options[0];

function isOptionsObject(value: unknown): value is OptionsObject {
    if (typeof value !== 'object' || value === null) {
        return false;
    }
    if (!('ignorePattern' in value) || !Array.isArray(value.ignorePattern)) {
        return false;
    }
    if (value.ignorePattern.some((pattern: unknown) => typeof pattern !== 'string')) {
        return false;
    }
    return true;
}

function getOptions(options: Options): OptionsObject {
    const firstOption: unknown = options[0];
    return isOptionsObject(firstOption) ? firstOption : {};
}

export const rule = createRule({
    name: 'filename-no-dots',
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow dots in filenames (except .test. in test files)',
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
    defaultOptions: [{}],
    create(context, [options]) {
        const optionsObject = getOptions([options]);
        const ignorePatterns = optionsObject.ignorePattern ?? [];

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
    },
});
