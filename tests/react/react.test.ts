import { beforeAll, describe, it, expect } from 'vitest';
import dedent from 'dedent';
import { createTempFile, lintWithReactConfig } from '@tests/test-utils.js';

let filePath: string;

beforeAll(() => {
    filePath = createTempFile('test.tsx');
});

async function lintReact(code: string) {
    return await lintWithReactConfig(code, filePath);
}

describe('With React ESLint Rules', () => {
    it('should enforce react/display-name', async () => {
        const code = dedent`
            export default function() {
                return <div>Hello</div>;
            }
        `;
        expect(await lintReact(code)).toHaveRuleError('react/display-name');
    });

    it('should enforce react/jsx-key', async () => {
        const code = dedent`
            const items = [1, 2, 3];
            return items.map(item => <div>{item}</div>);
        `;
        expect(await lintReact(code)).toHaveRuleError('react/jsx-key');
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
        expect(await lintReact(code)).toHaveRuleError('react/jsx-no-comment-textnodes');
    });

    it('should enforce react/jsx-no-duplicate-props', async () => {
        const code = dedent`
            const element = <div id="1" id="2">Hello</div>;
        `;
        expect(await lintReact(code)).toHaveRuleError('react/jsx-no-duplicate-props');
    });

    it('should enforce react/jsx-no-target-blank', async () => {
        const code = dedent`
            const element = <a href="https://example.com" target="_blank">Link</a>;
        `;
        expect(await lintReact(code)).toHaveRuleError('react/jsx-no-target-blank');
    });

    it('should enforce react/jsx-no-undef', async () => {
        const code = dedent`
            const element = <UndefinedComponent />;
        `;
        expect(await lintReact(code)).toHaveRuleError('react/jsx-no-undef');
    });

    // NOTE: These rules are only relevant for React < 17 (before new JSX transform)
    // Modern React with the new JSX transform doesn't require importing React
    // These rules are enabled in the recommended config for backwards compatibility
    // but are not relevant for modern React development
    // eslint-disable-next-line vitest/no-disabled-tests
    it.skip('should enforce react/jsx-uses-react', async () => {
        const code = dedent`
            var React = require('react');

            // nothing to do with React
        `;
        expect(await lintReact(code)).toHaveRuleError('react/jsx-uses-react');
    });

    // eslint-disable-next-line vitest/no-disabled-tests
    it.skip('should enforce react/jsx-uses-vars', async () => {
        const code = dedent`
            var Hello = require('./Hello');
        `;
        expect(await lintReact(code)).toHaveRuleError('react/jsx-uses-vars');
    });

    it('should enforce react/no-children-prop', async () => {
        const code = dedent`
            <div children="Hello" />;
        `;
        expect(await lintReact(code)).toHaveRuleError('react/no-children-prop');
    });

    it('should enforce react/no-danger-with-children', async () => {
        const code = dedent`
            <div dangerouslySetInnerHTML={{ __html: 'HTML' }}>Children</div>;
        `;
        expect(await lintReact(code)).toHaveRuleError('react/no-danger-with-children');
    });

    it('should enforce react/no-deprecated', async () => {
        const code = dedent`
            import ReactDOM from "react-dom";
            const element = <div>Hello</div>;
            ReactDOM.render(element, document.body);
        `;
        expect(await lintReact(code)).toHaveRuleError('react/no-deprecated');
    });

    it('should enforce react/no-direct-mutation-state', async () => {
        const code = dedent`
            class Component extends React.Component {
                componentDidMount() {
                    this.state.count = 1;
                }
            }
        `;
        expect(await lintReact(code)).toHaveRuleError('react/no-direct-mutation-state');
    });

    it('should enforce react/no-find-dom-node', async () => {
        const code = dedent`
            import ReactDOM from "react-dom";
            ReactDOM.findDOMNode(this);
        `;
        expect(await lintReact(code)).toHaveRuleError('react/no-find-dom-node');
    });

    it('should enforce react/no-is-mounted', async () => {
        const code = dedent`
            class Component extends React.Component {
                componentDidMount() {
                    if (this.isMounted()) {}
                }
            }
        `;
        expect(await lintReact(code)).toHaveRuleError('react/no-is-mounted');
    });

    it('should enforce react/no-render-return-value', async () => {
        const code = dedent`
            import ReactDOM from "react-dom";
            const value = ReactDOM.render(<div />, document.body);
        `;
        expect(await lintReact(code)).toHaveRuleError('react/no-render-return-value');
    });

    it('should enforce react/no-string-refs', async () => {
        const code = dedent`
            class Component extends React.Component {
                render() {
                    return <div ref="myRef" />;
                }
            }
        `;
        expect(await lintReact(code)).toHaveRuleError('react/no-string-refs');
    });

    it('should enforce react/no-unescaped-entities', async () => {
        const code = `
            function Component() {
                return <div>Don't do this</div>;
            }
        `;
        expect(await lintReact(code)).toHaveRuleError('react/no-unescaped-entities');
    });

    it('should enforce react/no-unknown-property', async () => {
        const code = dedent`
            const element = <div class="test">Hello</div>;
        `;
        expect(await lintReact(code)).toHaveRuleError('react/no-unknown-property');
    });

    it('should enforce react/prop-types', async () => {
        const code = dedent`
            function Component({ name }) {
                return <div>{name}</div>;
            }
        `;
        expect(await lintReact(code)).toHaveRuleError('react/prop-types');
    });

    it('should enforce react/react-in-jsx-scope', async () => {
        const code = dedent`
            const element = <div>Hello</div>;
        `;
        expect(await lintReact(code)).toHaveRuleError('react/react-in-jsx-scope');
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
        expect(await lintReact(code)).toHaveRuleError('react/require-render-return');
    });
});
