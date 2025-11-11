import { describe, it } from 'vitest';
import { lintText, expectRuleError } from '../setup.js';
import defaultConfig from '@/default.js';

const ruleName = 'space-in-parens';

describe(ruleName, () => {
	it('should enforce no space in parens', async () => {
		const code = `const result = ( 1 + 2 );
	function test( x ) { return x; }
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});
});
