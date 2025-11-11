import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleWarning } from '../test-utils.js';
import defaultConfig from '@/default.js';

const ruleName = 'capitalized-comments';

describe(ruleName, () => {
	it('should enforce capitalized comments', async () => {
		const code = dedent`
			const fn = (x) => x; //an uncapitalized comment without a space before it
			// This comment is valid since it has the correct capitalization.
			// this comment is ignored since it follows another comment,
			// and this one as well because it follows yet another comment.
		`;

		const [result] = await lintText(defaultConfig, code);

		expectRuleWarning(result, ruleName);
	});
});
