'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Data
const account1 = {
  owner: 'ganesh g',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'mahadevan t',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'gokul kannan',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'kavin k',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: 'Arvind R',
  movements: [200, 450, 400, 3000, -650, -130, 70, 1300],
  interestRate: 1.3, // %
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//CURRENT BALANCE
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  // Sorting implementation;

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">₹${mov}</div>
  </div>
  `;
    // insert adjecent HTML methods
    containerMovements.insertAdjacentHTML('afterbegin', html); //here the afterbegin is used for the ascending order of the rray list in the receprocated lists
    //we use before end it will provide the lists in the oldest alteration first.
  });
};

const caldisplaybalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  // acc.balance = balance;
  labelBalance.textContent = `₹${acc.balance} `;
};

const caldisplaysummary = function (acc) {
  console.log(acc);
  const income = acc.movements
    .filter(mov => mov > 0) // movements have been reinsitiated multiple times in the code line 131
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `₹ ${Math.abs(income)}`;

  // calincome(account1.movements);
  const expd = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `₹ ${Math.abs(expd)}`;
  // calout(account1.movements);
  const insert = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * 1.2) / 100)
    .filter((int, i, arr) => {
      // console.log(`hi`);
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `₹${insert}`;
};

//Upadtion variable
const updatedUI = function (acc) {
  // display 0movements
  displayMovements(acc.movements);
  //display balance
  caldisplaybalance(acc);
  // Display summary
  caldisplaysummary(acc);
};
// LOGIN FEATURE IS STARTNG

//EVENT HANDLER
let currentaccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentaccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  // alert(`if use don't use close account your account willl not be commited`);
  console.log(currentaccount);

  if (currentaccount?.pin === Number(inputLoginPin.value)) {
    // display th0e ui and welcome image
    labelWelcome.textContent = `Welcome back, ${
      currentaccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    // clear the input fields
    inputLoginUsername.value = inputLoginPin.value = '';

    inputLoginPin.blur();

    // updated ui
    updatedUI(currentaccount);
  }
});
// TRANSFERING AMOUNT FROM ONE USER TO ANOTHER USER

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);

  const recevieracc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  btnTransfer.blur();
  // operationt;
  if (
    amount > 0 &&
    currentaccount.balance > amount &&
    recevieracc &&
    recevieracc.username !== currentaccount.username
  ) {
    currentaccount.movements.push(-amount);
    recevieracc.movements.push(amount);
  }
  // acc.balance = newbalance;
  // return newbalance;

  // updated ui
  updatedUI(currentaccount);
});
// DELETION OF USER FROM THE ARRAY
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentaccount.username &&
    Number(inputClosePin.value) === currentaccount.pin
  ) {
    // console.log(`hi`);
    // index index is a 0call back function

    const index = accounts.findIndex(
      acc => acc.username === currentaccount.username
    );
    // console.log(index);
    accounts.splice(index, 1);

    // hide Ui
    containerApp.style.opacity = 0;
  }
  inputLoginUsername.value = inputLoginPin.value = '';
});
// REQUESTING FOR THE LOAN

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentaccount.movements.some(mov => mov >= amount * 0.1)) {
    // add the movement
    currentaccount.movements.push(amount);

    // updatedUI
    updatedUI(currentaccount);
  } else {
    alert(
      "You don't have enough money to make this loan and you don't have enough collateral"
    );
  }
  inputLoanAmount.value = '';
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentaccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////

/////////////////////////////////////////////////
// LECTURES
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

/////////////////////////////////////////////////
let arr = ['a', 'b', 'c', 'd', 'e'];

const a = arr.slice(2);
const b = arr.slice(2, 3); //initial length - final length
console.log(a);
console.log(b);
console.log(arr.slice(1, -1));
console.log([...arr]);

// splice-ot changes the original array but have same function as slice
// it changes the elemets presented in the array

// console.log(arr.splice(2));
// arr.splice(-1);
// arr.splice(1, 2);
console.log(arr);

const arr1 = ['arjun', 'mayank', 'kavin', 'ganesh'];
console.log(arr1.reverse());

//concat

console.log(arr.concat(arr1));
// alternative
console.log([...arr, ...arr1]);

const arr2 = [23, 11, 64];

console.log(arr[0]);

// for finding the last element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1));
console.log(arr.at(-1));

// at method also works in the strings
// first word
console.log('arvind'.at(0));
//last word
console.log('arvind'.at(-1));

// looping over the array
for (const i of movements) {
  if (i > 0) {
    console.log(`you have deposited ${i}`);
  }
  console.log(`you have depostied ${Math.abs(i)}`);
}
console.log(`alternative methods`);
movements.forEach(function (i) {
  if (i > 0) {
    console.log(`you have deposited ${i}`);
  }
  console.log(`you have depostied ${Math.abs(i)}`);
});
// 0:function(200)
// 1:function(450)
// 2:function(-400)
// 3:function(3000)
for (const [i, j] of movements.entries()) {
  if (j > 0) {
    console.log(`Movements ${i + 1} : you have deposited ${j}`);
  } else {
    console.log(`Movements ${i + 1} : you have depostied ${Math.abs(j)}`);
  }
}

console.log(`FOR  EACH METHODS`);
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Monements ${i + 1}: you have deposited ${mov}`);
  } else {
    console.log(`Movements ${i + 1}: you have deposited ${mov}`);
  }
});
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
currencies.forEach(function (value, key, map) {
  console.log();
});
// set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});

// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
const juilia = [3, 5, 2, 12, 7];
let first, second;
const juilia1 = juilia.slice(1, juilia.length - 1);
console.log(juilia.length - 2);
// console.log(second);
console.log(juilia1);
// let a2 = juilia1.forEach(function (mov, i) {
//   if (mov > 3) {
//     console.log(`the dog number ${i + 1} is a adult`);
//   } else {
//     console.log(`the dog number ${i + 1} is a puppy🐶`);
//   }
// });
let kate = [4, 1, 15, 8, 3];
let kate1 = kate.slice(1, kate.length - 1);
console.log(kate1);
let j = juilia1.concat(kate1);
console.log(j);
let checkdogs = function (julia1) {
  julia1.forEach(function (mov, i) {
    if (mov > 3) {
      console.log(`the dog number ${i + 1} is a adult`);
    } else {
      console.log(`the dog number ${i + 1} is a puppy🐶`);
    }
  });
};
checkdogs(j);
// MAPS STREAMS FILTER AND REDUCE
const movementsusd = movements.map(function (mov) {
  return mov * 1.1;
});
// console.log(movementsusd);

// using the push operations

const movement = [];
for (const mov of movements) {
  movement.push(mov * 1.1);
}
console.log(movement);

// arrow function

const arrow = movements.map(mov => {
  return mov * 1.1;
});
console.log(arrow);

const movementDescription = movements.map(
  (mov, i) =>
    `Movememt ${i + 1}: you have ${
      mov > 0 ? 'deposited' : 'withdrew'
    } ${Math.abs(mov)}`
  // Array.push()
);

console.log(movementDescription);

// const user = 'Arvind Rajagopalan Srinivasan';
const creatingusernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
creatingusernames(accounts);
console.log(accounts);
// console.log(creatingusernames('Arvind Rajagopalan Srinivasan'));

// FILTER METHOD
const move = movements.filter(function (mov) {
  return mov > 0;
});
console.log(move);
// Withdrawal using the arrow functions
const withdrawal = movements.filter(witha => witha < 0);
console.log(withdrawal);

// REDUCE--> AN ALATERNATIVE FOR THE MULTIPLE FOR LOOP

const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

// BY USING FOR LOOP

let sum = 0;
for (const i of movements) {
  sum += i;
}

console.log(sum);
//////////////////////////////////////////////////
// REDUCE
// MAXIMUM VALUE

