import type { ESLint } from 'eslint';
import { rule } from './rules/no-unnecessary-optional-chain.js';

export default {
	rules: {
		'no-unnecessary-optional-chain': rule,
	},
} satisfies ESLint.Plugin;
