let test = [1, 23, 4343, [2323, 232, 3, 213, 1, [3232, 3432423]]];

function flat(arr) {
  return arr.reduce((pre, cur) => {
    if (Object.prototype.toString.call(cur).slice(8, -1) === "Array") {
      pre.push(...flat(cur));
    } else {
      pre.push(cur);
    }
    return pre;
  }, []);
}
// or test.flat(Infinity)
console.log(flat(test));
// 人口结构，当地政策，生态环境