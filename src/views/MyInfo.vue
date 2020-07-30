<template>
  <div class="myinfo">
    <h3>내 정보</h3><br><br>

    <form>
      <div class="input-wrapper">
        <div class="label">이메일(ID)</div>
        <input class="input-text" name="email" type="email" v-model="email" placeholder="이메일" readonly>
      </div>
      <div class="input-wrapper" style="margin-bottom:40px;">
        <div class="label">기존 비밀번호</div>
        <input class="input-text" name="password_old" type="password" v-model="password_old" placeholder="기존 비밀번호">
      </div>
      <div class="input-wrapper">
        <div class="label">닉네임</div>
        <input class="input-text" name="name_new" type="text" v-model="name_new" placeholder="4-12자의 영문 또는 숫자">
        <button class="btn btn-secondary btn-check-custom" @click="checkName" @keyup="nameChange">닉네임 중복 확인</button>
      </div>
      <input class="btn-primary btn" @click='updateName' type="button"  value=" 닉네임 변경 " style="margin-bottom:40px;">

      <div class="input-wrapper">
        <div class="label">새 비밀번호</div>
      <input class="input-text" @keyup="checkPasswordAvailability" name="password_new" type="password" v-model="password_new" placeholder="새 비밀번호">
      <div class="msg" v-bind:class="[password_new_availability ? 'text-success' : 'text-danger']">{{password_new_message}}</div>
      </div>
      <div class="input-wrapper">
        <div class="label">새 비밀번호 확인</div>
        <input class="input-text" @keyup="checkPasswordConfirmity" name="password_new_confirm" type="password" v-model="password_new_confirm" placeholder="새 비밀번호 확인">
      <div class="msg" v-bind:class="[password_new_confirm_availability ? 'text-success' : 'text-danger']">{{password_new_confirm_message}}</div>
      </div>
      <input class="btn-primary btn" @click='updatePassword' type="button"  value="비밀번호 변경">

      <br><br><br>샘플계정은 변경못하도록 하기
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
        var passwordRegex = /^[A-Za-z0-9]{6,14}$/
        if (!passwordRegex.test(this.password_old)) {
          return alert('기존 비밀번호를 다시 확인해주세요.')
        }
        const userUpdateRequestDto = {
          email: this.email,
          name_new: this.name_new,
          password_old: this.password_old,
        }
        axios.put(store.getters.server+'/api/v1/user',
          userUpdateRequestDto
          )
          .then(res => {
            console.log('updateName response : ', res)
            location.reload()
            alert('닉네임이 변경되었습니다.')
          })
          .catch(err => {
            console.log(err)
            alert('비밀번호가 올바르지 않습니다.')
            });
        },
      updatePassword(e) {
        e.preventDefault()
        if(!this.password_new_availability) {
          return alert('새 비밀번호 양식이 올바르지 않습니다.')
        }
        if(!this.password_new_confirm_availability) {
          return alert('새 비밀번호를 다시 확인해주세요.')
        }
        if(this.password_old=='') {
          return alert('기존 비밀번호를 입력해주세요.')
        }
        var passwordRegex = /^[A-Za-z0-9]{6,14}$/
        if (!passwordRegex.test(this.password_old)) {
          return alert('기존 비밀번호를 다시 확인해주세요.')
        }
        const userUpdateRequestDto = {
          email: this.email,
          password_old: this.password_old,
          password_new: this.password_new,
        }
        axios.put(store.getters.server+'/api/v1/user',
          userUpdateRequestDto
          )
          .then(res => {
            location.reload()
            alert('비밀번호가 변경되었습니다.')
          })
          .catch(err => console.log(err));
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

        axios.get(store.getters.server+'/api/v1/user/if_exists?name='+this.name)
        .then(res => {
          if(res.data==false) {
            this.name_new_availability = true;
            alert('사용할 수 있는 닉네임입니다.')
          } else {
            alert('이미 사용 중인 닉네임입니다.')
          }
        })
        .catch(err => console.log(err));
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
  .myinfo {
    display: inline-block;
    max-width: 600px;
    min-width: 400px;
    font-family: 'Noto Sans KR', sans-serif;
    padding: 20px 10px 30px 10px;
    font-size: 0.9em;
  }
  .input-wrapper {
    display:inline-block;
    width:500px;
    margin-bottom: 10px;
  }
  .label {
    float:left;
    display:inline-block;
    padding-right: 10px;
    text-align: right;
    width: 110px;
  }
  .input-text {
    float:left;
    margin-right:10px;
    width:250px;
  }
  .msg {
    display:inline-block;
    width:500px;
    text-align:left;
    font-size: 0.85em;
    padding-left: 110px;
    margin-top: -20px;
  }
  .msg-warning {
    font-size: 0.85em;
    color:rgb(187, 5, 5)
  }
  .btn-check-custom {
    float:left;
    font-size: 0.9em;
    margin-top: -1px;
    padding: 4px 10px 4px 10px;
  }
</style>
