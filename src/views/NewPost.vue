<template>
  <div class="newpost">
    <h1>NewPost</h1>
    <form @submit="uploadPosts">
      USER ID <input name="user_id" type="text" v-model="posts.user_id" readonly><br><br>
      닉네임 <input name="name" type="text" v-model="posts.user_name" readonly><br><br>
      주제 <select v-model="posts.topic">
        <option disabled value="주제">주제</option>
        <option v-for="(topic, idx) in topics" v-bind:value="idx" v-bind:key="idx">{{ topic }}</option>
      </select><br><br>
      URL <input @blur="getOG" name="src_url" type="text" v-model="posts.src_url" placeholder="URL"><br><br>
      제목 <input name="src_title" type="text" v-model="posts.src_title" placeholder="제목"><br><br>
      내용 <textarea name="src_description" v-model="posts.src_description" placeholder="내용"/><br><br>
      <input type="submit" value="UPLOAD" class="btn-primary btn">
    </form>
    미리보기<br>
    <ThumbNail v-bind:posts="this.posts"/><br>
    <!-- {{src_title}}<br>
    {{src_description}}<br>
    <img v-bind:src="src_img" width="200" height="200"> -->
  </div>
</template>

<script>
import axios from 'axios'
import store from '../store/index.js'
import router from '../router/index.js'
import ThumbNail from  '../components/ThumbNail.vue'

export default {
  components: {
    ThumbNail
  },
  data () {
    console.log('newpost', store.getters.user)
    return {
      posts: {
        user_id: store.getters.user.user_id,
        user_name: store.getters.user.user_name,
        topic: '주제',
        src_url: 'https://www.BookmarkForEveryone.com',
        src_title: 'Title',
        src_description: 'Description',
        src_img: 'https://simpleicon.com/wp-content/uploads/bookmark.png',
      },
      topics: ['IT 트랜드', '문화·독서', '음악·미술', '직장생활', '여행','기타'],
    }
  },
  methods: {
    uploadPosts(e) {
      e.preventDefault()
      var postsSaveRequestDto = {
        user_id: store.getters.user.user_id,
        user_name: store.getters.user.user_name,
        topic: this.posts.topic,
        src_url: this.posts.src_url,
        src_title: this.posts.src_title,
        src_description: this.posts.src_description,
        src_img: this.posts.src_img,
      }
      axios.post('http://localhost:8080/api/v1/posts', postsSaveRequestDto)
      .then(res => {
          console.log('uploadPosts succeed', res)
          if (this.$route.path !== "/") this.$router.push("/")
        }
      )
      .catch(err => alert(err));
    },
    getOG(e) {
      e.preventDefault()
      axios.get('http://localhost:8080/api/v1/posts_url?src_url='+this.posts.src_url)
      .then(res => {
        console.log('PostsUrlResponseDto', res)
        this.posts.src_url = res.data.src_url
        this.posts.src_title = res.data.src_title
        this.posts.src_description = res.data.src_description
        this.posts.src_img = res.data.src_img
        console.log(this.posts)
      })
      .catch(err => {
        console.log(err)
        alert('url을 다시 확인해주세요.')}
        );
    }
  },
  store,
  router,
  // beforeCreate () {
  //   console.log('beforeCreate : user :', store.getters.user)
  // },
}
</script>
