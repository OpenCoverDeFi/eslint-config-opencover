import { expect } from 'vitest';
import type { ESLint } from 'eslint';

function getUniqueRulesList(messages: ESLint.LintResult['messages']): string {
    const ruleIds = messages.map((m) => m.ruleId).filter(Boolean) as string[];
    return [...new Set(ruleIds)].join(', ') || 'none';
}

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

const createMatcher =
    (countKey: 'errorCount' | 'warningCount', type: string) => (received: ESLint.LintResult, ruleId: string) => {
        const count = received[countKey];
        const hasMatch = count > 0 && received.messages.some((msg) => msg.ruleId === ruleId);

        if (hasMatch) {
            return {
                message: () => `Expected lint result not to have ${type} for rule "${ruleId}"`,
                pass: true,
            };
        }

        const rulesList = getUniqueRulesList(received.messages);
        return {
            message: () =>
                `Expected lint result to have ${type} for rule "${ruleId}", but it didn't. ` +
                `Found ${count} ${type}(s) with rule(s): ${rulesList}`,
            pass: false,
        };
    };

expect.extend({
    toHaveRuleError: createMatcher('errorCount', 'error'),
    toHaveRuleWarning: createMatcher('warningCount', 'warning'),
    toHaveNoRuleError(received: ESLint.LintResult, ruleId: string) {
        const hasError = received.messages.some((msg) => msg.ruleId === ruleId);
        return {
            message: () =>
                hasError
                    ? `Expected lint result not to have error for rule "${ruleId}", but it did.`
                    : `Expected lint result to have error for rule "${ruleId}"`,
            pass: !hasError,
        };
    },
});
