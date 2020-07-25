<template>
  <div class="posts">
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
  beforeCreate () {
    console.log('beforeCreate', store.getters.authorization)
    axios.get('http://localhost:8080/api/v1/posts')
      .then(res => {
          console.log(res)
          this.postsListResponseDto = res.data
        }
      )
      .catch(err => alert(err));
    },
  store,
  router,
  }
</script>
