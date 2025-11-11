import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleError } from '../test-utils.js';
import defaultConfig from '@/default.js';

const ruleName = 'comma-spacing';

describe(ruleName, () => {
	it('should enforce comma spacing', async () => {
		const code = dedent`
			const arr = [1,2,3];
			const obj = {a:1,b:2};
		`;

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});
});
