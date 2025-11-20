import { describe, it } from 'vitest';
import { createTempFile, lintFile, expectRuleError, expectNoRuleError } from '@tests/test-utils.js';
import defaultConfig from '@/index.js';

const ruleName = '@opencover-eslint/filename-no-dots';

describe(ruleName, () => {
    it('should throw error for filename with dot (file.name.ts)', async () => {
        const filePath = createTempFile('file.name.ts');
        const result = await lintFile(defaultConfig, filePath);
        expectRuleError(result, ruleName);
    });

    it('should throw error for filename with multiple dots (some.file.name.ts)', async () => {
        const filePath = createTempFile('some.file.name.ts');
        const result = await lintFile(defaultConfig, filePath);
        expectRuleError(result, ruleName);
    });

    it('should throw error for filename with dot before test (file.name.test.ts)', async () => {
        const filePath = createTempFile('file.name.test.ts');
        const result = await lintFile(defaultConfig, filePath);
        expectRuleError(result, ruleName);
    });

    it('should not throw error for kebab-case.test.ts filename', async () => {
        const filePath = createTempFile('kebab-case.test.ts');
        const result = await lintFile(defaultConfig, filePath);
        expectNoRuleError(result, ruleName);
    });

    it('should not throw error for regular kebab-case filename', async () => {
        const filePath = createTempFile('kebab-case.ts');
        const result = await lintFile(defaultConfig, filePath);
        expectNoRuleError(result, ruleName);
    });

    it('should not throw error for single word filename', async () => {
        const filePath = createTempFile('file.ts');
        const result = await lintFile(defaultConfig, filePath);
        expectNoRuleError(result, ruleName);
    });
});
