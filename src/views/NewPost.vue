<template>
  <div class="newpost">
    <h3>새 북마크 작성</h3><br>
    <div>미리보기</div>
    <ThumbNail v-bind:posts="this.posts"/><br>
    <form class="form" @submit="uploadPosts">
      <div class="input-wrapper">
        <div class="label">닉네임</div>
        <input class="input-text text-secondary" name="name" type="text" v-model="posts.user_name" readonly>
      </div>
      <div class="input-wrapper">
        <div class="label">주제</div>
        <select class="input-text" v-model="posts.topic">
          <option disabled value="주제" selected>주제</option>
          <option v-for="(topic, idx) in topics" v-bind:value="idx" v-bind:key="idx">{{ topic }}</option>
        </select>
      </div>
      <div class="input-wrapper">
        <div class="label">URL</div>
        <input class="input-text" @change="length_of_src_url" @keyup="length_of_src_url" @blur="getOG" name="src_url" type="text" v-model="posts.src_url" placeholder="URL" maxlength="500">
        <div class="length-check">{{this.src_url_length}}/500</div>
      </div>
      <div class="input-wrapper">
        <div class="label">제목</div>
        <input class="input-text" @change="length_of_src_title" @keyup="length_of_src_title" name="src_title" type="text" v-model="posts.src_title" placeholder="북마크 타이틀" maxlength="50">
        <div class="length-check">{{this.src_title_length}}/ 50</div>
      </div>
      <div class="input-wrapper">
        <div class="label">내용</div>
        <textarea class="input-text input-description" @change="length_of_src_description" @keyup="length_of_src_description" name="src_description" v-model="posts.src_description" placeholder="북마크에 대한 간단한 설명" maxlength="200"/>
        <div class="length-check">{{this.src_description_length}}/200</div>
      </div>
      <input type="submit" value=" UPLOAD " class="btn-primary btn">
    </form>

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
    return {
      posts: {
        user_id: store.getters.user.user_id,
        user_name: store.getters.user.user_name,
        topic: '주제',
        src_url: 'https://www.BookmarkForEveryone.com',
        src_title: '북마크 타이틀',
        src_description: '북마크에 대한 간단한 설명',
        src_img: 'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/book_bookmark.png',
      },
      src_url_length: 0,
      src_title_length: 0,
      src_description_length: 0,
      topics: store.getters.topics,
    }
  },
  methods: {
    uploadPosts(e) {
      e.preventDefault()
      if(this.posts.topic=='주제' || this.posts.topic==null) {
        return alert('주제를 선택해주세요.')
      }
      if(this.posts.src_url=='') {
        return alert('url을 입력해주세요.')
      }
      if(this.posts.src_title=='') {
        return alert('제목을 입력해주세요.')
      }
      if(this.posts.src_description=='') {
        return alert('내용을 입력해주세요.')
      }
      var postsSaveRequestDto = {
        user_id: store.getters.user.user_id,
        user_name: store.getters.user.user_name,
        topic: this.posts.topic,
        src_url: this.posts.src_url,
        src_title: this.posts.src_title,
        src_description: this.posts.src_description,
        src_img: this.posts.src_img,
      }
      axios.post(store.getters.server+'/api/v1/posts', postsSaveRequestDto)
      .then(res => {
          if (this.$route.path !== "/") this.$router.push("/")
        }
      )
      .catch(err => console.log(err));
    },
    getOG(e) {
      e.preventDefault()
      axios.get(store.getters.server+'/api/v1/posts_url?src_url='+this.posts.src_url)
      .then(res => {
        this.posts.src_url = res.data.src_url
        this.posts.src_title = res.data.src_title
        this.posts.src_description = res.data.src_description
        this.posts.src_img = res.data.src_img
      })
      .catch(err => {
        console.log(err)
        alert('url을 다시 확인해주세요.')}
        );
    },
    length_of_src_url() {
      this.src_url_length = this.posts.src_url.length
    },
    length_of_src_title() {
      this.src_title_length = this.posts.src_title.length
    },
    length_of_src_description() {
      this.src_description_length = this.posts.src_description.length
    },
  },
  store,
  router,
}
</script>

<style scoped>
  .newpost {
    display: inline-block;
    width:400px;
    min-height:800px;
    font-family: 'Noto Sans KR', sans-serif;
    padding: 20px 10px 30px 10px;
    font-size: 0.9em;
  }
  .form {
    padding-left:10px;
  }
  .input-wrapper {
    display:inline-block;
    width:400px;
    margin-bottom: 10px;
  }
  .label {
    float:left;
    display:inline-block;
    padding-right: 10px;
    text-align: right;
    width: 50px;
  }
  .input-text {
    float:left;
    margin-right:10px;
    width:335px;
  }
  .length-check {
    color: rgb(62, 62, 62);
    font-size:0.85em;
    text-align:right;
    padding-right:20px;
  }
  .input-url {

  }
  .input-title {

  }
  .input-description {
    height: 200px;
    resize: none;
  }
</style>
