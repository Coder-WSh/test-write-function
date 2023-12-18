function throttle(
  fn: Function,
  wait: number = 5000,
  immer: boolean = true
): (args: unknown) => void {
  let last: number = 0;
  return (args) => {
    let now = new Date().getTime();
    // if (immer) {
    //   fn.apply(this, args);
    //   immer = false;
    //   last = now;
    // }
    // 开始就执行的
    if (now - last >= wait) {
      //   clearTimeout(timer);
      last = now;
      // 第一次默认不执行
      if (!immer) {
        immer = !immer;
        return;
      }
      fn.apply(this, args);
    }
  };
}
