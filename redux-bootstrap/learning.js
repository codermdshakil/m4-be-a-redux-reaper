

// pure function

// const add = (a , b ) => a + b;
// console.log(add(5, 10)); // 15
// console.log(add(5, 10)); // 15
// console.log(add(5, 10)); // 15

// impure function

// const randomNumber = (amount) => {
//   return amount + Math.random();
// };

// console.log(randomNumber(3));
// console.log(randomNumber(3));
// console.log(randomNumber(3));

// Functional programming always prefer pure function

// Mutation
// Mutation: Changing existing data.


// const employee = {
//   name:"Mir",
//   address:{
//     country:"Bangladesh",
//     city:"Dhaka"
//   }
// };


// avoit mutation 
// 1. copy object 
// 2. change property name
// const employee2 = {
//   ...employee,
//   name:"Shakil Ahmed",
//   address:{...employee.address, city:"Gazipur"}
// } 

// console.log(employee);
// console.log(employee2);


// Function Currying / Function Curry 

// function curry using normal function

// function addNormal(a){
//   return function(b){
//     return a + b;
//   }
// };

// console.log(addNormal(10)(15));

// Function curry using arrow function

// const add = (a) => (b) => a + b;
// console.log(add(10)(5));


// Usecase of function curry
// const addDiscount = (discount) => (amount) => amount - amount * discount;

// const withDiscount = addDiscount(0.3); // add 30% discount

// console.log(withDiscount(100)); // 70 
// console.log(withDiscount(1000)); // 700



