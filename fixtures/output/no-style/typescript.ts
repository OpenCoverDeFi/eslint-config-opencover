/* eslint-disable no-console */

// Style: interface should become type (consistent-type-definitions)
interface MyInterface {
    name: string;
    age: number;
}

// Style: missing blank lines between function declarations
function foo1() {
    return 1;
}
function foo2() {
    return 2;
}

// Style: class with missing blank lines between methods
class MyClass {
    public methodOne() {
        return 1;
    }

    public methodTwo() {
        return 2;
    }
}

// Style: padding line between if and surrounding code
const x = Math.random();
const y = Math.random();
if (x > y) {
    console.log('x is greater');
}
function afterIf() {
    return 'test';
}

// Style: missing blank line before export
const exported = 'value';
export { foo1, foo2, exported };
export type { MyInterface };
export { MyClass, afterIf };
