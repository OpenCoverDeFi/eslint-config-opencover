import { beforeAll, describe, it } from 'vitest';
import dedent from 'dedent';
import { lintText, expectRuleError, createTempFile } from '../test-utils.js';
import withReactConfig from '@/react.js';

let filePath: string;

beforeAll(() => {
    filePath = createTempFile('test.tsx');
});

async function lintReact(code: string) {
    return await lintText(withReactConfig, code, filePath);
}

describe('With React ESLint Rules', () => {
    it('should enforce react/display-name', async () => {
        const code = dedent`
            export default function() {
                return <div>Hello</div>;
            }
        `;
        const result = await lintReact(code);
        expectRuleError(result, 'react/display-name');
    });

    it('should enforce react/jsx-key', async () => {
        const code = dedent`
            const items = [1, 2, 3];
            return items.map(item => <div>{item}</div>);
        `;
        const result = await lintReact(code);
        expectRuleError(result, 'react/jsx-key');
    });

    it('should enforce react/jsx-no-comment-textnodes', async () => {
        const code = dedent`
            var Hello = createReactClass({
                  render: function() {
                    return (
                      <div>// empty div</div>
                    );
                  }
             });
        `;
        const result = await lintReact(code);
        expectRuleError(result, 'react/jsx-no-comment-textnodes');
    });

    it('should enforce react/jsx-no-duplicate-props', async () => {
        const code = dedent`
            const element = <div id="1" id="2">Hello</div>;
        `;
        const result = await lintReact(code);
        expectRuleError(result, 'react/jsx-no-duplicate-props');
    });

    it('should enforce react/jsx-no-target-blank', async () => {
        const code = dedent`
            const element = <a href="https://example.com" target="_blank">Link</a>;
        `;
        const result = await lintReact(code);
        expectRuleError(result, 'react/jsx-no-target-blank');
    });

    it('should enforce react/jsx-no-undef', async () => {
        const code = dedent`
            const element = <UndefinedComponent />;
        `;
        const result = await lintReact(code);
        expectRuleError(result, 'react/jsx-no-undef');
    });

    it.skip('should enforce react/jsx-uses-react', async () => {
        const code = dedent`
            var React = require('react');

            // nothing to do with React
        `;
        const result = await lintReact(code);
        expectRuleError(result, 'react/jsx-uses-react');
    });

    it.skip('should enforce react/jsx-uses-vars', async () => {
        const code = dedent`
            var Hello = require('./Hello');
        `;
        const result = await lintReact(code);
        expectRuleError(result, 'react/jsx-uses-vars');
    });

    it('should enforce react/no-children-prop', async () => {
        const code = dedent`
            <div children="Hello" />;
        `;
        const result = await lintReact(code);
        expectRuleError(result, 'react/no-children-prop');
    });

    it('should enforce react/no-danger-with-children', async () => {
        const code = dedent`
            <div dangerouslySetInnerHTML={{ __html: 'HTML' }}>Children</div>;
        `;
        const result = await lintReact(code);
        expectRuleError(result, 'react/no-danger-with-children');
    });

    it('should enforce react/no-deprecated', async () => {
        const code = dedent`
            import ReactDOM from "react-dom";
            const element = <div>Hello</div>;
            ReactDOM.render(element, document.body);
        `;
        const result = await lintReact(code);
        expectRuleError(result, 'react/no-deprecated');
    });

    it('should enforce react/no-direct-mutation-state', async () => {
        const code = dedent`
            class Component extends React.Component {
                componentDidMount() {
                    this.state.count = 1;
                }
            }
        `;
        const result = await lintReact(code);
        expectRuleError(result, 'react/no-direct-mutation-state');
    });

    it('should enforce react/no-find-dom-node', async () => {
        const code = dedent`
            import ReactDOM from "react-dom";
            ReactDOM.findDOMNode(this);
        `;
        const result = await lintReact(code);
        expectRuleError(result, 'react/no-find-dom-node');
    });

    it('should enforce react/no-is-mounted', async () => {
        const code = dedent`
            class Component extends React.Component {
                componentDidMount() {
                    if (this.isMounted()) {}
                }
            }
        `;
        const result = await lintReact(code);
        expectRuleError(result, 'react/no-is-mounted');
    });

    it('should enforce react/no-render-return-value', async () => {
        const code = dedent`
            import ReactDOM from "react-dom";
            const value = ReactDOM.render(<div />, document.body);
        `;
        const result = await lintReact(code);
        expectRuleError(result, 'react/no-render-return-value');
    });

    it('should enforce react/no-string-refs', async () => {
        const code = dedent`
            class Component extends React.Component {
                render() {
                    return <div ref="myRef" />;
                }
            }
        `;
        const result = await lintReact(code);
        expectRuleError(result, 'react/no-string-refs');
    });

    it.skip('should enforce react/no-unescaped-entities', async () => {
        const code = dedent`
            <MyComponent
              name="name"
              type="string"
              foo="bar">  {/* oops! */}
              x="y">
              Body Text
            </MyComponent>
        `;
        const result = await lintReact(code);
        expectRuleError(result, 'react/no-unescaped-entities');
    });

    it('should enforce react/no-unknown-property', async () => {
        const code = dedent`
            const element = <div class="test">Hello</div>;
        `;
        const result = await lintReact(code);
        expectRuleError(result, 'react/no-unknown-property');
    });

    it('should enforce react/prop-types', async () => {
        const code = dedent`
            function Component({ name }) {
                return <div>{name}</div>;
            }
        `;
        const result = await lintReact(code);
        expectRuleError(result, 'react/prop-types');
    });

    it('should enforce react/react-in-jsx-scope', async () => {
        const code = dedent`
            const element = <div>Hello</div>;
        `;
        const result = await lintReact(code);
        expectRuleError(result, 'react/react-in-jsx-scope');
    });

    it('should enforce react/require-render-return', async () => {
        const code = dedent`
            var Hello = createReactClass({
              render() {
                <div>Hello</div>;
              }
            });
            
            class Hello extends React.Component {
              render() {
                <div>Hello</div>;
              }
            }
        `;
        const result = await lintReact(code);
        expectRuleError(result, 'react/require-render-return');
    });
});
