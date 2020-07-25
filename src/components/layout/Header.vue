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
            <router-link to="/posts">최신 글</router-link> |
            <span>주제별</span>
            <router-link to="/posts">여행</router-link>
            <router-link to="/posts">IT</router-link>
            <router-link to="/posts">직장생활</router-link>
            <router-link to="/posts">문화·독서</router-link>
            <router-link to="/posts">음악·미술</router-link>
            <router-link to="/posts">기타</router-link> |
            <router-link to="/posts">내가 쓴 글</router-link>
            <router-link to="/newpost">새 글 쓰기</router-link>
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
    computed: {
      loggedIn() {
        if (store.state.authorization == null) return false
        return true
      },
      userName() {
        if (store.state.user != null) return store.state.user.name
      }
    },
    methods: {
      logout() {
        store.commit('logout')
        loggedIn = false
        router.push('/')
      }
    },
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
