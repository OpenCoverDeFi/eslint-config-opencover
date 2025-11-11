import { describe, it } from 'vitest';
import { lintText, expectRuleError } from '../setup.js';
import defaultConfig from '@/default.js';

const ruleName = 'spaced-comment';

describe(ruleName, () => {
	it('should enforce spaced comments', async () => {
		const code = `const fn = (x) => x; //an uncapitalized comment without a space before it
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});
});
