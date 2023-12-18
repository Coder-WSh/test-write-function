const URL = "https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json";

// 1.新建实例
const xht = new XMLHttpRequest();
// 创建请求
xht.open("get", URL, true);
// 发送
xht.send();
// 状态监听
xht.onreadystatechange = function () {
  if (xht.readyState === 4 && xht.status === 200) {
    // new chinaMap().init();
    console.log(xht.response);
  }
};
