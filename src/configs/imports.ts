import importPlugin from 'eslint-plugin-import';
import { GLOB_SRC } from '../globs.js';
import type { TypedFlatConfigItem } from '../types.js';

export const imports: TypedFlatConfigItem[] = [
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
        },
    },
];
