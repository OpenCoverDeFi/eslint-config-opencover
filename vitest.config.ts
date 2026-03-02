import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        testTimeout: 60_000,
        setupFiles: ['./tests/setup.ts'],
        coverage: {
            reporter: ['text', 'json', 'html'],
        },
    },
    resolve: {
        alias: {
            '@/': new URL('src/', import.meta.url).pathname,
        },
    },
});
