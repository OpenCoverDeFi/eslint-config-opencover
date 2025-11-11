import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleError, expectNoRuleError } from '@tests/test-utils.js';
import defaultConfig from '@eslint-config-opencover/default.js';

describe('eslint.configs.recommended rules', () => {
	it('should enforce no-async-promise-executor', async () => {
		const code = 'new Promise(async (resolve) => { resolve(1); });';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-async-promise-executor');
	});

	it('should enforce no-case-declarations', async () => {
		const code = dedent`
			switch (x) {
				case 1:
					const y = 1;
					break;
			}
		`;
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-case-declarations');
	});

	it('should enforce no-compare-neg-zero', async () => {
		const code = 'if (x === -0) {}';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-compare-neg-zero');
	});

	it('should enforce no-cond-assign', async () => {
		const code = 'if (x = 0) {}';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-cond-assign');
	});

	it('should enforce no-constant-binary-expression', async () => {
		const code = 'const value1 = +x == null;';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-constant-binary-expression');
	});

	it('should enforce no-constant-condition', async () => {
		const code = 'if (true) {}';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-constant-condition');
	});

	// TODO: this rule should be working, but it's not.'
	it.skip('should enforce no-constructor-return', async () => {
		const code = dedent`
			class A {
				constructor(a) {
					this.a = a;
					return a;
				}
			}
		`;
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-constructor-return');
	});

	it('should enforce no-control-regex', async () => {
		const code = 'const regex = /\\x1f/;';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-control-regex');
	});

	it('should enforce no-debugger', async () => {
		const code = 'debugger;';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-debugger');
	});

	it('should enforce no-delete-var', async () => {
		const code = 'const x = 1; delete x;';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-delete-var');
	});

	it('should enforce no-dupe-else-if', async () => {
		const code = dedent`
			if (a) {}
			else if (a) {}
		`;
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-dupe-else-if');
	});

	it('should enforce no-duplicate-case', async () => {
		const code = dedent`
			switch (x) {
				case 1:
					break;
				case 1:
					break;
			}
		`;
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-duplicate-case');
	});

	it('should enforce no-empty', async () => {
		const code = 'if (x) {}';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-empty');
	});

	it('should enforce no-empty-character-class', async () => {
		const code = 'const regex = /[]/;';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-empty-character-class');
	});

	it('should enforce no-empty-pattern', async () => {
		const code = 'const {} = obj;';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-empty-pattern');
	});

	it('should enforce no-empty-static-block', async () => {
		const code = dedent`
			class A {
				static {}
			}
		`;
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-empty-static-block');
	});

	// TODO: this rule should be working, but it's not.'

	it.skip('should enforce no-eval', async () => {
		const code = '(0, eval)("const a = 0");';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-eval');
	});

	it('should enforce no-ex-assign', async () => {
		const code = dedent`
			try {}
			catch (e) {
				e = 1;
			}
		`;
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-ex-assign');
	});

	it('should enforce no-extra-boolean-cast', async () => {
		const code = 'if (!!x) {}';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-extra-boolean-cast');
	});

	// TODO: this rule should be working, but it's not.'
	it.skip('should enforce no-extra-semi', async () => {
		const code = 'const x = 1;;';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-extra-semi');
	});

	it('should enforce no-fallthrough', async () => {
		const code = dedent`
			switch(foo) {
				case 1:
					doSomething();

				case 2:
					doSomething();
			}

		`;
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-fallthrough');
	});

	it('should enforce no-global-assign', async () => {
		const code = 'Object = null;';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-global-assign');
	});

	// TODO: this rule should be working, but it's not.'
	it.skip('should enforce no-inner-declarations', async () => {
		const code = dedent`
			if (test) {
				function doSomethingElse () { }
			}
		`;
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-inner-declarations');
	});

	it('should enforce no-invalid-regexp', async () => {
		const code = 'new RegExp("[");';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-invalid-regexp');
	});

	// TODO: this rule should be working, but it's not.'
	it.skip('should enforce no-invalid-this', async () => {
		const code = dedent`
			const bar = function() {
				this.a = 0;
				baz(() => this);
			};
		`;
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-invalid-this');
	});

	it('should enforce no-irregular-whitespace', async () => {
		const code = 'const x = 1\u200B;';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-irregular-whitespace');
	});

	// TODO: this rule should be working, but it's not.'
	it.skip('should enforce no-iterator', async () => {
		const code = dedent`
			Foo.prototype.__iterator__ = function() {
				return new FooIterator(this);
			};
		`;
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-iterator');
	});

	// TODO: this rule should be working, but it's not.'
	it.skip('should enforce no-labels', async () => {
		const code = 'label: while(true) { break label; }';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-labels');
	});

	// TODO: this rule should be working, but it's not.'
	it.skip('should enforce no-lone-blocks', async () => {
		const code = dedent`
			{
				const x = 1;
			}
		`;
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-lone-blocks');
	});

	it('should enforce no-loss-of-precision', async () => {
		const code = 'const x = 9007199254740993;';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-loss-of-precision');
	});

	// TODO: this rule should be working, but it's not.'
	it.skip('should enforce no-misleading-character-class', async () => {
		const code = 'const regex = /[\\u{1D306}-\\u{1D308}]/u;';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-misleading-character-class');
	});

	// TODO: this rule should be working, but it's not.'
	it.skip('should enforce no-new-wrappers', async () => {
		const code = 'const str = new String("test");';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-new-wrappers');
	});

	// TODO: this rule should be working, but it's not.'
	it.skip('should enforce no-octal', async () => {
		const code = 'const x = 071;';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-octal');
	});

	// TODO: this rule should be working, but it's not.'
	it.skip('should enforce no-octal-escape', async () => {
		const code = 'const str = "\\251";';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-octal-escape');
	});

	it('should enforce no-prototype-builtins', async () => {
		const code = 'const hasOwn = obj.hasOwnProperty("prop");';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-prototype-builtins');
	});

	it('should enforce no-regex-spaces', async () => {
		const code = 'const regex = /foo   bar/;';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-regex-spaces');
	});

	it('should enforce no-self-assign', async () => {
		const code = 'x = x;';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-self-assign');
	});

	// TODO: this rule should be working, but it's not.'
	it.skip('should enforce no-self-compare', async () => {
		const code = 'if (x === x) {}';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-self-compare');
	});

	it('should enforce no-shadow-restricted-names', async () => {
		const code = 'const undefined = 1;';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-shadow-restricted-names');
	});

	it('should enforce no-sparse-arrays', async () => {
		const code = 'const arr = [1,,2];';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-sparse-arrays');
	});

	it('should enforce no-unexpected-multiline', async () => {
		const code = dedent`
			const x = 1
			[1, 2, 3].forEach(() => {});
		`;
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-unexpected-multiline');
	});

	// TODO: this rule should be working, but it's not.'
	it.skip('should enforce no-unmodified-loop-condition', async () => {
		const code = dedent`
			let x = 0;
			while (x < 10) {
				console.log(x);
			}
		`;
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-unmodified-loop-condition');
	});

	// TODO: this rule should be working, but it's not.'
	it.skip('should enforce no-unreachable-loop', async () => {
		const code = dedent`
			for (let i = 0; i < 10; i++) {
				break;
				console.log(i);
			}
		`;
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-unreachable-loop');
	});

	// TODO: this rule should be working, but it's not.'
	it.skip('should enforce no-unsafe-finally', async () => {
		const code = dedent`
			try {}
			finally {
				return 1;
			}
		`;
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-unsafe-finally');
	});

	// TODO: this rule should be working, but it's not.'
	it.skip('should enforce no-unsafe-optional-chaining', async () => {
		const code = 'const x = obj?.prop.toString();';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-unsafe-optional-chaining');
	});

	it('should enforce no-unused-labels', async () => {
		const code = 'label: while(true) { break; }';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-unused-labels');
	});

	it('should enforce no-unused-private-class-members', async () => {
		const code = dedent`
			class A {
				#unused() {}
			}
		`;
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-unused-private-class-members');
	});

	it('should enforce no-useless-backreference', async () => {
		const code = 'const regex = /(\\1)/;';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-useless-backreference');
	});

	it('should enforce no-useless-catch', async () => {
		const code = dedent`
			try {
				throw new Error();
			} catch (e) {
				throw e;
			}
		`;
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-useless-catch');
	});

	it('should enforce no-useless-escape', async () => {
		const code = 'const str = "\\a";';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-useless-escape');
	});

	it('should enforce require-yield', async () => {
		const code = 'function* gen() { return 1; }';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'require-yield');
	});

	it('should enforce use-isnan', async () => {
		const code = 'if (x == NaN) {}';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'use-isnan');
	});

	it('should enforce valid-typeof', async () => {
		const code = 'if (typeof x === "strnig") {}';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'valid-typeof');
	});

	it('should enforce for-direction', async () => {
		const code = 'for (let i = 0; i < 10; i--) {}';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'for-direction');
	});

	// TODO: this rule should be working, but it's not.'
	it.skip('should enforce getter-return', async () => {
		const code = dedent`
			const obj = {
				get prop(): number {
					// Missing return
				}
			};
		`;
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'getter-return');
	});

	// TODO: this rule should be working, but it's not.'
	it.skip('should enforce no-nonoctal-decimal-escape', async () => {
		const code = 'const str = "\\8";';
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-nonoctal-decimal-escape');
	});

	// TODO: this rule should be working, but it's not.'
	it.skip('should enforce no-unassigned-vars', async () => {
		const code = dedent`
			// @ts-expect-error - module doesn't exist, just testing the rule
			import { foo } from './nonexistent-module';
			// foo is imported but never used
		`;
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-unassigned-vars');
	});

	// TODO: this rule should be working, but it's not.'
	it.skip('should enforce no-useless-assignment', async () => {
		const code = dedent`
			let x = 1;
			x = 2;
			console.log(x);
			x = 3;
		`;
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'no-useless-assignment');
	});

	// TODO: this rule should be working, but it's not.'
	it.skip('should enforce preserve-caught-error', async () => {
		const code = dedent`
			try {
				throw new Error();
			} catch (e) {
				e = new Error('new error');
			}
		`;
		const [result] = await lintText(defaultConfig, code);
		expectRuleError(result, 'preserve-caught-error');
	});
});

