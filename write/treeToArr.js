const obj = [{
  id: 1,
  name: "部门1",
  pid: 0,
  children: [
    {
      id: 2,
      name: "部门2",
      pid: 1,
      children: [],
    },
    {
      id: 3,
      name: "部门3",
      pid: 1,
      children: [
        {
          id: 4,
          name: "部门4",
          pid: 3,
          children: [
            {
              id: 5,
              name: "部门5",
              pid: 4,
              children: [],
            },
          ],
        },
      ],
    },
  ],
}]

//不用去除children ，那就是便利取出来就行了
function treeToArr(arr) {
     const res = [];
     res.push(...arr); // chilren插入结果数组
     for (const item of arr) {
       // 遍历子元素，若包含children则递归调用
       if (item.children && item.children.length) {
        // 返回是数组需要解构
         res.push(...treeToArr(item.children));
       }
     }
     return res;
   
}
console.log(treeToArr(obj));