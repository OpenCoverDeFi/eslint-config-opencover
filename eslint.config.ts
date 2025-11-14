import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import opencoverConfig from './src/index.js';

export default defineConfig([
    {
        ignores: ['**/node_modules/**', '**/dist/**', '**/coverage/**', '**/.temp/**', '**/.git/**', '**/yarn.lock'],
    },
    ...opencoverConfig,
    {
        files: ['src/**/*.ts', 'tests/**/*.ts', 'vitest.config.ts', 'eslint.config.ts'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 2024,
                sourceType: 'module',
                projectService: true,
            },
        },
    },
]);
