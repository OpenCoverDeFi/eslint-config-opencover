import importPlugin from 'eslint-plugin-import';
import { GLOB_SRC } from '../globs.js';
import type { TypedFlatConfigItem } from '../types.js';

export const imports: TypedFlatConfigItem[] = [
    {
        name: 'opencover/imports',
        files: [GLOB_SRC],
        plugins: {
            import: importPlugin,
        },
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
