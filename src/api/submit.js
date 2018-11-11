
import axios from 'axios'
import store from 'store/index'
const url = 'http://192.168.3.226:8080/upload' // 实际接口
// const url = 'http://localhost:3000/upload'

// 这是对java来讲的配置
/* export function postFile (formData) {
  return Request(formData, url).then((res) => {
    return Promise.resolve(res.data)
  })
} */
// 对于nodejs来讲 需要再增加一个form-data包
// 下面是对nodejs来讲的配置
export function postFile (formData) {
  return axios.post(url, formData, {
    headers: {
      'Authorization': store.getters.Token
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
