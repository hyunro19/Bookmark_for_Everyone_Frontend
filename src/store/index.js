import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const resourceHost = 'http://localhost:3000'

// http://jeonghwan-kim.github.io/2018/03/26/vue-authentication.html
export default new Vuex.Store({
  state: {
    jwt_token: null,
    user: null,
  },
  getters: {
    jwtToken(state) {
      return state.jwt_token
    },
  },
  mutations: {
    login(state, payload) {
      console.log('mutations before token', payload)
      state.jwt_token = payload.jwt_token
      state.user = payload.user
      console.log('mutations after token', state.jwt_token)
    },
    logout(state) {
      state.jwt_token = null
      state.user = null
      alert('mutations logout token', jwt_token)
    }
  },
  actions: { // 비동기, 로그인은 동기여야 하므로 사용안함, 나중에 쓰기
    // login ({commit}, {email, password}) {
    //   return axios.post(`${resourceHost}/api/v1/user`, {name, email, password})
    //     .then(({res}) => commit('login', data))
    // },
    // logout ({commit}) {
    //   commit('logout')
    // },
  }
})
