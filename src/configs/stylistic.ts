import type { RulesConfig } from '@eslint/core';
import stylistic from '@stylistic/eslint-plugin';
import type { TypedFlatConfigItem } from '../types.js';
import { GLOB_SRC } from '../globs.js';

export function stylisticConfig(overrides: Partial<RulesConfig> = {}): TypedFlatConfigItem[] {
    return [
        {
            name: 'opencover/stylistic/setup',
            plugins: {
                stylistic,
            },
        },
        {
            name: 'opencover/stylistic/rules',
            files: [GLOB_SRC],
            rules: {
                'stylistic/padding-line-between-statements': [
                    'error',
                    {
                        blankLine: 'always',
                        prev: '*',
                        next: ['function', 'class', 'export'],
                    },
                    {
                        blankLine: 'always',
                        prev: ['function', 'class', 'export'],
                        next: '*',
                    },
                    {
                        blankLine: 'always',
                        prev: '*',
                        next: 'if',
                    },
                    {
                        blankLine: 'always',
                        prev: 'block-like',
                        next: 'if',
                    },
                    {
                        blankLine: 'always',
                        prev: 'if',
                        next: '*',
                    },
                ],

                ...overrides,
            },
        },
    ];
}
