// 一个mutation就是一个修改state的方法
import { normalRoutes } from 'router/index'
import { deepCopy } from '../base/util/utilsMethods'

const mutations = {
  SET_IS_HIDDEN (state, isHidden) {
    state.isHidden = isHidden
  },
  SET_FILE (state, File) {
    state.File = File
  },
  SET_CHOOSEN_QUESTION (state, questionItem) {
    state.choosenQuestion.push(questionItem)
  },
  CLEAR_CHOOSEN_QUESTION (state) {
    state.choosenQuestion = []
  },
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_ROLE (state, role) {
    state.role = role
  },
  SET_USER_ROUTER (state, userRouter) {
    // 这个地方如果直接用userRouter
    const newRouter = deepCopy(normalRoutes.concat(userRouter))
    state.ExtraRouter = userRouter
    state.routers = newRouter
  },
  SET_USER_INFO (state, userInfo) {
    state.userInfo = userInfo
  },
  SET_IS_COLLAPSE (state, isCollapse) {
    state.isCollapse = isCollapse
  },
  SET_TAG_LIST (state, tagItem) {
    state.tagList.push(tagItem)
  },
  DEL_TAG_ITEM (state, view) {
    /* slide产生一个新数组 从index到1的数组 */
    /* splice是从数组中删除元素 */
    for (let [index, item] of state.tagList.entries()) {
      if (item.path === view.path) {
        state.tagList.splice(index, 1)
      }
    }
  }
}

export default mutations
