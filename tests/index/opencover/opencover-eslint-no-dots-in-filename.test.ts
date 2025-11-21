import { describe, it, expect } from 'vitest';
import { createTempFile, lintFilePath } from '@tests/test-utils.js';
import defaultConfig from '@/index.js';

const ruleName = 'opencover/no-dots-in-filename';

describe(ruleName, () => {
    it('should throw error for filename with dot (file.name.ts)', async () => {
        const filePath = createTempFile('file.name.ts');
        expect(await lintFilePath(defaultConfig, filePath)).toHaveRuleError(ruleName);
    });

    it('should throw error for filename with multiple dots (some.file.name.ts)', async () => {
        const filePath = createTempFile('some.file.name.ts');
        expect(await lintFilePath(defaultConfig, filePath)).toHaveRuleError(ruleName);
    });

    it('should throw error for filename with dot before test (file.name.test.ts)', async () => {
        const filePath = createTempFile('file.name.test.ts');
        expect(await lintFilePath(defaultConfig, filePath)).toHaveRuleError(ruleName);
    });

    it('should not throw error for kebab-case.test.ts filename', async () => {
        const filePath = createTempFile('kebab-case.test.ts');
        expect(await lintFilePath(defaultConfig, filePath)).toHaveNoRuleError(ruleName);
    });

    it('should not throw error for regular kebab-case filename', async () => {
        const filePath = createTempFile('kebab-case.ts');
        expect(await lintFilePath(defaultConfig, filePath)).toHaveNoRuleError(ruleName);
    });

    it('should not throw error for single word filename', async () => {
        const filePath = createTempFile('file.ts');
        expect(await lintFilePath(defaultConfig, filePath)).toHaveNoRuleError(ruleName);
    });
});
