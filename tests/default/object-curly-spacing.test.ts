import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleWarning } from '../test-utils.js';
import defaultConfig from '@/default.js';

const ruleName = 'object-curly-spacing';

describe(ruleName, () => {
	it('should enforce object curly spacing', async () => {
		const code = dedent`
			const fn = (x) => x;
			fn({a:1});
		`;

		const [result] = await lintText(defaultConfig, code);

		expectRuleWarning(result, ruleName);
	});
});
