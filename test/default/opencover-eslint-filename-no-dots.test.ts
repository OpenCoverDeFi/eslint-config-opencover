import { describe, it } from 'vitest';
import { createTempFileWithName, lintFile, expectRuleError, expectNoRuleError } from '../setup.js';
import defaultConfig from '@/default.js';

const ruleName = '@opencover-eslint/filename-no-dots';

describe(ruleName, () => {
	it('should throw error for filename with dot (file.name.ts)', async () => {
		const code = 'const x = 1;';
		const filePath = createTempFileWithName(code, 'file.name.ts');

		const [result] = await lintFile(defaultConfig, filePath);

		expectRuleError(result, ruleName);
	});

	it('should throw error for filename with multiple dots (some.file.name.ts)', async () => {
		const code = 'const x = 1;';
		const filePath = createTempFileWithName(code, 'some.file.name.ts');

		const [result] = await lintFile(defaultConfig, filePath);

		expectRuleError(result, ruleName);
	});

	it('should throw error for filename with dot before test (file.name.test.ts)', async () => {
		const code = 'const x = 1;';
		const filePath = createTempFileWithName(code, 'file.name.test.ts');

		const [result] = await lintFile(defaultConfig, filePath);

		expectRuleError(result, ruleName);
	});

	it('should not throw error for kebab-case.test.ts filename', async () => {
		const code = 'const x = 1;';
		const filePath = createTempFileWithName(code, 'kebab-case.test.ts');

		const [result] = await lintFile(defaultConfig, filePath);

		expectNoRuleError(result, ruleName);
	});

	it('should not throw error for regular kebab-case filename', async () => {
		const code = 'const x = 1;';
		const filePath = createTempFileWithName(code, 'kebab-case.ts');

		const [result] = await lintFile(defaultConfig, filePath);

		expectNoRuleError(result, ruleName);
	});

	it('should not throw error for single word filename', async () => {
		const code = 'const x = 1;';
		const filePath = createTempFileWithName(code, 'file.ts');

		const [result] = await lintFile(defaultConfig, filePath);

		expectNoRuleError(result, ruleName);
	});
});
