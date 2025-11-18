import { defineConfig } from 'eslint/config';
import opencoverConfig from './src/index.js';

export default defineConfig([
    {
        ignores: [
            '**/node_modules/**',
            '**/dist/**',
            '**/coverage/**',
            '**/.temp/**',
            '**/.git/**',
            '**/yarn.lock',
            'eslint.config.mjs',
        ],
    },
    ...opencoverConfig,
]);
