import { describe, it } from 'vitest';
import { lintText, expectRuleWarning } from '../setup.js';
import defaultConfig from '@/default.js';

describe('object-curly-spacing', () => {
	it('should enforce object curly spacing', async () => {
		const code = `const fn = (x) => x;
	fn({a:1});
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleWarning(result, 'object-curly-spacing');
	});
});
