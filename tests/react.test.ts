import { RuleTester } from 'eslint';
import tseslint from 'typescript-eslint';
import { describe, it } from 'vitest';
import { reactConfig } from '@/configs/react.js';

/**
 * Tests for the react config layer.
 * Rules are pulled from the react config's plugin references.
 */

const tester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        parser: tseslint.parser,
        parserOptions: {
            ecmaFeatures: { jsx: true },
        },
    },
    settings: {
        react: { version: '18' },
    },
});

const reactPlugin = (reactConfig[0].plugins ?? {})['react'];
const hooksPlugin = (reactConfig[0].plugins ?? {})['react-hooks'];

describe('react config rules', () => {
    it('react/jsx-key: requires key prop on list elements', () => {
        tester.run('react/jsx-key', reactPlugin.rules['jsx-key'], {
            valid: [{ code: 'const el = [1,2].map((x) => <div key={x} />);' }],
            invalid: [
                {
                    code: 'const el = [1,2].map((x) => <div />);',
                    errors: [{ messageId: 'missingIterKey' }],
                },
            ],
        });
    });

    it('react/no-deprecated: flags deprecated React APIs', () => {
        tester.run('react/no-deprecated', reactPlugin.rules['no-deprecated'], {
            valid: [{ code: "import React from 'react'; const el = React.createElement('div');" }],
            invalid: [
                {
                    code: "import React from 'react'; React.render(<div />, document.body);",
                    errors: [{ messageId: 'deprecated' }],
                },
            ],
        });
    });

    it('react-hooks/rules-of-hooks: disallows hooks inside conditions', () => {
        tester.run('react-hooks/rules-of-hooks', hooksPlugin.rules['rules-of-hooks'], {
            valid: [
                {
                    code: ['function MyComponent() {', '  const [s, setS] = useState(0);', '  return null;', '}'].join(
                        '\n'
                    ),
                },
            ],
            invalid: [
                {
                    code: [
                        'function MyComponent({ flag }) {',
                        '  if (flag) { const [s, setS] = useState(0); }',
                        '  return null;',
                        '}',
                    ].join('\n'),
                    errors: [
                        {
                            message:
                                'React Hook "useState" is called conditionally. React Hooks must be called in the exact same order in every component render.',
                        },
                    ],
                },
            ],
        });
    });

    it('react-hooks/exhaustive-deps: warns on missing hook dependencies', () => {
        tester.run('react-hooks/exhaustive-deps', hooksPlugin.rules['exhaustive-deps'], {
            valid: [
                {
                    code: [
                        'function MyComponent({ value }) {',
                        '  useEffect(() => { console.warn(value); }, [value]);',
                        '  return null;',
                        '}',
                    ].join('\n'),
                },
            ],
            invalid: [
                {
                    code: [
                        'function MyComponent({ value }) {',
                        '  useEffect(() => { console.warn(value); }, []);',
                        '  return null;',
                        '}',
                    ].join('\n'),
                    errors: [
                        {
                            message:
                                "React Hook useEffect has a missing dependency: 'value'. Either include it or remove the dependency array.",
                            suggestions: [
                                {
                                    desc: 'Update the dependencies array to be: [value]',
                                    output: [
                                        'function MyComponent({ value }) {',
                                        '  useEffect(() => { console.warn(value); }, [value]);',
                                        '  return null;',
                                        '}',
                                    ].join('\n'),
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    });
});
