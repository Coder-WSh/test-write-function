const socketURL = "";
// 新建实例
const socket = new WebSocket(socketURL);
// 有以下几个事件
// open
socket.onopen = function (even) {
  console.log("连接成功");
};
socket.send("发给游览器的数据");
socket.onmessage = (instance, ev) => {
  const message = instance.data;
  console.log("接收到消息:", message);
};
socket.onerror = (instance, ev) => {
  console.log("错误时执行");
};
socket.onclose = function (instance, ev) {
  console.log("结束时执行");
};
// 主动结束连接
socket.close();
// 后面加入心跳，二次封装啥的
