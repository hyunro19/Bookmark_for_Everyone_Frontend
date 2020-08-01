<template>
    <header class="header">
        <div v-if="loggedIn" class="top-nav">
            <router-link to="/myinfo">{{userName}}님</router-link>|
            <a href="#" @click='logout'> 로그아웃</a>
        </div>
        <div v-else class="top-nav">
            <router-link to="/register">회원가입</router-link>|
            <router-link to="/login"> 로그인</router-link>
        </div>
        <router-link to="/posts/recent"><h1 class="title">모두의 북마크</h1></router-link><br>
        <div v-if="loggedIn" class="mid-nav">
            <router-link v-bind:class="[(menu_now=='recent') ? 'menu-now' : 'menu']" to="/posts/recent">최신 북마크</router-link>
            <router-link v-bind:class="[(menu_now=='my') ? 'menu-now' : 'menu']" to="/posts/my">나의 북마크</router-link>
            <router-link v-bind:class="[(this.$route.path=='/newpost') ? 'menu-now' : 'menu']" to="/newpost">새 북마크 작성</router-link><br>
        </div>
        <div class="btm-nav">
            <router-link v-bind:class="[(menu_now==idx) ? 'menu-now' : 'menu']" v-for="(topic, idx) in topics" v-bind:key="idx" v-bind:to="'/posts/'+idx">{{topic}}</router-link>
        </div>
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
        topics: store.getters.topics,
        menu_now: this.$route.params.sort,
        loggedIn: false,
        userName: 'TEST',
      }
    },
    methods: {
      isLoggedIn() {
        if (store.getters.authorization==null || store.getters.authorization=='') {
          this.loggedIn = false
        } else {
          this.loggedIn = true;
          if (store.getters.user != null) this.userName = store.state.user.user_name
        }
      },
      logout() {
        store.commit('logout')
        this.loggedIn = false
        if (this.$route.path !== "/") this.$router.push("/")
      },
    },
    created() {
      let token = localStorage.getItem("jwt_token")
      if (token!=null) {
        store.commit('auth', token)
        axios.defaults.headers.common['authorization'] = token;
        store.commit('userInfo')
      }
      this.isLoggedIn()
    },
    watch: {
      '$route' () {
      this.menu_now= this.$route.params.sort
      this.isLoggedIn()
      }
    },
}
</script>

<style scoped>
  body {
    min-width:420px;
  }
  .header {
    min-width: 420px;
    background: #333;
    color: #EEE;
    text-align: center;
    padding: 10px;
  }
  .top-nav > a {
    color: #EEE;
    padding-right: 5px;
    text-decoration: none;
  }

  .top-nav {
    font-family: 'Noto Sans KR', sans-serif;
    text-align: center;
    font-size:0.9em;
    text-align:right;
    color: #EEE;
    /* padding-right: 5px; */
    text-decoration: none;
  }
  .title {
    font-family: 'Gugi', cursive;
    font-size: 4em;
    margin: 0 0 15px 0;
    color: #EEE;
    text-decoration: none;
    display:inline-block;
    position:relative;
  }
  .mid-nav {
    margin-top: 5px;
    font-family: 'Noto Sans KR', sans-serif;
    text-align: center;
  }
  .mid-nav > a, .btm-nav > a {
    padding: 5px 10px 6px 10px;
    margin: 0 3px 0 3px;
  }
  .btm-nav {
    font-family: 'Noto Sans KR', sans-serif;
    padding: 0px 10px 0px 10px;
    text-align: center;
    margin: 5px 0 0 0;
  }

  .menu {
    display: inline-block;
    overflow: hidden;
    margin: 0 2px;
    padding: 7px 7px 6px;
    border: 1px solid #EEE;
    border-radius: 5px;
    font-size: 15px;
    line-height: 18px;
    color: #EEE;
    text-decoration: none;
  }
  .menu:hover {
    font-weight: bold;
    text-decoration: none;
  }
  .menu-now {
    color: rgb(62, 62, 62);
    margin-top: 10px;
    display: inline-block;
    overflow: hidden;
    margin: 0 2px;
    padding: 7px 7px 6px;
    border: 1px solid #EEE;
    border-radius: 5px;
    background-color: #EEE;
    font-size: 15px;
    line-height: 18px;
    text-decoration: none;
    font-weight:bold;
  }
</style>
