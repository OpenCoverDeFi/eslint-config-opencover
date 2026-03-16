export const GLOB_TS = ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'];

export const GLOB_TEST = ['**/*.spec.{js,jsx,ts,tsx,cjs,cts,mjs,mts}', '**/*.test.{js,jsx,ts,tsx,cjs,cts,mjs,mts}'];

export const GLOB_EXCLUDE = [
    '**/dist',
    '**/.dist',
    '**/coverage',
    '**/build',
    '**/.cache',
    '**/.nuxt',
    '**/.next',
    '**/.vercel',
    '**/.changeset',
    '**/.idea',
    '**/.output',
    '**/.vitepress/cache',
    '**/.vscode',
    '**/__snapshots__',
    '**/*.min.*',
    '**/__fixtures__',
    '**/fixtures/**',
];
