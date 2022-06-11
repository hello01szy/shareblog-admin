import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'

const server = axios.create({ timeout: 1000 * 60 * 5 })
server.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
server.defaults.withCredentials = true
server.defaults.baseURL = 'http://192.168.1.19:8081/'
// 请求拦截器
server.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = sessionStorage.getItem('token') || ''
    token && (config.headers.Authentication = token)
    return config
  },
  error => Promise.error(error)
)

// 响应拦截器
server.interceptors.response.use(
  response => {
    if (response.data.code.substring(0, 3) !== '200') {
      return Promise.reject(response)
    }
    return Promise.resolve(response)
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作
        case 401:
          router.replace({
            path: '/login'
            // query: { redirect: router.currentRoute.fullPath }
          })
          break
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          Message.error('token过期了哦，请重新登陆')
          // 清除token
          sessionStorage.removeItem('token')
          store.commit('loginSuccess', null)
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/login'
            })
          }, 1000)
          break
          // 404请求不存在
        case 404:
          Message.error('请求资源不存在哦')
          break
          // 其他错误，直接抛出错误提示
        default:
          Message.error('未知异常')
      }
      return Promise.reject(error.response)
    } else {
      Message({
        type: 'error',
        message: '服务未启动',
        showClose: true
      })
      return Promise.reject(error)
    }
  }
)
export default server
