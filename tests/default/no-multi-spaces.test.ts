import { describe, it } from 'vitest';
import { lintText, expectRuleError } from '../test-utils.js';
import defaultConfig from '@/default.js';

const ruleName = 'no-multi-spaces';

describe(ruleName, () => {
	it('should enforce no multiple spaces', async () => {
		const code = 'const x = 1;  const y = 2;';

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});
});
