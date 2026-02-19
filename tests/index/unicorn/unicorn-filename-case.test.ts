import { describe, it, expect } from 'vitest';
import { createTempFile, lintFilePath, defaultConfig } from '@tests/test-utils.js';

const ruleName = 'unicorn/filename-case';

describe(ruleName, () => {
    it('should throw error for camelCase filename', async () => {
        const filePath = createTempFile('camelCase.ts');
        expect(await lintFilePath(defaultConfig, filePath)).toHaveRuleError(ruleName);
    });

    it('should throw error for PascalCase filename', async () => {
        const filePath = createTempFile('PascalCase.ts');
        expect(await lintFilePath(defaultConfig, filePath)).toHaveRuleError(ruleName);
    });

    it('should throw error for snake_case filename', async () => {
        const filePath = createTempFile('snake_case.ts');
        expect(await lintFilePath(defaultConfig, filePath)).toHaveRuleError(ruleName);
    });

    it('should not throw error for kebab-case filename', async () => {
        const filePath = createTempFile('kebab-case.ts');
        expect(await lintFilePath(defaultConfig, filePath)).toHaveNoRuleError(ruleName);
    });

    it('should not throw error for single word lowercase filename', async () => {
        const filePath = createTempFile('file.ts');
        expect(await lintFilePath(defaultConfig, filePath)).toHaveNoRuleError(ruleName);
    });

    it('should throw error for camelCase.test.ts filename', async () => {
        const filePath = createTempFile('camelCase.test.ts');
        expect(await lintFilePath(defaultConfig, filePath)).toHaveRuleError(ruleName);
    });

    it('should not throw error for kebab-case.test.ts filename', async () => {
        const filePath = createTempFile('kebab-case.test.ts');
        expect(await lintFilePath(defaultConfig, filePath)).toHaveNoRuleError(ruleName);
    });
});
