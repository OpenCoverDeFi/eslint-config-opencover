import { describe, it } from 'vitest';
import { lintText, expectRuleError } from '../setup.js';
import defaultConfig from '@/default.js';

describe('block-spacing', () => {
	it('should enforce block spacing', async () => {
		const code = `function test(){return true;}
	`.replace(/\t*/g, '');

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, 'block-spacing');
	});
});
