function debounce(fn: Function, wait: number = 5000, immer: boolean = true) {
  let timer: number;
  return (args: unknown) => {
    if (immer) {
      fn.apply(this, args);
      immer = false;
    }

    timer && clearTimeout(timer);

    timer = setTimeout(() => {
      // 直接调用是window的
      fn.apply(this, args);
    }, wait);
  };
}
