<template>
  <div class="login">
    <h1>로그인</h1>
    <p>
      <form @submit="login">
        이메일(ID) <input name="email" type="email" v-model="email" placeholder="이메일"><br>
        비밀번호 <input name="password" type="password" v-model="password" placeholder="비밀번호"><br>
        <input type="submit" value="Login" class="btn-primary btn">
      </form>
    </p>
  </div>
</template>

<script>
import axios from 'axios';
import store from '../store/index.js'
import router from '../router/index.js'

export default {
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
      login(e) {
        e.preventDefault();
        if(this.email==null || this.email=='') {
          alert('이메일을 입력해주세요.')
          return
        } else if (this.password==null || this.password=='') {
          alert('비밀번호를 입력해주세요.')
        }
        const UserLoginRequestDto = {
          email: this.email,
          password: this.password,
        }
        axios.post('http://localhost:8080/api/v1/login',
          UserLoginRequestDto
          )
          .then(res => {
            console.log('res', res)
            if(res.data.logged) {
              var payload = {
              authorization : res.headers.authorization,
              user : {email:res.data.email, name:res.data.name}
              }
            store.commit('login', payload)
            console.log('login succeed', store.getters.authorization)
            router.push('/')
            } else {
              alert('이메일 또는 비밀번호가 틀렸습니다.')
            }
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
