import { describe, it, expect } from 'vitest';
import dedent from 'dedent';
import { lintDefaultConfig } from '@tests/test-utils.js';

const ruleName = '@opencover-eslint/todo-note-comment-style';

describe(ruleName, () => {
    it('should throw error for TODO without parentheses', async () => {
        const code = dedent`
            // TODO fix this
            const x = 1;
        `;
        expect(await lintDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should throw error for NOTE without parentheses', async () => {
        const code = dedent`
            // NOTE important information
            const x = 1;
        `;
        expect(await lintDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should throw error for TODO with incomplete parentheses', async () => {
        const code = dedent`
            // TODO (
            const x = 1;
        `;
        expect(await lintDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should throw error for TODO without date', async () => {
        const code = dedent`
            // TODO (@user)
            const x = 1;
        `;
        expect(await lintDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should throw error for TODO without colon', async () => {
        const code = dedent`
            // TODO (@user, 2024-01-01)
            const x = 1;
        `;
        expect(await lintDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should throw error for TODO with invalid date format', async () => {
        const code = dedent`
            // TODO (@user, 2024-1-1):
            const x = 1;
        `;
        expect(await lintDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should throw error for TODO with date without leading zeros', async () => {
        const code = dedent`
            // TODO (@user, 2024-1-01):
            const x = 1;
        `;
        expect(await lintDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should throw error for NOTE with invalid date format', async () => {
        const code = dedent`
            // NOTE (@user, 24-01-01):
            const x = 1;
        `;
        expect(await lintDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should throw error for TODO without space before parentheses', async () => {
        const code = dedent`
            // TODO(@user, 2024-01-01):
            const x = 1;
        `;
        expect(await lintDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should not throw error for valid TODO comment', async () => {
        const code = dedent`
            // TODO (@user, 2024-01-01):
            const x = 1;
        `;
        expect(await lintDefaultConfig(code)).toHaveNoRuleError(ruleName);
    });

    it('should not throw error for valid NOTE comment', async () => {
        const code = dedent`
            // NOTE (@user, 2024-01-01):
            const x = 1;
        `;
        expect(await lintDefaultConfig(code)).toHaveNoRuleError(ruleName);
    });

    it('should not throw error for valid TODO comment with description', async () => {
        const code = dedent`
            // TODO (@user, 2024-01-01): fix this issue
            const x = 1;
        `;
        expect(await lintDefaultConfig(code)).toHaveNoRuleError(ruleName);
    });

    it('should not throw error for valid NOTE comment with description', async () => {
        const code = dedent`
            // NOTE (@user, 2024-01-01): important information
            const x = 1;
        `;
        expect(await lintDefaultConfig(code)).toHaveNoRuleError(ruleName);
    });

    it('should throw error for lowercase todo', async () => {
        const code = dedent`
            // todo (@user, 2024-01-01):
            const x = 1;
        `;
        expect(await lintDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should throw error for lowercase note', async () => {
        const code = dedent`
            // note (@user, 2024-01-01):
            const x = 1;
        `;
        expect(await lintDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should not throw error for regular comments', async () => {
        const code = dedent`
            // This is a regular comment
            const x = 1;
        `;
        expect(await lintDefaultConfig(code)).toHaveNoRuleError(ruleName);
    });

    it('should throw error for comments starting with TODO but not matching pattern', async () => {
        const code = dedent`
            // TODOIST is a task manager
            const x = 1;
        `;
        expect(await lintDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should not throw error for TODO with username without @', async () => {
        const code = dedent`
            // TODO (user, 2024-01-01):
            const x = 1;
        `;
        expect(await lintDefaultConfig(code)).toHaveNoRuleError(ruleName);
    });

    it('should not throw error for TODO with multiple words in username', async () => {
        const code = dedent`
            // TODO (@john.doe, 2024-01-01):
            const x = 1;
        `;
        expect(await lintDefaultConfig(code)).toHaveNoRuleError(ruleName);
    });

    it('should throw error for TODO with missing comma', async () => {
        const code = dedent`
            // TODO (@user 2024-01-01):
            const x = 1;
        `;
        expect(await lintDefaultConfig(code)).toHaveRuleError(ruleName);
    });

    it('should throw error for TODO with extra spaces in date', async () => {
        const code = dedent`
            // TODO (@user, 2024 - 01 - 01):
            const x = 1;
        `;
        expect(await lintDefaultConfig(code)).toHaveRuleError(ruleName);
    });
});
