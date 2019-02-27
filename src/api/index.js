import axios from 'axios'
import {message} from 'antd'

const isDEV = (process.env.NODE_ENV === 'development')
const ajax = axios.create({
  baseURL: isDEV ?  "http://127.0.0.1:4444" : '/'
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  console.log('11111111111')
  const { token: authToken } = JSON.parse(window.sessionStorage.getItem('userInfo')) || {}
  config.data = {
    ...config.data,
    authToken
  }
  return config;
}, function (error) {
  console.log(error,'错误')
  return Promise.reject(error)
});

// 添加响应拦截器
ajax.interceptors.response.use(resp => {
  if (resp.status === 200 && resp.data.code === 200) {
    return resp.data.data
  } else {
    console.log(resp)
    return resp
  }
},(err) => {
  message.warning('网络错误')
  return Promise.reject(err)
})

// 文章信息
export const postArticleList = (cateID) => {
  return ajax.post("/api/v1/articleList",cateID)
}
/**
 * 通过文章id删除文章
 * @param {*} id 文章id
 */
export const deleteArticleById = (id) => {
  return ajax.post(`/api/v1/article/delete/${id}`)
}
export const saveArticle = (data) => {
  return ajax.post("/api/v1/saveArticle",data)
}

/**
 * 
 * @param {*} id 
 */
export const dashboardCount = () => {
  return ajax.post("/api/v1/dashboard/count")
}
export const dashboardMessage = () => {
  return ajax.post("/api/v1/dashboard/message")
}

/**
 * 获取用户列表
 * @param {} cateID 
 */
export const postUserList = (cateID) => {
  return ajax.post("/api/v1/articleList",cateID)
}
/**
 * 
 * @param {通过用户id删除用户} id 
 */
export const deleteUserById = (id) => {
  return ajax.post(`/api/v1/article/delete/${id}`)
}

export const pictureList = (id) => {
  return ajax.post("/api/v1/picture/list")
}
export const pictureAdd = (e) => {
  return ajax.post("/api/v1/picture/add.do",e)
}
export const userLogin = (e) => {
  return ajax.post("/api/v1/user/login.do",e)
}
