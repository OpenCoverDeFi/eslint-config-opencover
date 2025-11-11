import { describe, it } from 'vitest';
import { lintText, expectRuleWarning } from '../setup.js';
import defaultConfig from '@/default.js';

describe('no-multiple-empty-lines', () => {
	it('should throw error for multiple empty lines', async () => {
		const code = `const x = 1;


const y = 2;
`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleWarning(result, 'no-multiple-empty-lines');
	});
});
