import { describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleError, expectRuleWarning } from '@tests/test-utils.js';
import defaultConfig from '@eslint-config-opencover/index.js';

describe('extended ESLint rules', () => {
    describe('block-spacing', () => {
        it('should enforce block spacing', async () => {
            const code = 'function test(){return true;}';

            const result = await lintText(defaultConfig, code);

            expectRuleError(result, 'block-spacing');
        });
    });

    describe('capitalized-comments', () => {
        it('should enforce capitalized comments', async () => {
            const code = dedent`
                const fn = (x) => x; //an uncapitalized comment without a space before it
                // This comment is valid since it has the correct capitalization.
                // this comment is ignored since it follows another comment,
                // and this one as well because it follows yet another comment.
            `;

            const result = await lintText(defaultConfig, code);

            expectRuleWarning(result, 'capitalized-comments');
        });
    });

    describe('comma-spacing', () => {
        it('should enforce comma spacing', async () => {
            const code = dedent`
                const arr = [1,2,3];
                const obj = {a:1,b:2};
            `;

            const result = await lintText(defaultConfig, code);

            expectRuleError(result, 'comma-spacing');
        });
    });

    describe('key-spacing', () => {
        it('should enforce key spacing', async () => {
            const code = dedent`
                const fn = (x) => x;
                fn({a:1});
            `;

            const result = await lintText(defaultConfig, code);

            expectRuleWarning(result, 'key-spacing');
        });
    });

    describe('keyword-spacing', () => {
        it('should enforce keyword spacing', async () => {
            const code = 'if(true){return;}';

            const result = await lintText(defaultConfig, code);

            expectRuleError(result, 'keyword-spacing');
        });
    });

    describe('no-multi-spaces', () => {
        it('should enforce no multiple spaces', async () => {
            const code = 'const x = 1;  const y = 2;';

            const result = await lintText(defaultConfig, code);

            expectRuleError(result, 'no-multi-spaces');
        });
    });

    describe('no-multiple-empty-lines', () => {
        it('should throw error for multiple empty lines', async () => {
            const code = dedent`
            const x = 1;


            const y = 2;`;

            const result = await lintText(defaultConfig, code);

            expectRuleWarning(result, 'no-multiple-empty-lines');
        });
    });

    describe('object-curly-spacing', () => {
        it('should enforce object curly spacing', async () => {
            const code = dedent`
                const fn = (x) => x;
                fn({a:1});
            `;

            const result = await lintText(defaultConfig, code);

            expectRuleWarning(result, 'object-curly-spacing');
        });
    });

    describe('quote-props', () => {
        it('should enforce quote props as needed', async () => {
            const code = "const obj = {'prop': 1, 'valid-prop': 2};";

            const result = await lintText(defaultConfig, code);

            expectRuleWarning(result, 'quote-props');
        });
    });

    describe('quotes', () => {
        it('should enforce single quotes', async () => {
            const code = 'const notUsed = "5";';

            const result = await lintText(defaultConfig, code);

            expectRuleError(result, 'quotes');
        });
    });

    describe('semi', () => {
        it('should enforce semicolons', async () => {
            const code = dedent`
                const x = 1
                const y = 2
            `;

            const result = await lintText(defaultConfig, code);

            expectRuleError(result, 'semi');
        });
    });

    describe('space-before-blocks', () => {
        it('should enforce space before blocks', async () => {
            const code = 'function test(){return true;}';

            const result = await lintText(defaultConfig, code);

            expectRuleError(result, 'space-before-blocks');
        });
    });

    describe('space-in-parens', () => {
        it('should enforce no space in parens', async () => {
            const code = dedent`
                const result = ( 1 + 2 );
                function test( x ) { return x; }
            `;

            const result = await lintText(defaultConfig, code);

            expectRuleError(result, 'space-in-parens');
        });
    });

    describe('space-infix-ops', () => {
        it('should enforce space around infix operators', async () => {
            const code = dedent`
                const x = 1+2;
                const y = 3*4;
            `;

            const result = await lintText(defaultConfig, code);

            expectRuleError(result, 'space-infix-ops');
        });
    });

    describe('spaced-comment', () => {
        it('should enforce spaced comments', async () => {
            const code = 'const fn = (x) => x; //an uncapitalized comment without a space before it';

            const result = await lintText(defaultConfig, code);

            expectRuleError(result, 'spaced-comment');
        });
    });
});
