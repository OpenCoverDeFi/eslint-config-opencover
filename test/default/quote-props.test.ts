import { describe, it } from 'vitest';
import { lintText, expectRuleWarning } from '../setup.js';
import defaultConfig from '@/default.js';

describe('quote-props', () => {
	it('should enforce quote props as needed', async () => {
		const code = `const obj = {'prop': 1, 'valid-prop': 2};
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleWarning(result, 'quote-props');
	});
});
