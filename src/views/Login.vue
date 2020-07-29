<template>
  <div class="login">
    <h3>로그인</h3><br><br>
    <form @submit="login">
      <div class="input-wrapper">
      <div class="label">이메일(ID)</div>
      <input class="input-text" name="email" type="email" v-model="email" placeholder="이메일">
      </div>
      <div class="input-wrapper">
      <div class="label">비밀번호</div>
      <input class="input-text" name="password" type="password" v-model="password" placeholder="비밀번호">
      </div>
      <div>
        <input type="submit" value="    Login    " class="btn-primary btn">
      </div>
    </form>
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
      getUserInfo() {
        axios.get(store.getters.server+'/api/v1/user')
        .then(res => {
          console.log('getUserInfo at Login.vue, get response : ', res)
          var user = {
            user_id : res.data.user_id,
            user_name : res.data.user_name,
            email : res.data.email,
            }
          store.commit('userInfo', user)
          if (this.$route.path !== "/") this.$router.push("/")
          })
        .catch(err => alert(err));
      },
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
        axios.post(store.getters.server+'/api/v1/login',
          UserLoginRequestDto
          )
          .then(res => {
            console.log('login response', res)
            var token = res.headers.authorization
            if(res.data.logged) {
              store.commit('auth', token)
              axios.defaults.headers.common['authorization'] = token;
              this.getUserInfo()
            } else {
              alert('이메일 또는 비밀번호가 틀렸습니다.')
              this.email = ''
              this.password = ''
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
  .login {
    display: inline-block;
    width:400px;
    font-family: 'Noto Sans KR', sans-serif;
    padding: 20px 10px 30px 10px;
    font-size: 0.9em;
  }
  .input-wrapper {
    display:inline-block;
    width:400px;
    margin-bottom: 20px;
  }
  .label {
    float:left;
    display:inline-block;
    padding-right: 10px;
    text-align: right;
    width: 100px;
  }
  .input-text {
    float:left;
    margin-right:10px;
    width:250px;
  }
</style>
