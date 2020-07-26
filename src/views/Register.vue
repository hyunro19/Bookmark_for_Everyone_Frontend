<template>
  <div class="register">
    <h1>회원가입</h1>
    <p>
      <form @submit="register">
        이메일(ID) <input name="email" type="email" v-model="email" placeholder="이메일">
        <button @click="checkEmailExists">이메일 중복 확인</button><br><br>
        닉네임 <input name="name" type="text" v-model="name" placeholder="닉네임">
        <button @click="checkNameExists">닉네임 중복 확인</button><br><br>
        비밀번호 <input @keyup="checkPasswordAvailability" name="password" type="password" v-model="password" placeholder="비밀번호">
        <span>{{password_availability_message}}</span><br><br>
        비밀번호 확인<input @keyup="checkPasswordConfirmity" name="password_confirm" type="password" v-model="password_confirm" placeholder="비밀번호 확인">
        <span>{{password_confirm_message}}</span><br><br>
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
            password_availability_message: '',
            password_confirm_message: '',
        }
    },
    methods: {
      getUserInfo() {
        axios.get('http://localhost:8080/api/v1/user')
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
            console.log('register response', res)
            var token = res.headers.authorization
            if(res.data.logged) {
              store.commit('auth', token)
              axios.defaults.headers.common['authorization'] = token;
              this.getUserInfo()
              alert("회원가입이 완료되었습니다.")
            } else {
              alert("회원가입이 실패하였습니다.\n다시 시도해주세요.")
            }
            if (this.$router.path !== "/") this.$router.push("/")
          })
          .catch(err => alert(err));
        },
        checkEmailExists(e) {
          e.preventDefault();
          axios.get('http://localhost:8080/api/v1/user?email='+this.email)
          .then(res => {
            if(res.data==false) {
              alert('사용할 수 있는 이메일입니다.')
            } else {
              alert('사용할 수 없는 이메일입니다.')
            }
            console.log('res', res)
          })
          .catch(err => alert(err));
        },
        checkNameExists(e) {
          e.preventDefault();
          axios.get('http://localhost:8080/api/v1/user?name='+this.name)
          .then(res => {
            if(res.data==false) {
              alert('사용할 수 있는 닉네임입니다.')
            } else {
              alert('사용할 수 없는 닉네임입니다.')
            }
            console.log('res', res)
          })
          .catch(err => alert(err));
        },
        checkPasswordAvailability() {
          this.password_availability_message = '사용가능'
        },
        checkPasswordConfirmity() {
          if (this.password == this.password_confirm) {
            this.password_confirm_message = '비밀번호 일치'
          } else {
            this.password_confirm_message = '비밀번호 불일치'
          }
        }
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
