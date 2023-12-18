Function.prototype.myApply = function (context = window, args) {
  const that = this;
  const key = Symbol("key");
  context[key] = that;
  const result = context[key](args);
  delete context[key];
  return result;
};