const max = movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  } else {
    return mov; //signifies the maximum value to be seen in the array
  }
}, movements[0]);
console.log(max);
///////////////////////////////////////////////////////
//CODING CHALLENGE #2
let arr5 = [];
let sum3;
let avg;
let j1 = 0;
let i = 0;
const calcaveragehumanage = function (age) {
  age.forEach(function (ages) {
    // console.log(ages);
    if (ages <= 2) {
      arr5.unshift(ages * 2);
    } else {
      arr5.unshift(16 + ages * 4);
    }
    // console.log(arr5);
    for (i = 0; i < arr5.length; i++) {
      // console.log(i);
      if (arr5[i] > 18) {
        sum3 += i;
        j1++;
        avg = sum / j1;
      }
    }
  });
  console.log(avg);
  // console.log(j1);
  // console.log(arr5.length);
};
let Kate = [4, 1, 15, 8, 3];
let Julia = [3, 5, 2, 12, 7];
calcaveragehumanage(Kate);
calcaveragehumanage(Julia);
// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
const calHumanAge = function (ages) {
  const humanages = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  // console.log(humanages);
  const adults = humanages.filter(age => age >= 18);
  // console.log(humanages);
  // console.log(adults);
  const average =
    adults.reduce((acc, age, i, arr) => acc + age, 0) / arr.length;
  console.log(average);
};

calHumanAge([4, 1, 15, 8, 3]);
////////////////////////////////////////////////////////////
// THE MAPPING METHODS
// chaining;
// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
const humanage = movements =>
  movements
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, mov, i, arr) => acc + mov / arr.length, 0);
// humanage([5, 2, 4, 1, 15, 8, 3]);

console.log(humanage([5, 2, 4, 1, 15, 8, 3]));
// console.log(avg);
//find method
const acc = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(acc);
//using for each instead of using the find
const find1 = function (move) {
  move.forEach(function (ages) {
    if (ages.owner == 'Jessica Davis') {
      console.log(ages.owner);
      console.log(ages.interestRate);
      console.log(ages.pin);
      console.log(ages.username);
    }
  });
};
find1(accounts);

console.log(movements);
// seperated callback
const deposit = mov => mov > 0; // Based on the DRY Principle
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

// Array Method
const accountMovements = accounts.map(acc => acc.movements);

console.log(accountMovements);
// const allaccount = accountMovements.flat();
// console.log(allaccount);
// const overallbalance = allaccount.reduce((acc, mov) => acc + mov, 0);
// console.log(overallbalance);
const allaccount = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

console.log(allaccount);

// const bankdepositesum = accounts.
// array practice
//1.
const total_deposited = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(total_deposited);
//2.
const total_no_deposit = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 1000).length;
// .reduce((count, sum) => count++, 0);
console.log(total_no_deposit);
// USE REDUCE

const total_no_deposit1 = accounts
  .flatMap(acc => acc.movements) //.length;
  .reduce((count, sum) => (sum >= 1000 ? count++ : count), 0);
console.log(total_no_deposit);
//690% sure
//3.sums of the deposites and of the withdrawals
const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, sum) => {
      sum > 0 ? (sums.deposited += sum) : (sums.withdrawals += sum);
      return sums;
    },
    { deposited: 0, withdrawals: 0 }
  );

console.log(sums);
//4.
// this is a nice title
const titlecase = function (title) {
  const cap = str => str[0].toUpperCase() + str.slice(1);
  const exp = ['a', 'am', 'the', 'but', 'or', 'in', 'with'];
  const title11 = title
    .toLowerCase()
    .split(' ')
    .map(word =>
      exp.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(' ');
  return cap(title11);
};
console.log(titlecase('i am arvind'));
console.log(titlecase('and this is a very important concept'));

//
//5.
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(dogs => (dogs.recamt = Math.trunc(dogs.weight ** 0.75 * 28)));

console.log(dogs);

//2.
const sarah1 = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(sarah1);

console.log(
  `Sarah dogs are eating too ${
    sarah1.curFood > sarah1.recamt ? 'much' : 'too little'
  }`
);

//3.
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recamt)
  .flatMap(dogs => dogs.owners);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recamt)
  .flatMap(dogs => dogs.owners);

console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

//4.
console.log(`${ownersEatTooMuch.join(' and ')} 's dogs Eat too much`);

console.log(dogs.every(dogs => dogs.weight === dogs.recamt));

const receating = dogs =>
  dogs.curFood > dogs.curFood * 0.9 && dogs.curFood < dogs.curFood * 1.1;

console.log(dogs.some(receating));
const dogsrec = dogs.filter(
  dogs => dogs.curFood > dogs.curFood * 0.9 && dogs.curFood < dogs.curFood * 1.1
);
const dogssort = dogs.slice().sort((a, b) => a.recamt - b.recamt);
console.log(dogsrec);
console.log(dogssort);
