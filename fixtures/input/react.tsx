// Style: unknown property class should become className (react/no-unknown-property)
function UnknownProp() {
    return <div class="test">Hello</div>;
}

// Style: target="_blank" missing rel (react/jsx-no-target-blank - fixable)
function UnsafeLink() {
    return (
        <a href="https://example.com" target="_blank">
            Link
        </a>
    );
}

// Style: missing blank lines between function declarations
function ComponentA() {
    return <div>A</div>;
}
function ComponentB() {
    return <div>B</div>;
}

export { UnknownProp, UnsafeLink, ComponentA, ComponentB };
