import { normalRoutes } from 'router/index'

const state = {
  isHidden: false,
  /* File是用于preview的 */
  File: {},
  choosenQuestion: [],
  userInfo: {},
  token: '',
  role: '',
  ExtraRouter: [],
  isCollapse: false,
  tagList: [],
  routers: normalRoutes
}

export default state
