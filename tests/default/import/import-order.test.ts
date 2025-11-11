import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleWarning } from '../../test-utils.js';
import defaultConfig from '@/default.js';

const ruleName = 'import/order';

describe(ruleName, () => {
	it('should enforce import order', async () => {
		const code = dedent`
			import { something } from './local';
			import fs from 'fs';
		`;

		const [result] = await lintText(defaultConfig, code);

		expectRuleWarning(result, ruleName);
	});
});
