<template>
  <div class="register">
    <h1>회원가입</h1>
    <p>
      <form @submit="register">
        이메일(ID) <input name="email" type="email" v-model="email" placeholder="example@gmail.com">
        <button @click="checkEmail" @keyup="emailChange">이메일 중복 확인</button><br><br>
        닉네임 <input name="name" type="text" v-model="name" placeholder="4-12자의 영문 또는 숫자">
        <button @click="checkName" @keyup="nameChange">닉네임 중복 확인</button><br><br>
        비밀번호 <input @keyup="checkPasswordAvailability" name="password" type="password" v-model="password" placeholder="비밀번호">
        <span>{{password_message}}</span><br><br>
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
          password_message: '6-14자의 영문 또는 숫자만 사용가능합니다.',
          password_confirm_message: '',
          email_availability: false,
          name_availability: false,
          password_availability: false,
          password_confirm_availability: false,
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
        if(!this.email_availability) {
          return alert('이메일 중복 확인을 해주세요.')
        } else if (!this.name_availability) {
          return alert('닉네임 중복 확인을 해주세요.')
        } else if (!this.password_availability || !this.password_confirm_availability) {
          return alert('비밀번호를 다시 확인해주세요.')
        }
        const userSaveRequestDto = {
          email: this.email,
          password: this.password,
          name: this.name,
        }
        axios.post('http://localhost:8080/api/v1/user', userSaveRequestDto)
          .then(res => {
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
        checkEmail(e) {
          e.preventDefault();
          var emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
          if(!emailRegex.test(this.email)) {
            alert('이메일 형식이 올바르지 않습니다.')
            return
          }
          axios.get('http://localhost:8080/api/v1/user/if_exists?email='+this.email)
          .then(res => {
            if(res.data==false) {
              this.email_availability = true;
              alert('사용할 수 있는 이메일입니다.')
            } else {
              alert('이미 사용 중인 이메일입니다.')
            }
          })
          .catch(err => alert(err));
        },
        checkName(e) {
          e.preventDefault();
          var nameRegex = /^[A-Za-z0-9]{4,12}$/
          if(!nameRegex.test(this.name)) {
            alert('닉네임 형식이 올바르지 않습니다.\n4-12자의 영문 또는 숫자만 사용가능합니다.')
            return
          }

          axios.get('http://localhost:8080/api/v1/user/if_exists?name='+this.name)
          .then(res => {
            if(res.data==false) {
              this.name_availability = true;
              alert('사용할 수 있는 닉네임입니다.')
            } else {
              alert('이미 사용 중인 닉네임입니다.')
            }
          })
          .catch(err => alert(err));
        },
        checkPasswordAvailability() {
          this.password_confirm = ''
          this.password_confirm_availability = false;
          var passwordRegex = /^[A-Za-z0-9]{6,14}$/
          if (passwordRegex.test(this.password)) {
            this.password_message = '사용가능한 비밀번호입니다.'
            this.password_availability = true
          } else {
            this.password_message = '6-14자의 영문 또는 숫자만 사용가능합니다.'
            this.password_availability = false
          }
        },
        checkPasswordConfirmity() {
          if (this.password == this.password_confirm) {
            this.password_confirm_message = '비밀번호가 일치합니다.'
            this.password_confirm_availability = true
          } else {
            this.password_confirm_message = '비밀번호가 일치하지 않습니다.'
            this.password_confirm_availability = false
          }
        },
        emailChange() {
          this.email_availability = false;
        },
        nameChange() {
          this.name_availability = false;
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
