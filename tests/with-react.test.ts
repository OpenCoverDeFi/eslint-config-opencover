import { beforeAll, describe, it } from 'vitest';
import dedent from 'dedent';
import { lintFileWithName, expectRuleError, expectRuleWarning, createTempFile } from './test-utils.js';
import withReactConfig from '@eslint-config-opencover/with-react.js';

let filePath: string;

beforeAll(() => {
	filePath = createTempFile('test.tsx');
});

describe('With React ESLint Rules', () => {
	it('should enforce React ESLint rules', async () => {
		const code = dedent`
			import ReactDOM from "react-dom";

			const element = <h1>Hello, world</h1>; //an uncapitalized comment without a space before it
			ReactDOM.render(element, document.querySelector("#root"));
			// This comment is valid since it has the correct capitalization.
			// this comment is ignored since it follows another comment,
			// and this one as well because it follows yet another comment.
		`;
		const [result] = await lintFileWithName(withReactConfig, filePath, code);

		expectRuleError(result, 'prettier/prettier');
		expectRuleError(result, 'import/no-unresolved');
		expectRuleError(result, 'react/react-in-jsx-scope');
		expectRuleError(result, 'spaced-comment');
		expectRuleWarning(result, 'capitalized-comments');
		expectRuleWarning(result, 'react/no-deprecated');
	});
});
