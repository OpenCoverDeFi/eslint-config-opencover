import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleError, expectNoRuleError } from '@tests/test-utils.js';
import defaultConfig from '@eslint-config-opencover/default.js';

const ruleName = '@opencover-eslint/complex-functions-require-return-type';

describe(ruleName, () => {
    it('should not throw error for function with explicit return type', async () => {
        const code = dedent`
			function getValue(): string {
				return 'hello';
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should not throw error for arrow function with explicit return type', async () => {
        const code = dedent`
			const getValue = (): string => {
				return 'hello';
			};
		`;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should not throw error for function expression with explicit return type', async () => {
        const code = dedent`
			const getValue = function(): string {
				return 'hello';
			};
		`;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should not throw error for simple function without return type (complexity <= maxComplexity)', async () => {
        const code = dedent`
			function getValue() {
				return 'hello';
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should throw error for complex function with multiple if statements without return type', async () => {
        const code = dedent`
			function processData(data: unknown) {
				if (typeof data === 'string') {
					return data.toUpperCase();
				}
				if (typeof data === 'number') {
					return data.toString();
				}
				if (typeof data === 'boolean') {
					return data ? 'true' : 'false';
				}
				if (typeof data === 'object') {
					return JSON.stringify(data);
				}
				if (Array.isArray(data)) {
					return data.join(',');
				}
				if (data === null) {
					return 'null';
				}
				if (data === undefined) {
					return 'undefined';
				}
				if (typeof data === 'function') {
					return 'function';
				}
				if (typeof data === 'symbol') {
					return 'symbol';
				}
				return 'unknown';
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for complex function with nested if statements without return type', async () => {
        const code = dedent`
			function validateUser(user: unknown) {
				if (user && typeof user === 'object') {
					if ('name' in user) {
						if (typeof user.name === 'string') {
							if (user.name.length > 0) {
								if (user.name.length < 100) {
									if (!user.name.includes(' ')) {
										if (user.name.match(/^[a-zA-Z]+$/)) {
											if ('email' in user) {
												if (typeof user.email === 'string') {
													return true;
												}
											}
										}
									}
								}
							}
						}
					}
				}
				return false;
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for complex function with for loop without return type', async () => {
        const code = dedent`
			function sumArray(arr: number[]) {
				let sum = 0;
				for (let i = 0; i < arr.length && i >= 0; i++) {
					if (arr[i] > 0 && arr[i] < 1000) {
						if (arr[i] % 2 === 0) {
							if (arr[i] % 4 === 0) {
								if (arr[i] % 8 === 0) {
									if (arr[i] % 16 === 0) {
										sum += arr[i];
									}
								}
							}
						} else {
							if (arr[i] % 3 === 0) {
								if (arr[i] % 9 === 0) {
									if (arr[i] % 27 === 0) {
										sum += arr[i] * 2;
									}
								}
							}
						}
					}
				}
				return sum;
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for complex function with while loop without return type', async () => {
        const code = dedent`
			function findIndex(arr: number[], target: number) {
				let i = 0;
				while (i < arr.length && i >= 0) {
					if (arr[i] === target) {
						if (i > 0) {
							if (i < arr.length - 1) {
								if (arr[i - 1] !== target) {
									if (arr[i + 1] !== target) {
										if (i % 2 === 0) {
											if (target > 0 && target < 1000) {
												return i;
											}
										}
									}
								}
							}
						}
					}
					i++;
				}
				return -1;
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for complex function with switch statement without return type', async () => {
        const code = dedent`
			function getStatus(code: number) {
				switch (code) {
					case 200:
						return 'success';
					case 201:
						return 'created';
					case 204:
						return 'no content';
					case 400:
						return 'bad request';
					case 401:
						return 'unauthorized';
					case 403:
						return 'forbidden';
					case 404:
						return 'not found';
					case 500:
						return 'error';
					case 502:
						return 'bad gateway';
					case 503:
						return 'service unavailable';
					default:
						return 'unknown';
				}
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for complex arrow function with multiple conditions without return type', async () => {
        const code = dedent`
			const processValue = (value: unknown) => {
				if (value === null || value === undefined) {
					return 'nullish';
				}
				if (typeof value === 'string' && value.length > 0) {
					if (value.length > 10) {
						if (value.includes('@')) {
							if (value.includes('.') && value.length < 100) {
								return value.toUpperCase();
							}
						}
					}
				}
				if (typeof value === 'number') {
					if (value > 0) {
						if (value < 100) {
							if (value % 2 === 0) {
								if (value % 4 === 0) {
									return value.toString();
								}
							}
						}
					}
				}
				return String(value);
			};
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for complex function with ternary operators without return type', async () => {
        const code = dedent`
			function getResult(condition1: boolean, condition2: boolean, condition3: boolean, condition4: boolean, condition5: boolean) {
				return condition1
					? (condition2 ? (condition3 ? (condition4 ? (condition5 ? 'all-true' : 'first-four') : 'first-three') : 'first-two') : 'first-only')
					: (condition2 ? (condition3 ? (condition4 ? (condition5 ? 'second-four-five' : 'second-four') : 'second-third') : (condition4 ? (condition5 ? 'second-fourth-fifth' : 'second-fourth') : 'second-only')) : (condition3 ? (condition4 ? (condition5 ? 'third-fourth-fifth' : 'third-fourth') : (condition5 ? 'third-fifth' : 'third-only')) : (condition4 ? (condition5 ? 'fourth-fifth' : 'fourth-only') : (condition5 ? 'fifth-only' : 'none'))));
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for complex function with logical operators without return type', async () => {
        const code = dedent`
			function checkConditions(a: boolean, b: boolean, c: boolean, d: boolean) {
				if (a && b || c && d) {
					return true;
				}
				if (a || b && c || d) {
					return false;
				}
				if (a && b && c && d) {
					return 'all';
				}
				if (a || b || c || d) {
					return 'any';
				}
				return null;
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for complex function with for-of loop without return type', async () => {
        const code = dedent`
			function processItems(items: string[]) {
				const results: string[] = [];
				for (const item of items) {
					if (item.length > 0 && item.length < 1000) {
						if (item.length < 100) {
							if (!item.includes(' ') && !item.includes('\t')) {
								if (item.match(/^[a-zA-Z]+$/)) {
									if (!item.startsWith('_') && !item.startsWith('$')) {
										if (item.endsWith('s') || item.endsWith('ed')) {
											if (item.length > 3) {
												results.push(item.toUpperCase());
											}
										}
									}
								}
							}
						}
					}
				}
				return results;
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for complex function with for-in loop without return type', async () => {
        const code = dedent`
			function getKeys(obj: Record<string, unknown>) {
				const keys: string[] = [];
				for (const key in obj) {
					if (Object.prototype.hasOwnProperty.call(obj, key) && typeof key === 'string') {
						if (key.length > 0 && key.length < 100) {
							if (!key.startsWith('_') && !key.startsWith('$')) {
								if (!key.includes('$') && !key.includes('#') && !key.includes('@')) {
									if (key.match(/^[a-zA-Z]/)) {
										if (key.length < 50 && key.length > 1) {
											if (!key.endsWith('_')) {
												keys.push(key);
											}
										}
									}
								}
							}
						}
					}
				}
				return keys;
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should throw error for complex function with do-while loop without return type', async () => {
        const code = dedent`
			function countDown(start: number) {
				let count = start;
				do {
					count--;
					if (count === 0) {
						return 'done';
					}
					if (count < 0) {
						if (count < -10) {
							if (count < -100) {
								if (count < -1000) {
									return 'error';
								}
							}
						}
					}
					if (count > 100) {
						if (count > 1000) {
							if (count > 10000) {
								return 'overflow';
							}
						}
					}
				} while (count > 0 && count < 100000);
				return 'finished';
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectRuleError(result, ruleName);
    });

    it('should not throw error for complex function with explicit return type', async () => {
        const code = dedent`
			function processData(data: unknown): string {
				if (typeof data === 'string') {
					return data.toUpperCase();
				}
				if (typeof data === 'number') {
					return data.toString();
				}
				return 'unknown';
			}
		`;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });

    it('should not throw error for complex arrow function with explicit return type', async () => {
        const code = dedent`
			const processValue = (value: unknown): string => {
				if (value === null || value === undefined) {
					return 'nullish';
				}
				return String(value);
			};
		`;

        const [result] = await lintText(defaultConfig, code);

        expectNoRuleError(result, ruleName);
    });
});
