import type { RulesConfig } from '@eslint/core';
import unicorn from 'eslint-plugin-unicorn';
import type { TypedFlatConfigItem } from '../types.js';
import { GLOB_SRC } from '../globs.js';

export function unicornConfig(overrides: Partial<RulesConfig> = {}): TypedFlatConfigItem[] {
    return [
        {
            name: 'opencover/unicorn/setup',
            plugins: {
                unicorn,
            },
        },
        {
            name: 'opencover/unicorn/rules',
            files: [GLOB_SRC],
            rules: {
                'unicorn/no-array-callback-reference': 'error',
                'unicorn/filename-case': [
                    'error',
                    {
                        case: 'kebabCase',
                    },
                ],

                ...overrides,
            },
        },
    ];
}
