import { describe, it } from 'vitest';
import { lintText, expectRuleError } from '../setup.js';
import defaultConfig from '@/default.js';

describe('comma-spacing', () => {
	it('should enforce comma spacing', async () => {
		const code = `const arr = [1,2,3];
	const obj = {a:1,b:2};
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, 'comma-spacing');
	});
});
