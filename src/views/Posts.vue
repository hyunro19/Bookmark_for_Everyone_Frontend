<template>
  <div class="posts">
    <h3> {{$route.params.sort}} 입니다 </h3>
    <h1>Posts</h1>
    <div v-for="(post, index) in postsListResponseDto" v-bind:key="index" v-bind:value="post">{{post}}</div>
  </div>
</template>


<script>
import axios from 'axios';
import store from '../store/index.js'
import router from '../router/index.js'

export default {
  data () {
    return {
      postsListResponseDto : [],
    }
  },
  methods: {
    loadPosts() {
    axios.get('http://localhost:8080/api/v1/posts_list/'+this.$route.params.sort)
      .then(res => {
          console.log(res)
          this.postsListResponseDto = res.data
        }
      )
      .catch(err => alert(err));
    },
  },
  created () {
    console.log('created')
    this.loadPosts()
  },
  watch: {
    '$route' () {
    console.log('watcher')
      this.loadPosts()
    }
  },
  store,
  router,
  }
</script>
