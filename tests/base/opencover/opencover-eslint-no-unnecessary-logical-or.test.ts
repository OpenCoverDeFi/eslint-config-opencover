import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleError, expectNoRuleError } from '@tests/test-utils.js';
import defaultConfig from '@eslint-config-opencover/index.js';

const ruleName = '@opencover-eslint/no-unnecessary-logical-or';

describe(ruleName, () => {
    it('should throw error for unnecessary || null with non-nullable value', async () => {
        const code = dedent`
            const value: string = 'hello';
            const result = value || null;
        `;

        const result = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for unnecessary || undefined with non-nullable value', async () => {
        const code = dedent`
            const value: number = 42;
            const result = value || undefined;
        `;

        const result = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should not throw error for || null with nullable value', async () => {
        const code = dedent`
            function getValue(): string | null {
                return Math.random() > 0.5 ? 'hello' : null;
            }
            const value = getValue();
            const result = value || null;
        `;

        const result = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should not throw error for || undefined with optional value', async () => {
        const code = dedent`
            function getValue(): string | undefined {
                return Math.random() > 0.5 ? 'hello' : undefined;
            }
            const value = getValue();
            const result = value || undefined;
        `;

        const result = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });
});
