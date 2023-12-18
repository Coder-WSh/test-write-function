// 定义：创建一个新的函数，在 bind 被调用时，这个新函数的 this 被指定为 bind()的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
// 将绑定的 bind 返回的新函数作为构造函数使用，使用new操作符去创建一个由目标函数创建的新实例
// 待定

// mdn 文档
/**
 * @description Function 实例的 bind() 方法创建一个新函数，当调用该新函数时，它会调用原始函数并将其 this 关键字设置为给定的值，
 * 同时，还可以传入一系列指定的参数，这些参数会插入到调用新函数时传入的参数的前面。
 */
Function.prototype.myBind = function (context = window, ...arg1) {
  const key = Symbol("key");
  const that = this;

  context[key] = that;
  // 可能当构造函数调用
  return function newFn(...arg2) {
    // new 实例的时候会调用一次方法会执行到这一步看this是不是在newFn的原型链上
    if (this instanceof newFn) {
      return new that(...[...arg1, ...arg2]);
    }
    return context[key](...[...arg1, ...arg2]);
  };
};

var hello = function (a, b, c, d) {
  console.log(this.temp);
  console.log(a, b, c, d);
};

var demo = {
  name: "demo",
};

var h = hello.bind(demo, 1, 2);
h(3, 4);
console.log("------------------------------");
const d = hello.myBind(demo, 1, 2);
d(3, 4);
// console.log(h);
// console.log(hello.myBind(demo,1,2));
