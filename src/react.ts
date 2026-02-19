import { opencover } from './factory.js';

/**
 * OpenCover ESLint config with React support.
 *
 * @param options Configuration options
 * @returns ESLint flat config array
 *
 * @note TypeScript + React Integration Issue
 * There's a known issue where TypeScript type-aware rules can conflict with
 * React JSX code, especially in incomplete code snippets or certain edge cases.
 * This preset disables `@typescript-eslint/no-misused-promises` for React files
 * as a workaround.
 *
 * TODO: Investigate separating React+JS and React+TypeScript into separate configs
 * to better handle the different linting requirements:
 * - `react` - Pure React with JavaScript
 * - `react-typescript` - React with TypeScript type-aware linting
 *
 * This would allow users to opt-in to type-aware rules only when needed and
 * avoid conflicts in mixed or edge-case scenarios.
 */
export default async function opencoverReact(
    options: {
        typescript?: boolean;
        tsconfigPath?: string;
    } = {}
) {
    const config = await opencover({
        ...options,
        react: true,
    });

    // Add React-specific overrides to handle code snippets without full context
    // NOTE: This is a workaround for TypeScript type-aware rules conflicting with React JSX
    config.push({
        name: 'opencover/react/overrides',
        files: ['**/*.jsx', '**/*.tsx'],
        rules: {
            // Disable type-aware rules that don't work well with incomplete React snippets
            // See note above about potential future separation of JS/TS React configs
            '@typescript-eslint/no-misused-promises': 'off',
        },
    });

    return config;
}
