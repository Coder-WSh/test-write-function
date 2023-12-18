function deepClone(params) {
  // nomornize type
  if (typeof params !== "object" || params === null) {
    return params;
  }

  let copy = {};
  if (params.constructor === Array) {
    copy = [];
  }
  for (let val in params) {
    if (params.hasOwnProperty(params[val])) {
      copy[val] = deepClone(params[val]);
    }
  }
  return copy
}
