import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const resourceHost = 'http://localhost:3000'

// http://jeonghwan-kim.github.io/2018/03/26/vue-authentication.html
export default new Vuex.Store({
  state: {
    server: 'http://localhost:8011',
    authorization: null,
    user: null,
    topics: ['IT 트랜드', '문화·독서', '음악·미술', '직장생활', '여행','기타'],
  },
  getters: {
    server(state) {
      return state.server
    },
    topics(state) {
      return state.topics
    },
    authorization(state) {
      return state.authorization
    },
    user(state) {
      return state.user
    }
  },
  mutations: {
    auth(state, payload) {
      this.state.authorization = payload
      localStorage.setItem("jwt_token", this.state.authorization)
      axios.defaults.headers.common['authorization'] = this.state.authorization;
    },
    userInfo(state, payload) {
      this.state.user = payload
    },
    logout(state) {
      state.authorization = null
      state.user = null
      localStorage.removeItem("jwt_token")
      alert('mutations logout token', state.authorization)
      axios.defaults.headers.common['authorization'] = null;
    },
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
