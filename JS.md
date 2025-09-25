# JavaScript Study Notes

## 1. Intro → Variables & Data Types

### 1.1 Variables

- `let` → can be reassigned  
- `const` → cannot be reassigned  
- `var` → old style, function scope

```javascript
let name = "Alice";
const pi = 3.14;
````

### 1.2 Data Types

#### Primitive

| Type      | Example                   |
| --------- | ------------------------- |
| Number    | `let age = 25;`           |
| String    | `let name = "John";`      |
| Boolean   | `let isActive = true;`    |
| Undefined | `let x;`                  |
| Null      | `let y = null;`           |
| Symbol    | `let sym = Symbol('id');` |
| BigInt    | `let big = 1234567890n;`  |

#### Non-Primitive

| Type     | Example                                  |
| -------- | ---------------------------------------- |
| Object   | `let person = {name: "Alice", age: 25}`  |
| Array    | `let arr = [1,2,3];`                     |
| Function | `function greet(){ console.log("Hi"); }` |

### 1.3 Type Checking

```javascript
typeof name; // "string"
typeof age;  // "number"
```

---

## 2. Array Methods → Map, Filter, Reduce

### 2.1 Map

- Creates a **new array** by transforming elements.

```javascript
const doubled = [1,2,3].map(num => num*2);
console.log(doubled); // [2,4,6]
```

### 2.2 Filter

- Creates a **new array** with elements passing a condition.

```javascript
const even = [1,2,3,4].filter(num => num%2===0);
console.log(even); // [2,4]
```

### 2.3 Reduce

- Reduces array to **single value**.

```javascript
const sum = [1,2,3].reduce((acc, curr) => acc+curr, 0);
console.log(sum); // 6
```

### 2.4 Combining All

```javascript
const result = [1,2,3,4,5]
    .map(x => x*2)
    .filter(x => x>5)
    .reduce((acc, x) => acc+x, 0);
console.log(result); // 24
```

---

## 3. Spread Operator (`...`)

- Expands iterables into individual elements.

```javascript
// Arrays
const arr1 = [1,2,3];
const arr2 = [...arr1,4,5]; // [1,2,3,4,5]

// Objects
const obj1 = {name:"Alice"};
const obj2 = {...obj1, age:25}; // {name:"Alice", age:25}

// Function arguments
function sum(a,b,c){ return a+b+c; }
sum(...[1,2,3]); // 6
```

---

## 4. Useful In-Built Functions

### 4.1 Math

```javascript
Math.round(4.7);   // 5
Math.floor(4.7);   // 4
Math.ceil(4.2);    // 5
Math.max(1,5,3);   // 5
Math.min(1,5,3);   // 1
Math.random();     // 0 ≤ x < 1
```

### 4.2 String

```javascript
let str = "Hello World";
str.length;            // 11
str.toUpperCase();      // "HELLO WORLD"
str.toLowerCase();      // "hello world"
str.includes("Hello");  // true
str.indexOf("World");   // 6
str.slice(0,5);         // "Hello"
str.replace("World","JS"); // "Hello JS"
```

### 4.3 Array

```javascript
let arr = [1,2,3];
arr.push(4);    // [1,2,3,4]
arr.pop();      // removes 4
arr.shift();    // removes first element
arr.unshift(0); // adds 0 at start
arr.includes(2); // true
arr.indexOf(3);  // 2
```

### 4.4 Other

```javascript
parseInt("42");      // 42
parseFloat("3.14");  // 3.14
Number("10");        // 10
String(123);         // "123"
Boolean(0);          // false
```