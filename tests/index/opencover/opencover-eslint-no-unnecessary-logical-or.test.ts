import { describe, it, expect } from 'vitest';
import dedent from 'dedent';
import { lintWithDefaultConfig } from '@tests/test-utils.js';

const ruleName = 'opencover/no-unnecessary-logical-or';

describe(ruleName, () => {
    it('should throw error for unnecessary || null with non-nullable value', async () => {
        const code = dedent`
            const value: string = 'hello';
            const result = value || null;
        `;
        expect(await lintWithDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should throw error for unnecessary || undefined with non-nullable value', async () => {
        const code = dedent`
            const value: number = 42;
            const result = value || undefined;
        `;
        expect(await lintWithDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should not throw error for || null with nullable value', async () => {
        const code = dedent`
            function getValue(): string | null {
                return Math.random() > 0.5 ? 'hello' : null;
            }
            const value = getValue();
            const result = value || null;
        `;
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError(ruleName);
    });

    it('should not throw error for || undefined with optional value', async () => {
        const code = dedent`
            function getValue(): string | undefined {
                return Math.random() > 0.5 ? 'hello' : undefined;
            }
            const value = getValue();
            const result = value || undefined;
        `;
        expect(await lintWithDefaultConfig(code)).toHaveNoRuleError(ruleName);
    });
});
