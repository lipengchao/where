import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'

export default Vuex.createStore({
  state,
  // 如果有异步操作或者批量操作使用actions
  // actions: {
  //   changeCity (ctx, city) {
  //     // 触发mutations中的changeCity方法
  //     ctx.commit('changeCity', city)
  //   }
  // },
  mutations,
  // 练习使用getters
  getters: {
    doubleCity (state) {
      return state.city + ' ' + state.city
    }
  }
})
