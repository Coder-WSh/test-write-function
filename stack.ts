// node不能运行ts ,要下载ts-node

interface stack<T> {
  /**
   * @param val 参数
   * @description 进栈
   */
  push(val: T): void;
  /**
   * @description 出栈
   */
  pop(): T | undefined;
  /**
   * @returns 栈顶元素
   */
  peek(): T | undefined;
  /**
   * @returns 栈是否为空
   */
  isEmpty(): boolean;
  /**
   * @returns 栈的元素数量
   */
  size(): number;
}

class stack<T> implements stack<T> {
  private date: T[] = [];

  push(val:T){
    this.date.push(val);
  }

  pop(): T | undefined {
    return this.date.pop();
  }

  peek(): T | undefined {
    return this.date[this.size() - 1];
  }

  isEmpty(): boolean {
    return this.size() ? true : false;
  }

  size(): number {
    return this.date.length;
  }
}


function tenToTwo(num:number):string |number{
    let sum:number[]=[]

    function d(num:number):void{
        let c=num%2
        sum.push(c)
        num=Math.floor(num/2)
        if(num!==0){
            d(num)
        }
    }

   d(num)
//    从下往上
//    console.log(sum.join());
//    懒执行？？？？？？后面不处理
//    游览器提供了replaceAll方法
// 
    // return sum.join().replaceAll(',','') 2021发布的
    // return sum.reverse().join('') 直接选择什么隔断
    // 正则选择全部替换
    return sum.reverse().join().replace(new RegExp(',','g'),'')
}


console.log(tenToTwo(35));
