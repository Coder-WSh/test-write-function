let ob = {
  age: 12,
};
function a() {
  console.log(this.age);
}

function myCall(replaceObj, arg) {
  let that = this || window;
  replaceObj.that(arg);
}

Function.prototype.myCall = function (replaceObj, ...args) {
  let that = this || window;
  // 多了这一步
  replaceObj.fn=that
 const result= replaceObj.fn(...args)
  delete replaceObj.fn
  // 这不是一个function，没有这个方法
  // replaceObj.that()

  return result
};
// a();
// a.myCall(ob);
// 还是得先绑定方法才能调用 下面也是包ob.a不是个function
ob.a()
