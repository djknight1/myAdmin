import { Request } from 'base/util/solveAxios'
// const url = 'http://localhost:8081/DJ/Login' // mock地址
const url = 'http://192.168.3.226:8080/login' // 实际地址
// const url = 'http://localhost:3000/login' // node服务器地址
export function Login ({ username, password }) {
  const data = Object.assign({}, { username, password })
  return Request(data, url).then((res) => {
    return Promise.resolve(res)
  })
}
