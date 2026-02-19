// Test various TypeScript and ESLint rules
// This file intentionally has formatting and style issues

// Test prefer-const
let shouldBeConst = 'value';

// Test no-array-constructor
const arr = new Array(1, 2, 3);

// Test consistent-type-definitions (interface should become type)
interface MyInterface {
    name: string;
    age: number;
}

// Test stylistic rules - spacing, quotes, semi
function foo1() {
    return 1;
}
function foo2() {
    return 2;
}

// Test no-debugger
debugger;

// Test no-empty
if (true) {
}

// Test stylistic rules - object/array spacing
const obj = { a: 1, b: 2, c: 3 };
const arr2 = [1, 2, 3];

// Test padding line between statements
const x = 1;
const y = 2;
if (x > y) {
    console.log('x is greater');
}
function testFunc() {
    return 'test';
}

// Test no-sparse-arrays
const sparseArray = [1, , 2];

// Test no-constant-condition
if (true) {
    console.log('always true');
}

// Test for-direction
for (let i = 0; i < 10; i--) {
    console.log(i);
}

export { foo1, foo2 };
