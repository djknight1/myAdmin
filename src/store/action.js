import { Login } from 'api/Login'
import { getUserInfo } from 'api/getUserInfo'
import { setCookie } from 'base/util/utilsMethods.js'
import { seniorRoutes } from 'router/index'
/* 这个action在login点击之后分发, 获取token */
// import {deepCopy} from 'base/util/utilsMethods'

export const LoginByUsername = function ({ commit }, { name, Password }) {
  const username = name.trim()
  const password = Password
  return new Promise((resolve, reject) => {
    Login({ username, password }).then((response) => {
      const data = response.data
      if (data.code === 1) {
        setCookie('Token', data.data.token) // 登录成功后将token存储在cookie之中
        commit('SET_TOKEN', data.data.token)
        resolve()
      } else {
        console.log(data.msg)
        reject(data.msg)
      }
    }).catch(error => {
      reject(error)
    })
  })
}
/* 获得用户信息 */
export const userInfo = function ({ commit }, token) {
  return new Promise((resolve, reject) => {
    getUserInfo(token).then((response) => {
      commit('SET_ROLE', response.data.data.role)
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
/* 根据用户信息生成路由表 */
export const GenerateRoutes = function ({ commit }, roleData) {
  return new Promise((resolve, reject) => {
    const { role } = roleData // 对象解构
    /* filter和mapp有点类似 */
    let userRouter = seniorRoutes.filter((item) => {
      /* 生成路由表的逻辑如下 */
      /* 如果你是最大的管理员则返回seniorRoutes所有的item就行 */
      /* 否则 就要对seniorRoutes所有的item进行遍历,看他们的meta里面有没有role这一项数据 */
      /* 如果有,再对它与传进来的role做比较（以后的role不一定是一个的,多个权限访问一个页面也是有可能的） */
      /* 只要比对成功,返回该路由item。然后还要判断它是否有children,如果有再进行上面的步骤。有点像递归 */
      /* 后期可以考虑用递归重写该方法 */
      // if (role === 'admin') { // 如果后期role是数组 将其改成indexof
      // return true
      // }
      if (checkAuthority(role, item)) {
        if (item.children && item.children.length > 0) {
          item.children = item.children.filter((childItem) => {
            if (checkAuthority(role, childItem)) {
              return true
            }
            /* 没有权限 就是不用放到children里面 就返回false */
            return false
          })
        }
        /* 其实只要满足了checkAuthority就可以返回true 只不过为了以后的扩展方便 我们增加一步对children的判断 反正最后都是返回true */
        return true
      } else {
        return false
      }
    })
    console.log(userRouter)
    commit('SET_USER_ROUTER', userRouter)
    resolve()
  })
}

function checkAuthority (role, route) {
  if (route.meta && route.meta.role) {
    /* 因为role是数组 如果role中有我们传进来的权限值 则返回true */
    // return role.some(item => route.meta.role.indexOf(role) >= 0)
    /* 但是当前的项目的role不是数组 不用上面的写法 */
    return route.meta.role === role
  } else {
    /* 如果没有meta或者meta.role没有, 说明是可以访问父地址,那这个子地址也是可以访问的 */
    return true
  }
}
/* 删除tag-view之后返回最近看过的tag */
export const delTag = function ({ commit, state }, index) {
  return new Promise((resolve, reject) => {
    commit('DEL_TAG_ITEM', index)
    console.log(...state.tagList)
    resolve([...state.tagList])
  })
}
