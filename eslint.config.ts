import { defineConfig } from 'eslint/config';
import defaultConfig from './src/default.js';

export default defineConfig([
	{
		ignores: ['**/node_modules/**', '**/dist/**', '**/coverage/**', '**/.temp/**', '**/.git/**', '**/yarn.lock'],
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
