import { describe, it } from 'vitest';
import { lintText, expectRuleError } from '../setup.js';
import defaultConfig from '@/default.js';

describe('no-multi-spaces', () => {
	it('should enforce no multiple spaces', async () => {
		const code = `const x = 1;  const y = 2;
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, 'no-multi-spaces');
	});
});
