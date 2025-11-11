import type { ESLint } from 'eslint';
import { rule as noUnnecessaryOptionalChainRule } from './rules/no-unnecessary-optional-chain.js';
import { rule as filenameNoDotsRule } from './rules/filename-no-dots.js';
import { rule as noEnumRule } from './rules/no-enum.js';

export default {
	rules: {
		'no-unnecessary-optional-chain': noUnnecessaryOptionalChainRule,
		'filename-no-dots': filenameNoDotsRule,
		'no-enum': noEnumRule,
	},
} satisfies ESLint.Plugin;
