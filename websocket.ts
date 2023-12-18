// 创建websocke连接，存储传入的回调函数。使用闭包，每个websocket实例维护各自的变量
export const createWebsocket = (url: string, payload: any, successCB?: any, errCB?: any) => {
  // console.log('createWebsocket---', url, payload, successCB, errCB)
  let messageCB: any = successCB //连接成功执行的回调
  let errorCB: any = errCB //连接失败执行的回调
  let wsUrl: any = url // ws 连接地址
  let wsObj: any = {} //websocket 实例
  let lockReconnect = false //是否锁定重连，true不可重连
  let wsCreateHandler: any = null //重连定时器
  let sendData: any = payload //初始创建websocket后立即发送的数据，可为空
  let webSocketState: boolean = false //websocket状态，true连接状态
  let lockReconnectTime = 3000 //重连时间间隔
  let maxReconnectNum = 50 //最大重连次数
  let reconnectNum = 0 //当前重连次数

  // 心跳
  let time1 = 5000 //心跳检查时间间隔
  let time2 = 2000 //预留发送ping后到收到pong的时间
  let pingTimer: any = null //间歇发送ping的定时器
  let checkPongTimer: any = null //间歇检测发送ping后是否收到pong的定时器，收到pong设置webSocketState为true + 重置pingTimer定时器，开启下一次的ping；未收到pong重连
  const startHeartCheck = () => {
    pingTimer && clearTimeout(pingTimer)
    checkPongTimer && clearTimeout(checkPongTimer)
    pingTimer = null
    checkPongTimer = null
    pingTimer = setTimeout(() => {
      wsObj.sendMessage && wsObj.sendMessage({ type: 'ping' })
      // wsObj && wsObj.send(JSON.stringify({ type: 'ping' }))
      webSocketState = false //发送ping后设置webSocketState为false，time2时间后收不到pong，重连
      checkPongTimer = setTimeout(() => {
        // console.log('checkPongTimer---', wsObj?.readyState)
        if (webSocketState) {
          startHeartCheck()
        } else {
          reconnect()
        }
      }, time2)
    }, time1)
  }
  const stopHeartCheck = () => {
    pingTimer && clearTimeout(pingTimer)
    checkPongTimer && clearTimeout(checkPongTimer)
    pingTimer = null
    checkPongTimer = null
  }

  // 创建websocket实例，注册手动关闭websocke、sendMessage方法
  const init = () => {
    if (typeof WebSocket === 'undefined') {
      console.log('您的浏览器不支持WebSocket，无法获取数据')
      return false
    }
    try {
      wsObj = new WebSocket(wsUrl)
      // 创建实例后，给实例注册方法：
      // 手动关闭websocke方法
      wsObj.closeWebsocket = () => {
        if (wsObj) {
          stopHeartCheck()
          wsObj.close()
          lockReconnect = true
          wsCreateHandler && clearTimeout(wsCreateHandler)
          wsObj = null
          console.log('手动关闭websocket', pingTimer, checkPongTimer)
          // setTimeout(() => {
          //   console.log('手动关闭websocket----', pingTimer, checkPongTimer)
          // }, 500)
        }
      }
      // 发送消息方法
      wsObj.sendMessage = (payload: any) => {
        if (!payload) {
          return
        }
        if (wsObj?.readyState !== WebSocket.OPEN) {
          return
        }
        let temp = payload
        if (typeof payload !== 'string') {
          temp = JSON.stringify(temp)
        }
        // console.log('sendMessage---', payload)
        wsObj && wsObj.send(temp)
      }

      // 注册事件
      initWsEventHandle()
    } catch (error) {
      reconnect()
    }
  }

  // 重连
  const reconnect = () => {
    console.log('连接异常，开始重连，lockReconnect', lockReconnect, reconnectNum)
    if (lockReconnect) {
      return
    }
    if (reconnectNum > maxReconnectNum) {
      return
    }
    reconnectNum++
    lockReconnect = true //锁定 lockReconnectTime 时间内不可再次重连
    wsCreateHandler && clearTimeout(wsCreateHandler)
    wsCreateHandler = setTimeout(() => {
      init()
      lockReconnect = false
    }, lockReconnectTime)
  }

  // 给websocket实例注册事件
  const initWsEventHandle = () => {
    try {
      wsObj.binaryType = 'arraybuffer'
      wsObj.onopen = (event: any) => {
        // console.log('onopen---')
        if (wsObj?.readyState === WebSocket.OPEN) {
          sendData && wsObj.sendMessage && wsObj.sendMessage(sendData)
          // sendData && wsObj && wsObj.send(JSON.stringify(sendData))
        }
        if (wsObj?.readyState === wsObj.CLOSE) {
          reconnect()
          errorCB && errorCB()
        }
        webSocketState = true
        startHeartCheck()
        reconnectNum = 0
      }
      wsObj.onmessage = (event: any) => {
        let data = JSON.parse(event.data)
        // console.log('onmessage---', data)

        if (data.type == 'pong') {
          webSocketState = true
        } else {
          messageCB && messageCB(data)
        }
      }
      // 1000 正常关闭
      wsObj.onclose = (event: any) => {
        // console.log('onclose---', event)
        if (event && event.code != 1000) {
          errorCB && errorCB()
          reconnect()
          webSocketState = false
        }
      }
      wsObj.onerror = (event: any) => {
        // console.log('onerror---', event)
        errorCB && errorCB()
        reconnect()
        webSocketState = false
      }
    } catch (error) {
      reconnect()
    }
  }

  init()

  return wsObj
}
