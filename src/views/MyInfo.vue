<template>
  <div class="myinfo">
    <h1>내 정보</h1>
    <p>
      <form>
        이메일(ID) <input name="email" type="email" v-model="email" placeholder="이메일" readonly><br><br>
        닉네임 <input name="name_new" type="text" v-model="name_new" placeholder="4-12자의 영문 또는 숫자">
        <button @click="checkName" @keyup="nameChange">닉네임 중복 확인</button><br><br>
        기존 비밀번호 <input name="password_old" type="password" v-model="password_old" placeholder="비밀번호"><br>
        새 비밀번호 <input @keyup="checkPasswordAvailability" name="password_new" type="password" v-model="password_new" placeholder="비밀번호">
        <span>{{password_new_message}}</span><br><br>
        새 비밀번호 확인<input @keyup="checkPasswordConfirmity" name="password_new_confirm" type="password" v-model="password_new_confirm" placeholder="비밀번호 확인">
        <span>{{password_new_confirm_message}}</span><br><br>

        <button @click='updateName' class="btn-primary btn">닉네임 변경</button>
        <button @click='updatePassword' class="btn-primary btn">비밀번호 변경</button><br>
        회원탈퇴기능 넣기 / 샘플계정은 변경못하도록 하기
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
          name_old: store.getters.user.user_name,
          name_new: store.getters.user.user_name,
          password_old: '',
          password_new: '',
          password_new_confirm: '',
          password_new_message: '6-14자의 영문 또는 숫자만 사용가능합니다.',
          password_new_confirm_message: '',
          name_new_availability: false,
          password_new_availability: false,
          password_new_confirm_availability: false,
        }
    },
    computed: {
      email() {
        return store.getters.user.email
      },
    },
    methods: {
      updateName(e) {
        e.preventDefault()
        if(!this.name_new_availability) {
          return alert('닉네임 중복 확인을 해주세요.')
        }
        if(this.password_old=='') {
          return alert('기존 비밀번호를 입력해주세요.')
        }
        const userUpdateRequestDto = {
          email: this.email,
          name_new: this.name_new,
          password_old: this.password_old,
        }
        axios.put('http://localhost:8080/api/v1/user',
          userUpdateRequestDto
          )
          .then(res => {
            console.log('updateName response : ', res)
            location.reload()
            alert('닉네임이 변경되었습니다.')
          })
          .catch(err => {
            alert(err)
            });
        },
      updatePassword(e) {
        e.preventDefault()
        const userUpdateRequestDto = {
          email: this.email,
          password_old: this.password_old,
          password_new: this.password_new,
        }
        axios.put('http://localhost:8080/api/v1/user',
          userUpdateRequestDto
          )
          .then(res => {
            location.reload()
            alert('비밀번호가 변경되었습니다.')
          })
          .catch(err => alert(err));
        },
      checkName(e) {
        e.preventDefault();
        if(this.name_old==this.name_new) {
          return alert('기존과 동일한 닉네임입니다.')
        }

        var nameRegex = /^[A-Za-z0-9]{4,12}$/
        if(!nameRegex.test(this.name_new)) {
          return alert('닉네임 형식이 올바르지 않습니다.\n4-12자의 영문 또는 숫자만 사용가능합니다.')
        }

        axios.get('http://localhost:8080/api/v1/user/if_exists?name='+this.name)
        .then(res => {
          if(res.data==false) {
            this.name_new_availability = true;
            alert('사용할 수 있는 닉네임입니다.')
          } else {
            alert('이미 사용 중인 닉네임입니다.')
          }
        })
        .catch(err => alert(err));
      },
      nameChange() {
        this.name_new_availability = false;
      },
      checkPasswordAvailability() {
        this.password_new_confirm = ''
        this.password_new_confirm_availability = false;
        var passwordRegex = /^[A-Za-z0-9]{6,14}$/
        if (passwordRegex.test(this.password_new)) {
          this.password_new_message = '사용가능한 비밀번호입니다.'
          this.password_new_availability = true
        } else {
          this.password_new_message = '6-14자의 영문 또는 숫자만 사용가능합니다.'
          this.password_new_availability = false
        }
      },
      checkPasswordConfirmity() {
        if (this.password_new == this.password_new_confirm) {
          this.password_new_confirm_message = '비밀번호가 일치합니다.'
          this.password_new_confirm_availability = true
        } else {
          this.password_new_confirm_message = '비밀번호가 일치하지 않습니다.'
          this.password_new_confirm_availability = false
        }
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
