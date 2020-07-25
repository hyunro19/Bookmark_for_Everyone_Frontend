<template>
  <div class="newpost">
    <h1>NewPost</h1>
    <form @submit="uploadPosts">
      USER ID <input name="user_id" type="text" v-model="postsSaveRequestDto.user_id" readonly><br><br>
      닉네임 <input name="name" type="text" v-model="postsSaveRequestDto.user_name" readonly><br><br>
      주제 <select v-model="postsSaveRequestDto.topic">
        <option disabled value="">주제</option>
        <option v-for="(topic, key) in topics" v-bind:value="topic" v-bind:key="topic">{{ topic }}</option>
      </select><br><br>
      URL <input name="src_url" type="text" v-model="postsSaveRequestDto.src_url" placeholder="URL"><br><br>
      제목 <input name="src_title" type="text" v-model="postsSaveRequestDto.src_title" placeholder="제목"><br><br>
      내용 <textarea name="src_description" v-model="postsSaveRequestDto.src_description" placeholder="내용"/><br><br>
      <input type="submit" value="UPLOAD" class="btn-primary btn">
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import store from '../store/index.js'
import router from '../router/index.js'

export default {
  data () {
    return {
      postsSaveRequestDto : {
        user_id: store.getters.user.user_id,
        user_name: store.getters.user.name,
        topic: '',
        src_url: '',
        src_title: '',
        src_description: '',
      },
      topics: ['정치', '경제', '사회', '문화'],
    }
  },
  methods: {
    uploadPosts(e) {
      console.log('uploadPosts method called', this.postsSaveRequestDto)
      e.preventDefault()
      axios.post('http://localhost:8080/api/v1/posts', this.postsSaveRequestDto)
      .then(res => {
          console.log('uploadPosts succeed', res)
          router.push('/')
        }
      )
      .catch(err => alert(err));
    },
  },
  store,
  router,
  // beforeCreate () {
  //   console.log('beforeCreate : user :', store.getters.user)
  // },
}
</script>
