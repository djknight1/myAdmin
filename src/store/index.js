import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import state from './state'
import * as getters from './getters'
import createLogger from 'vuex/dist/logger'
import * as actions from './action'

Vue.use(Vuex)
/* 如果在发布模式下就不使用 */
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  mutations,
  state,
  getters,
  actions,
  strict: true,
  plugins: debug ? [createLogger()] : []
})
