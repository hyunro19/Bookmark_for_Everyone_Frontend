<template>
  <a v-bind:href=posts.src_url target="_sub">
    <div class="thumbnail-wrapper">

      <!-- <div>{{posts.user_id}}</div> -->
      <div class="content-wrapper">

        <div class="topic-writer-wrapper">
          <span class="topic"> [ {{this.topics[parseInt(posts.topic)]==null? '주제':this.topics[parseInt(posts.topic)]}} ] </span>
          <span class="writer-wrapper">
            <span class="writer-label">by</span>
            <span class="writer">{{ posts.user_name}}</span>
          </span>
        </div>
        <div class="title">{{posts.src_title}}</div>
        <div class="description">{{posts.src_description}}</div>
        <div class="url">{{posts.src_url}}</div>
      </div>
      <div class="img-wrapper">
        <img class="src-img" v-bind:src=posts.src_img>
        <img v-if="isMy" class="delete-icon" @click='delete_posts' src="/src/assets/delete-icon.png">
      </div>
    </div>
  </a>
</template>

<script>
import axios from 'axios'
import store from '../store/index.js'
import router from '../router/index.js'

export default {
    name: "ThumbNail",
    data() {
      return {
        topics: store.getters.topics,
        isMy: this.$route.path=='/posts/my'
      }
    },
    props: ["posts"],

    methods: {
      delete_posts(e) {
        e.preventDefault() // 뒷쪽에 있는
        alert('삭제')
        axios.delete(state.server+'/api/v1/posts/'+this.posts.id)
          .then(res => {
            alert('북마크가 삭제되었습니다.')
            })
          .catch(err => console.log(err));
      }
    },
    watch: {
    '$route' () {
      this.isMy = this.$route.path=='/posts/my'
    }
  },
}
</script>

<style scoped>
  a:link {
    color: black;
    text-decoration: none;
  }
  a:visited {
    color: black;
    text-decoration: none;
  }
  a:hover {
    color: black;
    text-decoration: none;
  }
  .thumbnail-wrapper {
    display:inline-block;
    position:relative;
    margin: 10px 5px 10px 5px;
    width: 400px;
    height: 150px;
    border: 1px solid rgba(55, 53, 47, 0.16);
    border-radius: 10px;
  }
  .content-wrapper {
    position:relative;
    padding: 5px 10px 5px 10px;
    text-align: left;
    width: 62.5%;
    height: 100%;
    float: left;
  }
  .img-wrapper {
    position: relative;
    padding: 3px;
    width: 37.5%;
    height: 100%;
    float: right;
    overflow:hidden;
  }
  .topic-writer-wrapper {
    font-size:0.9em;
  }
  .topic {
    font-style:bold;
    color:grey;
  }

  .writer-wrapper {
    float:right;
  }
  .writer-label{
    font-style:italic;
    color:grey;
    margin-right:2px;
  }
  .writer{
    font-weight: bold;
    color:grey;
  }

  .title {
    font-weight: bold;
    margin-top:5px;
    margin-bottom:3px;
    width: 100%;
    font-size:0.9em;
    white-space:nowrap;
    overflow:hidden;
  }
  .description {
    color:grey;
    height: 100%;
    font-size:0.85em;
    white-space: normal;
    line-height: 1.5;
    height: 6em;
    overflow:hidden;
  }
  .url {
    color: rgb(62, 62, 62);
    font-size:0.8em;
    overflow:hidden;
    position:absolute;
    bottom:5px;
    width: 100%;
  }
  .src-img {
    max-height: 100%;
    width: auto;
    border: 1px solid rgba(55, 53, 47, 0);
    border-radius: 10px;
    position: absolute;
    top: -9999px;
    left: -9999px;
    right: -9999px;
    bottom: -9999px;
    margin: auto;
  }
  .delete-icon {
    width: 15px;
    height: 15px;
    position: absolute;
    right: 10px;
    top: 10px;
  }
</style>
