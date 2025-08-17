
// 1. Pure functions
// - Predictable Business Logic:


const calculateTotal = (price, quantity, taxRate) => (price* quantity) + (price* quantity * taxRate);

// console.log(calculateTotal(100, 2, 0.1));


// 2. Immutability 
// - State management in frontend - react, redux
// - Instead of mutating the state, create new state objects;

const employee = {
  name:"Shakil Ahmed",
  biodata:{
    dob:"04/12/2004",
    father:"Selim Mia",
    mother:"Fatema",
    address:{
      country:"Bangladesh",
      upzila:"Kapasia",
      zila:"Gazipur"
    }
  }
};


const employee1 = {
  ...employee,
  name:"Nadim Hassan",
  biodata:{
    ...employee.biodata,
    dob:"05/08/2003",
    father:"Raju Mia",
    mother:"Nam jani na",
    address:{
      ...employee.biodata.address,
      country:"India"
    }
  }
}


// console.log(employee);
// console.log(employee1);


// 3. First-Class Functions 
// - Use Case: Callback Functions (APIs, Events)

const great = name => "Hello " + name;
// store great in fn variable
const fn =great;
// pass as argument
const run = (func, value) => func(value);
// console.log(run(fn, "Shakil Ahmed"));  // Hello Shakil Ahmed



// 4. Higher-Order Functions (HOFs)
// - A function that takes another function as input OR returns a function.
// - Example: map, filter, reduce in JS.


// const numbers = [1,2,3,4,5];
// const double = numbers.map((n) => n * 2);
// const square = numbers.map((n) => n*n);
// const total = numbers.reduce((preValue, currVale) => preValue + currVale);
// console.log(total); // 15

// 5. Function Composition
// - Combine small functions to build more complex ones.
// - Encourages reusability and modularity.


const double = (x) => x*2;
const square = (x) => x*x;
 
// composition
const doubleThenSquare = x => square(double(x));

// Process
//  double -> 10 * 2 = 20
//  square -> 20 * 20 = 400 final result
// console.log(doubleThenSquare(10));  // 400


// 6. Avoiding Side Effects

// - Side effects = modifying things outside the function (like global variables, database, DOM, console logs).
// - FP minimizes side effects to keep functions predictable & testable.

let count = 0;
function increment(){
  count++;
}

const increment1 = n => n + 1;
// console.log(increment1(5)); // 6


// 7. Declarative Style (vs Imperative)

// - FP focuses on what to do, not how to do it step by step.


// Imperative (step by step)

let numbers = [1,2,3,4,5];
let events = [];

for(let i = 0; i < numbers.length; i++){

  if(numbers[i] % 2 === 0){
    events.push(numbers[i]);
  }
};

// console.log(events); // [2,4]

// Declarative way

let eventFP = numbers.filter((val) => val%2 === 0);
// console.log(eventFP); // [2,4]


// 8. Currying & Partial Application

// - Break functions into smaller functions, each taking one argument.
// - Makes functions reusable.

const addDiscountFP = (discount) => (price) => price - price*discount;

const withDiscount = addDiscountFP(0.3);
// console.log(withDiscount(1000)); // 700 of 30%

// 9. Recursion (instead of loops)
// - FP often uses recursion because loops mutate variables.

// const sum = (arr) => arr.length === 0 ? 0 : arr[0] + sum(arr.slice(1));
// console.log(sum([1]));
// console.log(sum([1,2]));
// console.log(sum([1,2,3,4,5]));

// shortcut
const sumWithReduce = arr => arr.reduce((pre, cur) => pre + cur);
// console.log(sumWithReduce([1,2,3,4,5]));
