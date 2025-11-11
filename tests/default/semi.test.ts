import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleError } from '../test-utils.js';
import defaultConfig from '@/default.js';

const ruleName = 'semi';

describe(ruleName, () => {
	it('should enforce semicolons', async () => {
		const code = dedent`
			const x = 1
			const y = 2
		`;

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});
});
