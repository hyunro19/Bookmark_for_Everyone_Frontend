<template>
  <div class="posts">
    <ThumbNail v-bind:posts="post" v-for="(post, idx) in postsListResponseDto" v-bind:key="idx"/>
    <!-- <div v-for="(post, index) in postsListResponseDto" v-bind:key="index" v-bind:value="post"/> -->
  </div>
</template>


<script>
import axios from 'axios';
import store from '../store/index.js'
import router from '../router/index.js'
import ThumbNail from  '../components/ThumbNail.vue'

export default {
  components: {
    ThumbNail
  },
  data () {
    return {
      topics: store.getters.topics,
      postsListResponseDto : [],
    }
  },
  methods: {
    loadPosts() {
    axios.get(store.getters.server+'/api/v1/posts_list/'+this.$route.params.sort)
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
<style scoped>
  .posts {
    padding: 20px 10px 30px 10px;
  }
</style>
