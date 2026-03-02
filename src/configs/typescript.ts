import tseslint from 'typescript-eslint';
import { GLOB_TS, GLOB_TSX } from '../globs.js';
import type { TypedFlatConfigItem } from '../types.js';

export const typescript: TypedFlatConfigItem[] = [
    // Global: plugin + parser registration (no files scope).
    tseslint.configs.strictTypeChecked[0],

    // TS/TSX only: all rule sets + projectService + OpenCover custom rules.
    {
        name: 'opencover/typescript',
        files: [GLOB_TS, GLOB_TSX],
        languageOptions: {
            parserOptions: {
                projectService: true,
            },
        },
        rules: {
            // We index into strictTypeChecked rather than spreading the full array
            // because [0] (plugin + parser) is kept global above, and [1]/[2] are
            // the rule sets. Spreading the array directly would apply the rules
            // without a files scope, causing type-aware rules to fire on non-TS
            // files (e.g. .mjs) where projectService is not active.
            ...tseslint.configs.strictTypeChecked[1].rules,
            ...tseslint.configs.strictTypeChecked[2].rules,

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
            // Ban Map in favor of plain objects/Records: they are serializable,
            // have simpler equality semantics, and integrate better with
            // TypeScript's Record type in our DeFi/insurance domain.
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
