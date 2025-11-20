import { describe, it } from 'vitest';
import { createTempFile, lintFile, expectRuleError, expectNoRuleError } from '@tests/test-utils.js';
import defaultConfig from '@/index.js';

const ruleName = 'unicorn/filename-case';

describe(ruleName, () => {
    it('should throw error for camelCase filename', async () => {
        const filePath = createTempFile('camelCase.ts');
        const result = await lintFile(defaultConfig, filePath);
        expectRuleError(result, ruleName);
    });

    it('should throw error for PascalCase filename', async () => {
        const filePath = createTempFile('PascalCase.ts');
        const result = await lintFile(defaultConfig, filePath);
        expectRuleError(result, ruleName);
    });

    it('should throw error for snake_case filename', async () => {
        const filePath = createTempFile('snake_case.ts');
        const result = await lintFile(defaultConfig, filePath);
        expectRuleError(result, ruleName);
    });

    it('should not throw error for kebab-case filename', async () => {
        const filePath = createTempFile('kebab-case.ts');
        const result = await lintFile(defaultConfig, filePath);
        expectNoRuleError(result, ruleName);
    });

    it('should not throw error for single word lowercase filename', async () => {
        const filePath = createTempFile('file.ts');
        const result = await lintFile(defaultConfig, filePath);
        expectNoRuleError(result, ruleName);
    });

    it('should throw error for camelCase.test.ts filename', async () => {
        const filePath = createTempFile('camelCase.test.ts');
        const result = await lintFile(defaultConfig, filePath);
        expectRuleError(result, ruleName);
    });

    it('should not throw error for kebab-case.test.ts filename', async () => {
        const filePath = createTempFile('kebab-case.test.ts');
        const result = await lintFile(defaultConfig, filePath);
        expectNoRuleError(result, ruleName);
    });
});
