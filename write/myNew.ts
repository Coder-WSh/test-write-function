// new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。
// new 关键字会进行如下的操作：
// 创建一个空的简单 JavaScript 对象（即 {}）；
// 为步骤 1 新创建的对象添加属性 __proto__，将该属性链接至构造函数的原型对象；
// 将步骤 1 新创建的对象作为 this 的上下文；
// 如果该函数没有返回对象，则返回 this。

function myNew(fn: Function, args) {
  // fn.prototype=null
  // ob.__proto__ = fn.prototype;
  const instance = Object.create(fn.prototype);
  const value = fn.apply(instance, args);
  return value instanceof Object ? value : instance;
}
