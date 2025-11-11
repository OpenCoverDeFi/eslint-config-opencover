import { describe, it } from 'vitest';
import { createTempFileWithName, lintFile, expectRuleError, expectNoRuleError } from '../setup.js';
import defaultConfig from '@/default.js';

const ruleName = 'unicorn/filename-case';

describe(ruleName, () => {
	it('should throw error for camelCase filename', async () => {
		const code = 'const x = 1;';
		const filePath = createTempFileWithName(code, 'camelCase.ts');

		const [result] = await lintFile(defaultConfig, filePath);

		expectRuleError(result, ruleName);
	});

	it('should throw error for PascalCase filename', async () => {
		const code = 'const x = 1;';
		const filePath = createTempFileWithName(code, 'PascalCase.ts');

		const [result] = await lintFile(defaultConfig, filePath);

		expectRuleError(result, ruleName);
	});

	it('should throw error for snake_case filename', async () => {
		const code = 'const x = 1;';
		const filePath = createTempFileWithName(code, 'snake_case.ts');

		const [result] = await lintFile(defaultConfig, filePath);

		expectRuleError(result, ruleName);
	});

	it('should not throw error for kebab-case filename', async () => {
		const code = 'const x = 1;';
		const filePath = createTempFileWithName(code, 'kebab-case.ts');

		const [result] = await lintFile(defaultConfig, filePath);

		expectNoRuleError(result, ruleName);
	});

	it('should not throw error for single word lowercase filename', async () => {
		const code = 'const x = 1;';
		const filePath = createTempFileWithName(code, 'file.ts');

		const [result] = await lintFile(defaultConfig, filePath);

		expectNoRuleError(result, ruleName);
	});

	it('should throw error for camelCase.test.ts filename', async () => {
		const code = 'const x = 1;';
		const filePath = createTempFileWithName(code, 'camelCase.test.ts');

		const [result] = await lintFile(defaultConfig, filePath);

		expectRuleError(result, ruleName);
	});

	it('should not throw error for kebab-case.test.ts filename', async () => {
		const code = 'const x = 1;';
		const filePath = createTempFileWithName(code, 'kebab-case.test.ts');

		const [result] = await lintFile(defaultConfig, filePath);

		expectNoRuleError(result, ruleName);
	});
});
