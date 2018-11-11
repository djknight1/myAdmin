import { Request } from 'base/util/solveAxios'

export function getStuList () {
  return Request({}, '/student/list').then((res) => {
    return Promise.resolve(res)
  })
}
