// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import Element from 'element-ui'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from 'store/index.js'
import { deepCopy } from 'base/util/utilsMethods'
import './assets/styles/common.styl'
import 'assets/iconfont.js'
import MarkDown from '@/plugin/markDown.js'
/* mockjs的大坑！！！ 用了mockjs 所有的请求都不能带cookie */
// import 'mock/index'
import SvgIcon from 'common/svgIcon/svgIcon.vue'
import wave from '@/directive/wave/wave'
import holder from '@/directive/holder/holder'

Vue.directive('wave', wave)
Vue.directive('holder', holder)
Vue.component('svg-icon', SvgIcon)
Vue.use(MarkDown)
Vue.config.productionTip = false
Vue.use(Element)
/* eslint-disable no-new */

router.beforeEach((to, from, next) => {
  if (store.getters.Token) {
    let token = store.getters.Token
    /* 登录了还想去login？ 没门 直接去首页把你 */
    if (to.path === '/Login') {
      next({ path: '/student/index' })
    } else {
      /* 否则你在去每个路由前要先获取你的信息  */
      /* 如果vuex中没有你的信息,说明你是第一次登录,那要先通过token再去访问用户信息接口获得信息 */
      /* 然后比对前端的静态路由表, 生成你可以去哪些路由 */
      /* 逻辑如下 */
      if (!store.getters.role) {
        store.dispatch('userInfo', token).then((res) => {
          /* 要通过role生成对应的路由表并将其保存到vuex中 */
          /* 因为又要保存到vuex中 我们可以将它写到action里面去 */
          const role = res.data.data.role
          store.dispatch('GenerateRoutes', { role }).then(() => {
            /* 用户列表拉取结束,开始添加路由。 */
            /* 使用addroutes方法 */
            router.addRoutes(deepCopy(store.getters.ExtraRouter))
            /* addRoutes可能会失效。我们让它重新进入这个界面 这样就会重新加载beforeEach钩子 */
            /* replace true不让他留下历史纪录 */
            next({ ...to, replace: true })
          })
        }).catch((err) => {
          console.log(err)
        })
      } else {
        /* 如果有role 说明用户info已经得到 已经可以进入了 */
        next()
      }
    }
  } else {
    /* 即是没有storeToken */
    /* 那就代表没登录或者过期了,那你就乖乖给我去登陆界面吧 */
    /* next('/xxx')会中断当前导航 重启一个新的导航 所以会再次触发beforeEach */
    /* 所以要判断一下你去的地方是不是login 如果是的话直接next */
    if (to.path === '/Login') {
      next()
    } else {
      next('/Login')
    }
  }
})
/* beforeEach要写在vue实例前面！！！！ 不然无法触发 */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  components: { App },
  template: '<App/>'
}).$mount('#app')
