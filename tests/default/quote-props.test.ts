import { describe, it } from 'vitest';
import { lintText, expectRuleWarning } from '../test-utils.js';
import defaultConfig from '@/default.js';

const ruleName = 'quote-props';

describe(ruleName, () => {
	it('should enforce quote props as needed', async () => {
		const code = "const obj = {'prop': 1, 'valid-prop': 2};";

		const [result] = await lintText(defaultConfig, code);

		expectRuleWarning(result, ruleName);
	});
});
