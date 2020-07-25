import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const resourceHost = 'http://localhost:3000'

// http://jeonghwan-kim.github.io/2018/03/26/vue-authentication.html
export default new Vuex.Store({
  state: {
    authorization: null,
    user: null,
  },
  getters: {
    authorization(state) {
      return state.authorization
    },
    user(state) {
      return state.user
    }
  },
  mutations: {
    login(state, payload) {
      console.log('mutations before token', payload)
      this.state.authorization = payload.authorization
      this.state.user = payload.user
      console.log('mutations after token', state.authorization)
      axios.defaults.headers.common['Authorization'] = this.state.authorization;
    },
    logout(state) {
      state.authorization = null
      state.user = null
      alert('mutations logout token', state.authorization)
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
