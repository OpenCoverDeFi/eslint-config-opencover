// Test JavaScript-specific rules
// This file intentionally has formatting and style issues

// Test no-var
var oldStyle = 'should use let or const';

// Test prefer-const
let shouldBeConst = 'value';

// Test stylistic rules - double quotes, spacing
const str1 = 'double quotes';
const str2 = 'no spacing';

// Test object/array spacing
const obj = { a: 1, b: 2, c: 3 };
const arr = [1, 2, 3];

// Test padding line between statements
const x = 1;
const y = 2;
if (x > y) {
    console.log('x is greater');
}
function testFunc() {
    return 'test';
}

// Test no-debugger
debugger;

// Test no-empty
if (true) {
}

// Test no-constant-condition
while (true) {
    break;
}

// Test no-sparse-arrays
const sparseArray = [1, , 2];

// Test no-regex-spaces
const regex = /foo   bar/;

// Test use-isnan
if (x == NaN) {
    console.log('is NaN');
}

// Test no-compare-neg-zero
if (x === -0) {
    console.log('negative zero');
}

// Test for-direction
for (let i = 0; i < 10; i--) {
    console.log(i);
}

// Test no-cond-assign
if ((x = 1)) {
    console.log('assignment in condition');
}

export { testFunc };
