import tseslint from 'typescript-eslint';
import { GLOB_TS, GLOB_TSX } from '../globs.js';
import type { TypedFlatConfigItem } from '../types.js';

export const typescript: TypedFlatConfigItem[] = [
    {
        name: 'opencover/typescript/setup',
        plugins: {
            '@typescript-eslint': tseslint.plugin,
        },
    },
    {
        name: 'opencover/typescript/parser',
        files: [GLOB_TS, GLOB_TSX],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 2024,
                sourceType: 'module',
                projectService: true,
                tsconfigRootDir: process.cwd(),
            },
        },
    },
    {
        name: 'opencover/typescript/rules',
        files: [GLOB_TS, GLOB_TSX],
        rules: {
            // Extend recommended configs
            ...tseslint.configs.recommended[1].rules, // Disable conflicting rules
            ...tseslint.configs.recommended[2].rules, // Recommended rules
            ...tseslint.configs.recommendedTypeCheckedOnly[2].rules,
            ...tseslint.configs.strictTypeCheckedOnly[2].rules,

            // Custom OpenCover TypeScript rules
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports',
                    disallowTypeAnnotations: false,
                },
            ],
            '@typescript-eslint/explicit-member-accessibility': 'error',
            '@typescript-eslint/member-ordering': 'error',
            '@typescript-eslint/no-non-null-assertion': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-restricted-types': [
                'error',
                {
                    types: {
                        Map: {
                            message: 'Map is not allowed. Use Object instead.',
                        },
                    },
                },
            ],
        },
    },
];
