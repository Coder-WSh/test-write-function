// Object.create() 静态方法以一个现有对象作为原型，创建一个新对象。
Object.myCreate = function (prototype) {
  if (typeof prototype !== "object") {
    throw Error(`${prototype} is not object`);
  }
  function fn() {}
  fn.prototype = prototype;

  return new fn();
};
let fn = {
  age: 18,
};
const a = Object.create(fn);
const b = Object.myCreate(fn);
console.log(a);
console.log(b);
