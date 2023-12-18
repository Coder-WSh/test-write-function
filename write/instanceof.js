function myInstanceof(left, rigth) {
  let leftPrototype = left._proto_;
  while (true) {
    if (leftPrototype === null) {
      return false;
    }
    if (leftPrototype === rigth.prototype) {
      return true;
    }
    leftPrototype = leftPrototype._proto_;
  }
}
