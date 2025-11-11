import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleError } from '../test-utils.js';
import defaultConfig from '@/default.js';

const ruleName = 'space-in-parens';

describe(ruleName, () => {
	it('should enforce no space in parens', async () => {
		const code = dedent`
			const result = ( 1 + 2 );
			function test( x ) { return x; }
		`;

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});
});
