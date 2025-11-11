import { describe, it } from 'vitest';
import { lintText, expectRuleWarning } from '../setup.js';
import defaultConfig from '@/default.js';

const ruleName = 'capitalized-comments';

describe(ruleName, () => {
	it('should enforce capitalized comments', async () => {
		const code = `const fn = (x) => x; //an uncapitalized comment without a space before it
	// This comment is valid since it has the correct capitalization.
	// this comment is ignored since it follows another comment,
	// and this one as well because it follows yet another comment.
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleWarning(result, ruleName);
	});
});
