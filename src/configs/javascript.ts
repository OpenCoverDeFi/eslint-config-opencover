import js from '@eslint/js';
import { GLOB_SRC } from '../globs.js';
import type { TypedFlatConfigItem } from '../types.js';

export const javascript: TypedFlatConfigItem[] = [
    {
        name: 'opencover/javascript',
        files: [GLOB_SRC],
        rules: {
            ...js.configs.recommended.rules,

            'capitalized-comments': [
                'warn',
                'always',
                {
                    ignoreConsecutiveComments: true,
                },
            ],
            'no-console': ['error', { allow: ['warn', 'error'] }],
            'no-restricted-syntax': [
                'error',
                {
                    selector: 'TSEnumDeclaration',
                    message: 'Enums are not allowed.',
                },
            ],
            'no-unneeded-ternary': 'error',
            'no-use-before-define': ['off'],
        },
    },
];
