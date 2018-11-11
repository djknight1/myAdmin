import Mock from 'mockjs'
import StuList from './list'

Mock.mock(/\/student\/list/, 'post', StuList.getList)

export default Mock
