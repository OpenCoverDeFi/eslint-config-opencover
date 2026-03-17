export const GLOB_TS = ['**/*.?([cm])ts', '**/*.tsx'];

export const GLOB_JSX = ['**/*.jsx'];

export const GLOB_TSX = ['**/*.tsx'];

export const GLOB_TEST = ['**/*.spec.?([cm])[jt]s', '**/*.spec.[jt]sx', '**/*.test.?([cm])[jt]s', '**/*.test.[jt]sx'];

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
