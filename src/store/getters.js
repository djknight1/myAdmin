// getter是得到state的方法
import { getCookie } from 'base/util/utilsMethods'
export const isHidden = state => state.isHidden
export const File = state => state.File
export const choosenQuestion = state => state.choosenQuestion
/**
 * @return {string}
 */
export const Token = function (state) {
  return state.token ? state.token : getCookie('Token')
}
export const role = state => state.role
export const ExtraRouter = state => state.ExtraRouter
export const routers = state => state.routers
export const userInfo = state => state.userInfo
export const isCollapse = state => state.isCollapse
export const tagList = state => state.tagList

/* 天才大概说的就是我吧 */
/* export const currentDrop = state => state.currentDrop
export const isShowDialog = state => state.isShowDialog
export const formType = state => state.formType */
// 即等于function(state){ return state.isHidden}
