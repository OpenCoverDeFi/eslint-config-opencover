import { defineConfig } from 'eslint/config';
import defaultConfig from './src/default.js';

export default defineConfig([
	{
		ignores: [
			'**/node_modules/**',
			'**/dist/**',
			'**/main/**',
			'**/*.js',
			'**/*.mjs',
			'**/*.cjs',
			'**/coverage/**',
			'**/.temp/**',
			'**/.git/**',
			'**/yarn.lock',
			'**/package-lock.json',
		],
	},
	...defaultConfig.map((config) => {
		if (config.files) {
			return config;
		}
		return {
			...config,
			files: ['**/*.ts'],
		};
	}),
]);
