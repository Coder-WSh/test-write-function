interface Queuer<T> {
    enqueue(...vals:T[]):void
    dequeue():T | undefined
    peek():T | undefined
    isEmpty():boolean
    // 下面这就是ref get set的实现 
//    get size():number
//    set size():number
}

class queuer<T> implements Queuer<T>{
    private data:T[]=[]

    enqueue(...vals:T[]):void{
        this.data.push(...vals)
    }

    dequeue():T | undefined{
       return this.data.shift()
    }
    peek():T | undefined{
        return this.data[0]
    }

    isEmpty():boolean{
        return this.size() ===0
    }

    size():number{
        return this.data.length
    }

}

// 击鼓传花啥的
function hotPotato(persons:string[],nums:number){
    const personsQueuer=new queuer<string>()
    // 1.进栈??约瑟夫环可能不是第一个开始， i可能要替换然后把前面再推进去，或者数组换下
    for(let i=0;i<persons.length;i++){
        personsQueuer.enqueue(persons[i])
    }
    // 2.只要剩最后一个就是的了
    while(personsQueuer.size()>1){
        // 2.1跳过指定人，其实就是出去又进来
        for(let i=0;i<=nums;i++){
           let a= personsQueuer.dequeue()
          if(a) personsQueuer.enqueue(a)//加if可能保险把 /狗头
        // or   personsQueuer.enqueue(personsQueuer.dequeue()!)
        }
        // 2.2前面跳过了，这个就出去了
        personsQueuer.dequeue()
    }
    // 3.最后只有这个
    // return personsQueuer.dequeue()
    // 约瑟夫环求的是位置
    return persons.indexOf(personsQueuer.dequeue() as string)
}

