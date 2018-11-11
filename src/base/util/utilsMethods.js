/* 实现简单深拷贝的一种方法的封装 */
export function deepCopy (obj) {
  if (!obj) {
    return obj
  }
  let sourceCopy = obj instanceof Array ? [] : {}
  for (let item in obj) {
    sourceCopy[item] = typeof obj[item] === 'object' ? deepCopy(obj[item]) : obj[item]
  }
  return sourceCopy
}

/* 对复杂对象进行递归拷贝 */

/* Ps:朱登杰真tm是个天才 */
export function recursiveCopy (newObj, obj) {
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      newObj[key] = recursiveCopy(obj[key])
    } else {
      newObj[key] = obj[key]
    }
  }
  return newObj
}

/* cookie是以键值对存放的 不同cookie用;分开 */

/* name=xxxx; password=xxx */
export function setCookie (cookieName, cookieValue) {
  if (typeof cookieValue === 'object') {
    document.cookie = `${cookieName}=${JSON.stringify(cookieValue)}`
  } else {
    document.cookie = `${cookieName}=${cookieValue}`
  }
}

export function getCookie (cookieName) {
  const strCookie = document.cookie

  let arrCookie = strCookie.split(';')

  for (let i = 0; i < arrCookie.length; i++) {
    let c = arrCookie[i].split('=')

    /* 防止两边有空格 */
    if (c[0].trim() === cookieName) {
      return c[1]
    }
  }
  return ''
}
