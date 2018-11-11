/* 这个文件是用于mock excel表格的 */
import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    userId: '@increment',
    name: '@first',
    class: '@title(2, 3)',
    moralPoints: '@float(0, 15, 2 ,2)',
    devPoints: '@float(0, 15, 2 ,2)',
    studyPoints: '@float(50, 70, 2 ,2)',
    totalPoints: '@float(50, 100, 2 ,2)',
    exeGrades: '@float(70, 100, 2 ,2)',
    failNum: '@Integer(0, 5)'
  }))
}

export default {
  getList: () => {
    return {
      total: count,
      items: List
    }
  }
}