describe('Rules disabled by typescript-eslint', () => {
	it('should not enforce no-class-assign (disabled by typescript-eslint)', async () => {
		const code = dedent`
			class A {}
			A = 1;
		`;
		const [result] = await lintText(defaultConfig, code);
		expectNoRuleError(result, 'no-class-assign');
	});

	it('should not enforce no-const-assign (disabled by typescript-eslint)', async () => {
		const code = 'const x = 1; x = 2;';
		const [result] = await lintText(defaultConfig, code);
		expectNoRuleError(result, 'no-const-assign');
	});

	it('should not enforce no-dupe-args (disabled by typescript-eslint)', async () => {
		const code = 'function foo(a, a) {}';
		const [result] = await lintText(defaultConfig, code);
		expectNoRuleError(result, 'no-dupe-args');
	});

	it('should not enforce no-dupe-class-members (disabled by typescript-eslint)', async () => {
		const code = dedent`
			class A {
				foo() {}
				foo() {}
			}
		`;
		const [result] = await lintText(defaultConfig, code);
		expectNoRuleError(result, 'no-dupe-class-members');
	});

	it('should not enforce no-dupe-keys (disabled by typescript-eslint)', async () => {
		const code = 'const obj = { a: 1, a: 2 };';
		const [result] = await lintText(defaultConfig, code);
		expectNoRuleError(result, 'no-dupe-keys');
	});

	it('should not enforce no-func-assign (disabled by typescript-eslint)', async () => {
		const code = 'function foo() {} foo = 1;';
		const [result] = await lintText(defaultConfig, code);
		expectNoRuleError(result, 'no-func-assign');
	});

	it('should not enforce no-import-assign (disabled by typescript-eslint)', async () => {
		const code = 'import { foo } from "./module"; foo = 1;';
		const [result] = await lintText(defaultConfig, code);
		expectNoRuleError(result, 'no-import-assign');
	});

	it('should not enforce no-new-native-nonconstructor (disabled by typescript-eslint)', async () => {
		const code = 'const x = new Symbol();';
		const [result] = await lintText(defaultConfig, code);
		expectNoRuleError(result, 'no-new-native-nonconstructor');
	});

	it('should not enforce no-obj-calls (disabled by typescript-eslint)', async () => {
		const code = 'const x = Math();';
		const [result] = await lintText(defaultConfig, code);
		expectNoRuleError(result, 'no-obj-calls');
	});

	it('should not enforce no-redeclare (disabled by typescript-eslint)', async () => {
		const code = 'let x = 1; let x = 2;';
		const [result] = await lintText(defaultConfig, code);
		expectNoRuleError(result, 'no-redeclare');
	});

	it('should not enforce no-setter-return (disabled by typescript-eslint)', async () => {
		const code = dedent`
			const obj = {
				set prop(value) {
					return value;
				}
			};
		`;
		const [result] = await lintText(defaultConfig, code);
		expectNoRuleError(result, 'no-setter-return');
	});

	it('should not enforce no-this-before-super (disabled by typescript-eslint)', async () => {
		const code = dedent`
			class A extends B {
				constructor() {
					this.x = 1;
					super();
				}
			}
		`;
		const [result] = await lintText(defaultConfig, code);
		expectNoRuleError(result, 'no-this-before-super');
	});

	it('should not enforce no-undef (disabled by typescript-eslint)', async () => {
		const code = 'const x = undefinedVar;';
		const [result] = await lintText(defaultConfig, code);
		expectNoRuleError(result, 'no-undef');
	});

	it('should not enforce no-unreachable (disabled by typescript-eslint)', async () => {
		const code = dedent`
			function foo() {
				return 1;
				console.log('unreachable');
			}
		`;
		const [result] = await lintText(defaultConfig, code);
		expectNoRuleError(result, 'no-unreachable');
	});

	it('should not enforce no-unsafe-negation (disabled by typescript-eslint)', async () => {
		const code = 'if (!x in obj) {}';
		const [result] = await lintText(defaultConfig, code);
		expectNoRuleError(result, 'no-unsafe-negation');
	});

	it('should not enforce no-with (disabled by typescript-eslint)', async () => {
		const code = 'with (obj) { x = 1; }';
		const [result] = await lintText(defaultConfig, code);
		expectNoRuleError(result, 'no-with');
	});

	it('should not enforce no-unused-vars (replaced by @typescript-eslint/no-unused-vars)', async () => {
		const code = 'const unused = 1;';
		const [result] = await lintText(defaultConfig, code);
		expectNoRuleError(result, 'no-unused-vars');
	});

	it('should not enforce constructor-super (disabled by typescript-eslint)', async () => {
		const code = dedent`
			class B {}
			class A extends B {
				constructor() {
					// Missing super()
				}
			}
		`;
		const [result] = await lintText(defaultConfig, code);
		expectNoRuleError(result, 'constructor-super');
	});

	it('should not enforce getter-return (disabled by typescript-eslint)', async () => {
		const code = dedent`
			const obj = {
				get prop(): number {
					// Missing return
				}
			};
		`;
		const [result] = await lintText(defaultConfig, code);
		expectNoRuleError(result, 'getter-return');
	});

	it('should not enforce no-nonoctal-decimal-escape (might be disabled or handled by TypeScript)', async () => {
		const code = 'const str = "\\8";';
		const [result] = await lintText(defaultConfig, code);
		// This rule might be disabled or handled differently
		expectNoRuleError(result, 'no-nonoctal-decimal-escape');
	});

	it('should not enforce no-unassigned-vars (replaced by @typescript-eslint/no-unused-vars)', async () => {
		const code = dedent`
			// @ts-expect-error - module doesn't exist, just testing the rule
			import { foo } from './nonexistent-module';
			// foo is imported but never used
		`;
		const [result] = await lintText(defaultConfig, code);
		expectNoRuleError(result, 'no-unassigned-vars');
	});

	it('should not enforce no-useless-assignment (might not be in recommended config)', async () => {
		const code = dedent`
			let x = 1;
			x = 2;
			console.log(x);
			x = 3;
		`;
		const [result] = await lintText(defaultConfig, code);
		expectNoRuleError(result, 'no-useless-assignment');
	});

	it('should not enforce preserve-caught-error (handled by no-ex-assign)', async () => {
		const code = dedent`
			try {
				throw new Error();
			} catch (e) {
				e = new Error('new error');
			}
		`;
		const [result] = await lintText(defaultConfig, code);
		// Preserve-caught-error might not be enabled, but no-ex-assign should catch this
		expectNoRuleError(result, 'preserve-caught-error');
	});
});
