// ============================
// 1. Variables & Data Types
// ============================
let name = "Alice";           // string
const pi = 3.14;              // constant
var oldVar = 42;              // old style

let age;                      // undefined
let isActive = true;          // boolean
let bigNum = 12345678901234567890n; // BigInt
let nothing = null;           // null
let symbol = Symbol("id");    // Symbol

let person = { name: "Alice", age: 25 }; // object
let arr = [1, 2, 3];                      // array
function greet() { console.log("Hello"); } // function

console.log("== Variables & Types ==");
console.log(typeof name, typeof age, typeof bigNum, typeof person);
greet();

// ============================
// 2. Array Methods: Map, Filter, Reduce
// ============================
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);

const evenNumbers = numbers.filter(n => n % 2 === 0);
console.log("Even numbers:", evenNumbers);

const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log("Sum:", sum);

// Combined
const result = numbers
  .map(n => n * 2)
  .filter(n => n > 5)
  .reduce((acc, n) => acc + n, 0);
console.log("Combined result:", result);

// ============================
// 3. Spread Operator
// ============================
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // merge arrays
console.log("Merged array:", arr2);

const obj1 = { name: "Alice", age: 25 };
const obj2 = { ...obj1, country: "India" };
console.log("Copied object:", obj2);

function sumThree(a, b, c) { return a + b + c; }
console.log("Sum using spread:", sumThree(...[1, 2, 3]));

// ============================
// 4. Useful Built-In Functions
// ============================

// Math
console.log("Math.random():", Math.random());
console.log("Math.ceil(4.2):", Math.ceil(4.2));
console.log("Math.round(4.7):", Math.round(4.7));
console.log("Math.floor(4.7):", Math.floor(4.7));
console.log("Math.max(1,5,3):", Math.max(1,5,3));
console.log("Math.min(1,5,3):", Math.min(1,5,3));

// String
let str = "Hello World";
console.log(str.length);
console.log(str.toUpperCase());
console.log(str.toLowerCase());
console.log(str.includes("Hello"));
console.log(str.indexOf("World"));
console.log(str.slice(0,5));
console.log(str.replace("World","JS"));

// Array
let arr3 = [1,2,3];
arr3.push(4);
console.log("Push:", arr3);
arr3.pop();
console.log("Pop:", arr3);
arr3.shift();
console.log("Shift:", arr3);
arr3.unshift(0);
console.log("Unshift:", arr3);
console.log("Index of 3:", arr3.indexOf(3));
console.log("Includes 2?", arr3.includes(2));


console.log(Boolean(0));
console.log(String(123));
console.log(Number("10"));
console.log(parseInt("42"));
console.log(parseFloat("3.14"));