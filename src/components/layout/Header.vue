<template>
    <header class="header">
        <div v-if="loggedIn" class="text-right">
            {{userName}} 님
            <router-link to="/myinfo">내 정보</router-link> |
            <a href="#" @click='logout'>로그아웃</a>
        </div>
        <div v-else class="text-right">
            <router-link to="/register">회원가입</router-link> |
            <router-link to="/login">로그인</router-link>
        </div>
        <h1><router-link to="/">모두의 북마크</router-link></h1>
        <div id="mid-nav">
            <router-link to="/posts/recent">최신 북마크</router-link> |
            <router-link to="/posts/my">나의 북마크</router-link> |
            <router-link to="/newpost">새 북마크 작성</router-link><br>
            <router-link to="/posts/0">IT</router-link>
            <router-link to="/posts/1">문화·독서</router-link>
            <router-link to="/posts/2">음악·미술</router-link>
            <router-link to="/posts/3">직장생활</router-link>
            <router-link to="/posts/4">여행</router-link>
            <router-link to="/posts/5">기타</router-link>
        </div>
        <!-- <p>
          <form @submit="signUp">
            <input name="name" type="text" v-model="name" >
            <input name="email" type="email" v-model="email">
            <input name="password" type="password" v-model="password">
            <input type="submit" value="signup" class="btn">
          </form>
        </p>
        <p>
          <form @submit="login">
            <input name="email" type="email" v-model="email">
            <input name="password" type="password" v-model="password">
            <input type="submit" value="login" class="btn">
          </form>
        </p> -->
    </header>
</template>

<script>
import axios from 'axios';
import store from '../../store/index.js'
import router from '../../router/index.js'

export default {
    name: "Header",
    data () {
      return {

      }
    },
    computed: {
      loggedIn() {
        if (store.getters.authorization == null) return false
        return true
      },
      userName() {
        if (store.getters.user != null) return store.state.user.user_name
      }
    },
    methods: {
      logout() {
        store.commit('logout')
        this.loggedIn = false
        if (this.$route.path !== "/") this.$router.push("/")
      },
      getUserInfo() {
        axios.get('http://localhost:8080/api/v1/user')
        .then(res => {
          console.log('getUserInfo at Header.vue, get response : ', res)
          var user = {
            user_id : res.data.user_id,
            user_name : res.data.user_name,
            email : res.data.email,
            }
          store.commit('userInfo', user)
          if (this.$route.path !== "/") this.$router.push("/")
          })
        .catch(err => alert(err));
      }
    },
    created() {
      let token = localStorage.getItem("jwt_token")
      // console.log('is authorization null?', token)
      if (token!=null) {
        store.commit('auth', token)
        axios.defaults.headers.common['authorization'] = token;
        this.getUserInfo()
      }
    },
    updated() {
      console.log('Header.vue updated')
    }
}
</script>

<style scoped>
    .header {
        background: #333;
        color: #fff;
        text-align: center;
        padding: 10px;
    }

    .header a {
        color: #fff;
        padding-right: 5px;
        text-decoration: none;
    }
</style>
