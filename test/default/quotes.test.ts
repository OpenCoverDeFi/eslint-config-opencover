import { describe, it } from 'vitest';
import { lintText, expectRuleError } from '../setup.js';
import defaultConfig from '@/default.js';

describe('quotes', () => {
	it('should enforce single quotes', async () => {
		const code = `const notUsed = "5";
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, 'quotes');
	});
});
