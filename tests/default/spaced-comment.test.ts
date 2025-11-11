import { describe, it } from 'vitest';
import { lintText, expectRuleError } from '../test-utils.js';
import defaultConfig from '@/default.js';

const ruleName = 'spaced-comment';

describe(ruleName, () => {
	it('should enforce spaced comments', async () => {
		const code = 'const fn = (x) => x; //an uncapitalized comment without a space before it';

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});
});
