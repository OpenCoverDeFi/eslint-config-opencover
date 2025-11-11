import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		setupFiles: ['tests/setup.ts'],
		testTimeout: 60000,
		coverage: {
			reporter: ['text', 'json', 'html'],
		},
	},
	resolve: {
		alias: {
			'@/': new URL('./src/', import.meta.url).pathname,
		},
	},
});
