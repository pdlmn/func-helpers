const curry = (fn) => {
  return function curried (...args) {
    if (fn.length !== args.length) {
      return curried.bind(null, ...args)
    }
    return fn(...args)
  }
};

const hasTruthy = (arr) => arr.some((el) => Boolean(el));
const hasFalsy = (arr) => arr.some((el) => !el);

const replaceEveryNth = curry((nth, start, until, value, arr) => {
  const result = [...arr];
  const s = (typeof start === 'number') ? start : nth - 1;
  const len = until || arr.length;
  for (let i = s; i < len; i += nth) {
    result[i] = value;
  }
  return result
});

const replaceAt = curry((index, value, arr) => {
  const result = [...arr];
  result[index] = value;
  return result
});

const map = curry((fn, functor) => {
  let result;
  switch (Object.prototype.toString.call(functor)) {
    case '[object Array]':
      result = [];
      for (const item of functor) {
        result.push(fn(item));
      }
      return result
    case '[object Object]':
      result = {};
      for (const prop of Object.keys(functor)) {
        result[prop] = fn(functor[prop]);
      }
      return result
  }
});

const isArray = curry((val) => (
  val !== null &&
  Object.prototype.toString.call(val) === '[object Array]'
));

const isObject = curry((val) => Object.prototype.toString.call(val) === '[object Object]');

const pipe = (...functions) =>
  (value) => functions.reduce((acc, fn) => fn(acc), value);

const decrement = curry((val) => (isArray(val) || isObject(val))
  ? map((n) => (typeof n === 'number') ? n - 1 : n, val)
  : val - 1
);

const decrementEach = map(decrement);

const increment = curry((val) => (isArray(val) || isObject(val))
  ? map((n) => (typeof n === 'number') ? n + 1 : n, val)
  : val + 1
);

const incrementEach = map(increment);

const repeat = curry((fn, num) => {
  const result = [];
  let i = 0;
  while (i < num) {
    result[i] = fn(i);
    i++;
  }
  return result
});

const find = curry((fn, arr) => {
  const len = arr.length;
  let i = 0;
  while (i < len) {
    if (fn(arr[i])) {
      return arr[i]
    }
    i++;
  }
});

const findIndex = curry((fn, arr) => {
  const len = arr.length;
  let i = 0;
  while (i < len) {
    if (fn(arr[i])) {
      return i
    }
    i++;
  }
});

const forEach = curry((fn, arr) => {
  const len = arr.length;
  let i = 0;
  while (i < len) {
    fn(arr[i]);
    i++;
  }
  return arr
});

const flatten = curry((arr) => {
  const result = [];
  const ilen = arr.length;
  let i = 0;
  while (i < ilen) {
    if (Object.prototype.toString.call(arr[i]) === '[object Array]') {
      const jarr = flatten(arr[i]);
      const jlen = jarr.length;
      let j = 0;
      while (j < jlen) {
        result.push(jarr[j]);
        j++;
      }
    } else {
      result.push(arr[i]);
    }
    i++;
  }
  return result
});

const filter = curry((fn, arr) => {
  const result = [];
  const len = arr.length;
  let i = 0;
  while (i < len) {
    if (fn(arr[i])) {
      result.push(arr[i]);
    }
    i++;
  }
  return result
});

const objEqual = curry((obj1, obj2) => {
  for (const prop of Object.keys(obj1)) {
    if (obj1[prop] !== obj2[prop]) {
      return false
    }
  }
  return true
});

const objectInArray = curry((obj, arr) => {
  for (const currentObj of arr) {
    if (objEqual(currentObj, obj)) {
      return true
    }
  }
  return false
});

const removeDuplicateObj = curry((arr) => {
  const len = arr.length;
  if (len <= 1) return arr
  const result = [];
  for (let i = 0; i < len; i++) {
    if (!objectInArray(arr[i], result)) {
      result.push(arr[i]);
    }
  }
  return result
});

const remove = curry((item, arr) => {
  const result = [...arr];
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    if (arr[i] === item) {
      result.splice(i, 1);
      return result
    }
  }
  return result
});

const all = curry((pred, arr) => {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    if (!pred(arr[i])) {
      return false
    }
  }
  return true
});

const any = curry((pred, arr) => {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    if (pred(arr[i])) {
      return true
    }
  }
  return false
});

const modify = curry((prop, fn, obj) =>
  Object.assign(
    {},
    obj,
    { [prop]: fn(obj[prop]) }
  ));

export { all, any, curry, decrement, decrementEach, filter, find, findIndex, flatten, forEach, hasFalsy, hasTruthy, increment, incrementEach, map, modify, objEqual, objectInArray, pipe, remove, removeDuplicateObj, repeat, replaceAt, replaceEveryNth };
