// 1.枚举合并问题
// enum A {
//   a = 1,
//   b = 2,
// }
// enum B {
//   c = 3,
//   d = 5,
// }
// declare type c = A | B;
// console.log(c.A.a);
// const c = {
//   ...A,
//   ...B,
// };
// declare type c= A |B
// console.log(c);
// :number[]

// 2.Math的参数问题
// 只能单个元素，不能数组
// const arr=[3,5,1,9,8]
// console.log(Math.max.call({},...arr));

// 3.迭代器
// function *iter (){
//     yield 1
//     yield 2
//     yield 3
// }
// console.log(iter());

// 4.promise的构造函数与resolve的优先级
// new Promise((res,resject)=>{
//     console.log(1111);
//     res(2)
//     console.log(333333);
// }).then(res=>{
//     console.log(res);

// })

// let  a={age:18,valueof:()=>{
//     console.log(123);
// },
// toString:()=>{
//     console.log(321);
// }}
// console.log(-1 == false);

//  reduce使用
// function reduceTest(...args: number[]) {
//   let res = args.reduce((pre, cur) => {
//     return pre + cur;
//   }, 0);
//   return res;
// }
// console.log(reduceTest(1, 23, 9));

// var的提升

// function varTest(
//   val1,
//   val2 = () => {
//     console.log(val1);
//   }
// ) {
//   console.log(val1); // 2
//   var val1 = 1;
// }
// varTest(2);

// function a(params: any) {
//   console.log(params);
// }

// class test {
//   private a: string = "123";
//   getInstrance() {
//     a(this);
//   }
// }
// const b = new test();
// b.getInstrance();

// const a = [1, 23, 44, 55, 6];
// let b= a.reduce((pre, cur) => {
//   return pre + cur;
// });
// console.log(b);


// 根据b的维度筛选出内容
// let a={nane:'bob',
//   sex:'man',
// }
// let b={
//   age:18
// }
// Object.assign(a,b)
// console.log(a);
// const data = [
//   {
//     中心: 1,
//     产品: 22,
//     领域: "22",
//   },
//   {
//     中心: 232,
//     产品: 323,
//     领域: "323",
//   },
// ];
// const b= ['中心','产品','领域']
// const a= data.map((item) => {
//   let res=[]
//   b.forEach((key)=>{
//     item[key] && res.push(item[key] );
//   })
//   return res.join('-')
// });

// console.log(a);

