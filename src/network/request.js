import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/z8',
    timeout: 50000
  })

  //axios请求拦截器
  instance.interceptors.request.use(config => {
    // console.log(config);
    return config
  },err => {
    // console.log(err);
    return err
  })
  //axios响应拦截器
  instance.interceptors.response.use(res =>{
    // console.log(res);
    return res.data
  },err =>{
    // console.log(err);
    return err
  })
  return instance(config)
}
