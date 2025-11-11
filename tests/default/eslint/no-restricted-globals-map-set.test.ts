import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleError, expectNoRuleError } from '@tests/test-utils.js';
import defaultConfig from '@eslint-config-opencover/default.js';

const ruleName = 'no-restricted-globals';

describe(`${ruleName} (Map and Set)`, () => {
	it('should throw error for new Map()', async () => {
		const code = 'const map = new Map();';

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for new Map with arguments', async () => {
		const code = "const map = new Map([['key', 'value']]);";

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for new Set()', async () => {
		const code = 'const set = new Set();';

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for new Set with arguments', async () => {
		const code = 'const set = new Set([1, 2, 3]);';

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for Map as variable reference', async () => {
		const code = `const MapConstructor = Map;
	`;

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should throw error for Set as variable reference', async () => {
		const code = 'const SetConstructor = Set;';

		const [result] = await lintText(defaultConfig, code);

		expectRuleError(result, ruleName);
	});

	it('should not throw error for other globals', async () => {
		const code = dedent`
            const arr = new Array();
			const obj = new Object();
		`;

		const [result] = await lintText(defaultConfig, code);

		expectNoRuleError(result, ruleName);
	});
});
