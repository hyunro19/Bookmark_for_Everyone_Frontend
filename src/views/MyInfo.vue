<template>
  <div class="myinfo">
    <h1>내 정보</h1>
    <p>
      <form>
        이메일(ID) <input name="email" type="email" v-model="email" placeholder="이메일" readonly><br><br>
        기존 비밀번호 <input name="password_old" type="password" v-model="password_old" placeholder="비밀번호"><br>
        새 비밀번호 <input name="password_new" type="password" v-model="password_new" placeholder="비밀번호"><br>
        새 비밀번호 확인<input name="password_new_confirm" type="password" v-model="password_new_confirm" placeholder="비밀번호 확인"><br><br>

        닉네임 <input name="name_new" type="text" v-model="name" placeholder="닉네임"><br><br>
        <button @click='updateName' class="btn-primary btn">닉네임 변경</button><br>
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
          password_old: '',
          password_new: '',
          password_new_confirm: '',
        }
    },
    computed: {
      email() {
        return store.state.user.email
      },
      name() {
        return store.state.user.name
      }
    },
    methods: {
      updateName() {
        const userUpdateRequestDto = {
          email: this.email,
          name_new: this.name,
          password_old: this.password_old,
        }
        axios.put('http://localhost:8080/api/v1/user',
          userUpdateRequestDto
          )
          .then(res => {
            console.log('updateName', res)
            alert('회원 정보 변경 완료')
          })
          .catch(err => alert(err));
        },
      updatePassword() {
        const userUpdateRequestDto = {
          email: this.email,
          password_old: this.password_old,
          password_new: this.password_new,
        }
        axios.put('http://localhost:8080/api/v1/user',
          userUpdateRequestDto
          )
          .then(res => {
            console.log('updatePassword', res)
            alert('회원 정보 변경 완료')
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
