const data = [
  { id: "02", name: "小亮", pid: "01", job: "产品leader" },
  { id: "03", name: "小美", pid: "01", job: "UIleader" },
  { id: "04", name: "老马", pid: "01", job: "技术leader" },
  { id: "05", name: "老王", pid: "01", job: "测试leader" },
  { id: "06", name: "老李", pid: "01", job: "运维leader" },
  { id: "07", name: "小丽", pid: "02", job: "产品经理" },
  { id: "08", name: "大光", pid: "02", job: "产品经理" },
  { id: "09", name: "小高", pid: "03", job: "UI设计师" },
  { id: "10", name: "小刘", pid: "04", job: "前端工程师" },
  { id: "11", name: "小华", pid: "04", job: "后端工程师" },
  { id: "12", name: "小李", pid: "04", job: "后端工程师" },
  { id: "13", name: "小赵", pid: "05", job: "测试工程师" },
  { id: "14", name: "小强", pid: "05", job: "测试工程师" },
  { id: "15", name: "小涛", pid: "06", job: "运维工程师" },
  { id: "01", name: "张大大", pid: "", job: "项目经理" },
];

// 循环
// function arrToTree(arr) {
//   let map = {};
//   const res = [];
//   // 一层就是深拷贝
//   for (let val of arr) {
//     map[val.id] = { ...val, childrens: [] };
//   }

//   // 深拷贝所以用map的值
//   // for (const ele of arr) {
//   for (const ele of Object.values(map)) {
//     // 拿到父元素
//     if (map[ele.pid] === undefined) {
//       res.push(ele);
//     } else {
//       map[ele.pid].childrens.push(ele);
//     }
//   }
//   return res;
// }



// 递归
// function arrayToTreeRec(nodes, parentId = undefined) {
//   // 1. 筛选当前的子节点
//   // 2. 字节点的children便利子节点
//   return nodes
//     .filter((node) => node.pid === parentId)
//     .map((node) => ({ ...node, children: arrayToTreeRec(nodes, node.id) }));
// }
// const tree = arrayToTreeRec(data,'');

/**
 * @description 还是遍历先找到头，然后找头的子集，子集又找自己的子集每个只找自己的子集，包含了回溯和递归
 */
function buildTree(nodes, parentId) {
  const tree = [];
  for (const node of nodes) {
    if (node.pid === parentId) {
      const children = buildTree(nodes, node.id);
      if (children.length) {
        node.children = children;
      }
      // 这是同一级
      tree.push(node);  
    }
  }
  return tree;
}
buildTree(data, "");

