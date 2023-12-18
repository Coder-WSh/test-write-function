const judge = (val) => {
  return Object.prototype.toString.call(val).slice(8, -1);
};

console.log(judge('123'));
console.log(judge(123));
console.log(judge([123]));