import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        testTimeout: 60_000,
        coverage: {
            reporter: ['text', 'json', 'html'],
        },
    },
    resolve: {
        alias: {
            '@/': fileURLToPath(new URL('src/', import.meta.url)),
        },
    },
});
