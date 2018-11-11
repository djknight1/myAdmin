import { Request } from 'base/util/solveAxios'
// mock的地址
// const InfoUrl = 'http://localhost:8081/DJ/userInfo' // mock
// const InfoUrl = 'http://localhost:3000/userInfo' // node地址
const InfoUrl = 'http://192.168.3.226:8080/info'
export function getUserInfo (token) {
  const data = Object.assign({}, { token })
  return Request(data, InfoUrl).then((res) => {
    return Promise.resolve(res)
  })
}
