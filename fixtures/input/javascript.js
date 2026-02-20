// Style: double quotes should become single quotes
const greeting = 'hello world';

// Style: missing semicolons
const value = 1;
const name = 'test';

// Style: spacing issues around operators
const sum = 1 + 2;
const product = 3 * 4;

// Style: comma spacing
const arr = [1, 2, 3];
const obj = { a: 1, b: 2, c: 3 };

// Style: block spacing
function blockSpacing() {
    return true;
}

// Style: keyword spacing - use a variable condition to avoid no-constant-condition
const flag = Math.random() > 0.5;
if (flag) {
    void 0;
}

// Style: space before blocks
function noSpaceBeforeBlock() {
    return 1;
}

// Style: object curly spacing
const opts = { key: 'value' };

// Style: space in parens
const result = 1 + 2;

// Style: space infix ops
const x = 1;
const y = 2;

// Style: multiple empty lines

const z = 3;

// Style: prefer-const - never reassigned
let mutableVar = 'constant';

export {
    greeting,
    value,
    name,
    sum,
    product,
    arr,
    obj,
    opts,
    result,
    x,
    y,
    z,
    blockSpacing,
    noSpaceBeforeBlock,
    mutableVar,
    flag,
};
