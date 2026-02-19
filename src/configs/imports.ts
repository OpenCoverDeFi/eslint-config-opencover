import importPlugin from 'eslint-plugin-import';
import type { RulesConfig } from '@eslint/core';
import { GLOB_SRC } from '../globs.js';
import type { TypedFlatConfigItem } from '../types.js';

export function imports(overrides: Partial<RulesConfig> = {}): TypedFlatConfigItem[] {
    return [
        {
            name: 'opencover/imports/setup',
            plugins: {
                import: importPlugin,
            },
        },
        {
            name: 'opencover/imports/rules',
            files: [GLOB_SRC],
            rules: {
                'import/order': [
                    'warn',
                    {
                        pathGroups: [
                            {
                                pattern: '@dc/**',
                                group: 'parent',
                                position: 'before',
                            },
                        ],
                    },
                ],
                'import/prefer-default-export': 'off',

                ...overrides,
            },
        },
    ];
}
