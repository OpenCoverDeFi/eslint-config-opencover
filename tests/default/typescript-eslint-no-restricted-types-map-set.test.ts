import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleError, expectNoRuleError } from '../test-utils.js';
import defaultConfig from '@/default.js';

const ruleName = '@typescript-eslint/no-restricted-types';

describe(`${ruleName} (Map and Set)`, () => {
    it('should throw error for Map type annotation', async () => {
        const code = dedent`
			const map: Map<string, number> = new Map();
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for Set type annotation', async () => {
        const code = dedent`
			const set: Set<string> = new Set();
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for Map in function parameter', async () => {
        const code = dedent`
			function processMap(map: Map<string, boolean>): void {
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for Set in function parameter', async () => {
        const code = dedent`
			function processSet(set: Set<number>): void {
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for Map in return type', async () => {
        const code = dedent`
			function getMap(): Map<string, string> {
				return new Map();
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for Set in return type', async () => {
        const code = dedent`
			function getSet(): Set<number> {
				return new Set();
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for Map in type alias', async () => {
        const code = dedent`
			type MyMap = Map<string, number>;
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for Set in type alias', async () => {
        const code = dedent`
			type MySet = Set<string>;
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for Map in interface property', async () => {
        const code = dedent`
			interface Config {
				data: Map<string, unknown>;
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for Set in interface property', async () => {
        const code = dedent`
			interface Config {
				items: Set<string>;
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should not throw error for other types', async () => {
        const code = dedent`
			const arr: Array<string> = [];
			const obj: Record<string, number> = {};
		`;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });
});
