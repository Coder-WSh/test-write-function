import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

let baseURL = ''
const TIMEOUT = 50000
const tokenURL = ''
let isExitToken = false
let isRefeshToken = false
let requestList: Array<Function> = []

const router = useRouter()
const route = useRoute()

const recordURL = () => {
  // 这个字段要用正则
  // 1.1 hash就是用#进行分割并且router那creathashhistory来创建
  // 1.2 history                    那用creatwebhistory
  // 1.3 应该可以通过route.fullPath来获取当前href，不需要自己做处理 若是获取history的话就是正则查询 /应该用组 来匹配第一个
  // let url = window.location.href.split('#')[1] || ''
  let url = route.fullPath

  if (url !== '/login') {
    // 当前界面不为login，就要记录
  }
}

/**
 *
 * @param config 请求体
 * @description 判断token是否存在，并设置token
 */
function setToken(config: InternalAxiosRequestConfig<any>) {
  // 添加token,这里还要一个判断逻辑，确认是否存在token
  config.headers.Authorization = `Bearer ${111}`
}

/**
 * @param instance axios实例
 * @param config 请求
 * @description 刷新token。刷新token接口调用一次，如果报错则跳转登录页面调登录接口
 */
const handleRefreshToken = async (instance: AxiosInstance, config) => {
  // 1.验权token是否存在
  // 2.添加token
  setToken(config)
  // 3.根据是否正在获取token来进行处理
  if (!isRefeshToken) {
    isRefeshToken = true
    // 获取token,设置token,取出那些没有token而停滞的请求
    let getToken = () => {
      return new Promise((resolve, reject) => {
        resolve(1)
      })
    }
    return await getToken()
      .then(res => {
        // 获取token结束，恢复状态，并取出之前拦截的请求执行,清空数组
        isRefeshToken = false
        requestList.map(cb => cb())
        requestList = []
        return instance(config)
      })
      .catch(err => {
        return Promise.reject(err)
      })
      .finally(() => {
        // 无论如何这个都要设置为false
        isRefeshToken = false
      })
  } else {
    // 正在获取token，但是还在发请求，拦截
    return new Promise((resolve, reject) => {
      requestList.push(() => {
        resolve(instance(config))
      })
    })
  }
}

/**
 * 1.记录当前页面。
 * 2.弹出提示框。
 * 3.根据点击再判断相关逻辑，例如跳转登录或者
 */
function onHandleLogin() {
  recordURL()
  ElMessageBox.alert('登录过期，请重新登录', '系统提示')
    .then(() => {
      router.replace('/login')
      ElMessage({
        type: 'success',
        message: '跳转成功',
      })
    })
    .catch(err => {
      // console.log('err');
    })
}
// 1.创建实例
const instance = axios.create({
  baseURL,
  timeout: TIMEOUT,
})

//
// 2.请求拦截
instance.interceptors.request.use(
  (res: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> => {
    // 2.1添加token等相应字段
    setToken(res)
    return res
  },
  error => {
    return Promise.reject(error)
  },
)

// 3.响应拦截
instance.interceptors.response.use(
  async res => {
    // 3.1判断该次请求是否是请求token
    if (res.config.url === tokenURL) {
      // 3.1.1 正常请求返回
      if (res.status === 200) {
        return Promise.resolve(res)
      } else {
        // 3.1.2 这里是2开头但是不为200的数据 && token不存在
        // token失效时，当前页面如果连续发出了多个请求，避免弹出多个登录提示弹框。初始化false，允许弹出。
        if (!isExitToken) {
          // token失效时跳转登录页面的处理，记录当前页面url，弹出提示弹框
          onHandleLogin()
        }
        return Promise.reject(res)
      }
    }
  // 3.2 不是获取token的请求
    const result = res.data
    // 3.2.1 200正常返回
    if (result.status === 200) {
      return Promise.resolve(result)
    // 3.2.2 401没有权限，重新获取token
    } else if (result.status === 401) {
      return handleRefreshToken(instance, res.config)
    } else {
    // 3.2.3 alert报错
      ElMessageBox.alert(result.message || '服务器异常，请联系管理员', '系统提示')
      return Promise.reject(result.message)
    }
  },
  async error => {
    console.log('request-error-----', error)

    //登录接口处理：任何错误码统一跳转登录页面
    if (error?.config.url === tokenURL) {
      if (!isExitToken) {
        onHandleLogin()
      }
      return Promise.reject(error)
    }

    if (error?.response?.status === 401) {
      // 刷新token
      return handleRefreshToken(instance, error.config)
    } else {
      if (error?.response?.data?.message) {
        ElMessageBox.alert(error?.response?.data?.message || '服务器异常，请联系管理员', '系统提示')
      }
      return Promise.reject(error)
    }
  },
)
