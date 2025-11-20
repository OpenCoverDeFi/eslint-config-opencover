import { expect } from 'vitest';
import type { ESLint } from 'eslint';

declare module 'vitest' {
    interface Assertion {
        toHaveRuleError(ruleId: string): void;
        toHaveRuleWarning(ruleId: string): void;
        toHaveNoRuleError(ruleId: string): void;
    }
    interface AsymmetricMatchersContaining {
        toHaveRuleError(ruleId: string): void;
        toHaveRuleWarning(ruleId: string): void;
        toHaveNoRuleError(ruleId: string): void;
    }
}

expect.extend({
    toHaveRuleError(received: ESLint.LintResult, ruleId: string) {
        const { errorCount, messages } = received;
        const hasError = errorCount > 0 && messages.some((msg) => msg.ruleId === ruleId);

        if (hasError) {
            return {
                message: () => `Expected lint result not to have error for rule "${ruleId}"`,
                pass: true,
            };
        }

        return {
            message: () =>
                `Expected lint result to have error for rule "${ruleId}", but it didn't. Found ${errorCount} error(s) with rules: ${messages
                    .map((m) => m.ruleId)
                    .filter(Boolean)
                    .join(', ')}`,
            pass: false,
        };
    },

    toHaveRuleWarning(received: ESLint.LintResult, ruleId: string) {
        const { warningCount, messages } = received;
        const hasWarning = warningCount > 0 && messages.some((msg) => msg.ruleId === ruleId);

        if (hasWarning) {
            return {
                message: () => `Expected lint result not to have warning for rule "${ruleId}"`,
                pass: true,
            };
        }

        return {
            message: () =>
                `Expected lint result to have warning for rule "${ruleId}", but it didn't. Found ${warningCount} warning(s) with rules: ${messages
                    .map((m) => m.ruleId)
                    .filter(Boolean)
                    .join(', ')}`,
            pass: false,
        };
    },

    toHaveNoRuleError(received: ESLint.LintResult, ruleId: string) {
        const { messages } = received;
        const hasError = messages.some((msg) => msg.ruleId === ruleId);

        if (!hasError) {
            return {
                message: () => `Expected lint result to have error for rule "${ruleId}"`,
                pass: true,
            };
        }

        return {
            message: () => `Expected lint result not to have error for rule "${ruleId}", but it did.`,
            pass: false,
        };
    },
});
