import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleError, expectNoRuleError } from '@tests/test-utils.js';
import defaultConfig from '@eslint-config-opencover/index.js';

const ruleName = '@typescript-eslint/no-unsafe-enum-comparison';

describe(ruleName, () => {
    it('should throw error for comparing enum with string literal', async () => {
        const code = dedent`
            enum Status {
                Open = 'open',
                Closed = 'closed',
            }
            const status: Status = Status.Open;
            if (status === 'open') {
                console.log('open');
            }
        `;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for comparing enum with number literal', async () => {
        const code = dedent`
            enum Direction {
                Up = 1,
                Down = 2,
                Left = 3,
                Right = 4,
            }
            const direction: Direction = Direction.Up;
            if (direction === 1) {
                console.log('up');
            }
        `;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for comparing enum with numeric enum value', async () => {
        const code = dedent`
            enum Direction {
                Up,
                Down,
                Left,
                Right,
            }
            const direction: Direction = Direction.Up;
            if (direction === 0) {
                console.log('up');
            }
        `;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for comparing enum with string in switch case', async () => {
        const code = dedent`
            enum Status {
                Active = 'active',
                Inactive = 'inactive',
            }
            const status: Status = Status.Active;
            switch (status) {
                case 'active':
                    console.log('active');
                    break;
            }
        `;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for comparing enum with number in switch case', async () => {
        const code = dedent`
            enum Priority {
                Low = 1,
                Medium = 2,
                High = 3,
            }
            const priority: Priority = Priority.Low;
            switch (priority) {
                case 1:
                    console.log('low');
                    break;
            }
        `;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for comparing enum with variable of different type', async () => {
        const code = dedent`
            enum Status {
                Open = 'open',
                Closed = 'closed',
            }
            const status: Status = Status.Open;
            const value = 'open';
            if (status === value) {
                console.log('open');
            }
        `;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should not throw error when comparing enum with enum member', async () => {
        const code = dedent`
            enum Status {
                Open = 'open',
                Closed = 'closed',
            }
            const status: Status = Status.Open;
            if (status === Status.Open) {
                console.log('open');
            }
        `;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should not throw error when comparing enum with enum member in switch case', async () => {
        const code = dedent`
            enum Status {
                Active = 'active',
                Inactive = 'inactive',
            }
            const status: Status = Status.Active;
            switch (status) {
                case Status.Active:
                    console.log('active');
                    break;
                case Status.Inactive:
                    console.log('inactive');
                    break;
            }
        `;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should not throw error when comparing enum with numeric enum member', async () => {
        const code = dedent`
            enum Direction {
                Up,
                Down,
                Left,
                Right,
            }
            const direction: Direction = Direction.Up;
            if (direction === Direction.Up) {
                console.log('up');
            }
        `;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should not throw error when comparing enum with another enum of same type', async () => {
        const code = dedent`
            enum Status {
                Open = 'open',
                Closed = 'closed',
            }
            const status1: Status = Status.Open;
            const status2: Status = Status.Closed;
            if (status1 === status2) {
                console.log('same');
            }
        `;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should not throw error when comparing enum with undefined or null', async () => {
        const code = dedent`
            enum Status {
                Open = 'open',
                Closed = 'closed',
            }
            const status: Status | null = Status.Open;
            if (status === null) {
                console.log('null');
            }
        `;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should not throw error for non-enum comparisons', async () => {
        const code = dedent`
            const value = 'test';
            if (value === 'test') {
                console.log('test');
            }
        `;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });
});
