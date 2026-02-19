export const GLOB_SRC_EXT = '?([cm])[jt]s?(x)';

export const GLOB_SRC = '**/*.?([cm])[jt]s?(x)';

export const GLOB_JS = '**/*.?([cm])js';

export const GLOB_JSX = '**/*.?([cm])jsx';

export const GLOB_TS = '**/*.?([cm])ts';

export const GLOB_TSX = '**/*.?([cm])tsx';

export const GLOB_JSON = '**/*.json';

export const GLOB_JSON5 = '**/*.json5';

export const GLOB_JSONC = '**/*.jsonc';

export const GLOB_MARKDOWN = '**/*.md';

export const GLOB_MARKDOWN_IN_MARKDOWN = '**/*.md/*.md';

export const GLOB_TESTS = [
    '**/__tests__/**',
    '**/*.spec.?([cm])[jt]s?(x)',
    '**/*.test.?([cm])[jt]s?(x)',
    '**/tests/**',
];

export const GLOB_ALL_SRC = [GLOB_SRC, GLOB_JSON, GLOB_JSON5, GLOB_JSONC];

export const GLOB_EXCLUDE = [
    '**/node_modules',
    '**/dist',
    '**/.dist',
    '**/coverage',
    '**/build',
    '**/.git',
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
    '**/package-lock.json',
    '**/yarn.lock',
    '**/pnpm-lock.yaml',
    '**/bun.lockb',
    '**/CHANGELOG*.md',
    '**/*.min.*',
    '**/LICENSE*',
    '**/__fixtures__',
    '**/fixtures/**',
];
