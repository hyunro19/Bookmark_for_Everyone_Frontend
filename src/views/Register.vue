<template>
  <div class="register">
    <h1>회원가입</h1>
    <p>
      <form @submit="register">
        이메일(ID) <input name="email" type="email" v-model="email" placeholder="이메일"><br>
        비밀번호 <input name="password" type="password" v-model="password" placeholder="비밀번호"><br>
        비밀번호 확인<input name="password_confirm" type="password" v-model="password_confirm" placeholder="비밀번호 확인"><br>
        닉네임 <input name="name" type="text" v-model="name" placeholder="닉네임"><br>
        <input type="submit" value="Register" class="btn-primary btn">
      </form>
    </p>
    <span>닉네임, 이메일 중복체크, 비밀번호 유효성체크</span>
  </div>
</template>

<script>
import axios from 'axios';
import store from '../store/index.js'
import router from '../router/index.js'

export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            password_confirm: '',
        }
    },
    methods: {
      register(e) {
        e.preventDefault();
        const userSaveRequestDto = {
          email: this.email,
          password: this.password,
          name: this.name,
        }
        axios.post('http://localhost:8080/api/v1/user',
          userSaveRequestDto
          )
          .then(res => {
            var payload = {
              jwt_token : res.headers.jwt_token,
              user : res.data.data
            }
            store.commit('login', payload)
            router.push('/')
          })
          .catch(err => alert(err));
        },
    },
    store,
    router,
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
