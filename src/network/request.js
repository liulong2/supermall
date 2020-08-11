import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 50000
  })

  //axios请求拦截器
  instance.interceptors.request.use(config => {
    console.log(config);
    return config
  },err => {
    console.log(err);
  })
  //axios响应拦截器
  instance.interceptors.request.use(res =>{
    console.log(res);
    return res
  },err =>{
    console.log(err);
  })
}
