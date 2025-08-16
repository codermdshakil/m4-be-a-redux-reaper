

// pure function

const add = (a , b ) => a + b;
// console.log(add(5, 10)); // 15
// console.log(add(5, 10)); // 15
// console.log(add(5, 10)); // 15

// impure function

const randomNumber = (amount) => {
  return amount + Math.random();
};

// console.log(randomNumber(3));
// console.log(randomNumber(3));
// console.log(randomNumber(3));

// Functional programming always prefer pure function

// Mutation
// Mutation: Changing existing data.


const employee = {
  name:"Mir",
  address:{
    country:"Bangladesh",
    city:"Dhaka"
  }
};


// avoit mutation 
// 1. copy object 
// 2. change property name
const employee2 = {
  ...employee,
  name:"Shakil Ahmed",
  address:{...employee.address, city:"Gazipur"}
} 

console.log(employee);
console.log(employee2);

