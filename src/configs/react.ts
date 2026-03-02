import tseslint from 'typescript-eslint';
import { GLOB_JSX, GLOB_TSX } from '../globs.js';
import type { TypedFlatConfigItem } from '../types.js';

/**
 * React ESLint config.
 *
 * Requires optional peers: `eslint-plugin-react` and `eslint-plugin-react-hooks`.
 * Install them in your project before using this config.
 */
export async function reactConfig(): Promise<TypedFlatConfigItem[]> {
    const [{ default: react }, { default: reactHooks }] = await Promise.all([
        import('eslint-plugin-react').catch(() => {
            throw new Error(
                '[eslint-config-opencover] `eslint-plugin-react` is required to use the react config. Install it: pnpm add -D eslint-plugin-react'
            );
        }),
        import('eslint-plugin-react-hooks').catch(() => {
            throw new Error(
                '[eslint-config-opencover] `eslint-plugin-react-hooks` is required to use the react config. Install it: pnpm add -D eslint-plugin-react-hooks'
            );
        }),
    ]);

    return [
        // Upstream flat configs bring their own plugins + rules.
        react.configs.flat.recommended,
        reactHooks.configs.flat.recommended,

        // OpenCover react overrides.
        {
            name: 'opencover/react',
            files: [GLOB_JSX, GLOB_TSX],
            languageOptions: {
                parser: tseslint.parser,
                parserOptions: {
                    projectService: true,
                    ecmaFeatures: { jsx: true },
                },
            },
            settings: {
                react: { version: 'detect' },
            },
            rules: {
                // Not needed with the modern JSX transform (React 17+)
                'react/react-in-jsx-scope': 'off',
                'react/jsx-uses-react': 'off',

                // Disable type-aware rule that conflicts with React JSX event handlers
                '@typescript-eslint/no-misused-promises': 'off',
            },
        },
    ];
}
