// I'm sorry this is  not a emitAndOn  but a eventBus

interface MyOnAndEmitType {
  //   repertore: Map<string, Function[]>;
  //   isExist: (flag: string) => Function[];
  on(flag: string, fn: Function): void;
  emit(flag: string): void;
}

// ts类型限制没做到 抽象个类 然后后面继承这个类？
class myOnAndEmit implements MyOnAndEmitType {
  //   constructor(parameters) {}
  private repertore: Map<string, Function[]> = new Map();

  private isExist(flag: string) {
    return this.repertore.get(flag) ?? [];
  }

  on(flag: string, fn: Function) {
    this.repertore.set(flag, [...this.isExist(flag), fn]);
  }
  emit(flag: string) {
    if (!this.isExist(flag).length) {
      console.log("1");

      throw Error(`${flag} is not exist , please you check ${flag}`);
    }
    this.isExist(flag).map((fn) => {
      fn();
    });
  }
}

const my = new myOnAndEmit();
my.on("alert", () => {
  console.log(111111);
});
console.log(22222);
my.on("alert", () => {
  console.log(3333333);
});
my.emit("alert");
