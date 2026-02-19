// Test React-specific rules
// This file intentionally has formatting and style issues that should be auto-fixed
import React from 'react';

// Test react/display-name
export default function () {
    return <div>Hello</div>;
}

// Test react/jsx-key
function ItemList() {
    const items = [1, 2, 3];
    return items.map((item) => <div>{item}</div>);
}

// Test react/jsx-no-duplicate-props
function DuplicateProps() {
    return (
        <div id="1" id="2">
            Hello
        </div>
    );
}

// Test react/jsx-no-target-blank
function UnsafeLink() {
    return (
        <a href="https://example.com" target="_blank">
            Link
        </a>
    );
}

// Test react/jsx-no-undef
function UndefinedComponent() {
    return <UndefinedComponent />;
}

// Test react/no-children-prop
function ChildrenProp() {
    return <div children="Hello" />;
}

// Test react/no-danger-with-children
function DangerWithChildren() {
    return <div dangerouslySetInnerHTML={{ __html: 'HTML' }}>Children</div>;
}

// Test react/no-deprecated
function DeprecatedAPI() {
    const element = <div>Hello</div>;
    // @ts-expect-error - Testing deprecated API
    ReactDOM.render(element, document.body);
}

// Test react/no-direct-mutation-state
class DirectMutation extends React.Component {
    componentDidMount() {
        // @ts-expect-error - Testing direct mutation
        this.state.count = 1;
    }
}

// Test react/no-unknown-property
function UnknownProp() {
    return <div class="test">Hello</div>;
}

// Test react/prop-types
function MissingPropTypes({ name }) {
    return <div>{name}</div>;
}

// Test react/react-in-jsx-scope
function JSXScope() {
    return <div>Hello</div>;
}

// Test stylistic rules in JSX
function BadStyling() {
    return (
        <div className="test" style={{ color: 'red', fontSize: '16px' }}>
            Content
        </div>
    );
}

export { ItemList, DuplicateProps, UnsafeLink };
