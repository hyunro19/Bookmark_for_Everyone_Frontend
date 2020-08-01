import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const resourceHost = 'http://localhost:3000'

// http://jeonghwan-kim.github.io/2018/03/26/vue-authentication.html
export default new Vuex.Store({
  state: {
    server: 'http://52.79.157.226:8011',
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
    userInfo(state) {
      axios.get(state.server+'/api/v1/user')
      .then(res => {
        state.user = {
          user_id : res.data.user_id,
          user_name : res.data.user_name,
          email : res.data.email,
          }
        })
      .catch(err => {
        console.log(err)
        this.logout()
        alert('세션이 만료되었습니다.\n다시 로그인해 주세요.')
      });
    },
    logout(state) {
      state.authorization = null
      state.user = null
      localStorage.removeItem("jwt_token")
      axios.defaults.headers.common['authorization'] = null;
    },
  },
})
