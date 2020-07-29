<template>
  <a v-bind:href=posts.src_url target="_sub">
    <div class="thumbnail-wrapper">
      <!-- <div>{{posts.user_id}}</div> -->
      <div class="content-wrapper">

        <div class="topic-writer-wrapper">
          <span class="topic"> [ {{this.topics[parseInt(posts.topic)]==null? '주제':this.topics[parseInt(posts.topic)]}} ] </span>
          <span class="writer-wrapper">
            <span class="writer-label">by </span>
            <span class="writer"> {{posts.user_name}}</span>
          </span>
        </div>
        <div class="title">{{posts.src_title}}</div>
        <div class="description">{{posts.src_description}}</div>
        <div class="url">{{posts.src_url}}</div>
      </div>
      <div class="img-wrapper">
        <img class="src-img" v-bind:src=posts.src_img>
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
      }
    },
    props: ["posts"],

    methods: {

    }
}
</script>

<style scoped>
  a:link { color: black; text-decoration: none;}
  a:visited { color: black; text-decoration: none;}
  a:hover { color: black; text-decoration: none;;}
  /* div:link { color: red; text-decoration: none;}
  div:visited { color: black; text-decoration: none;}
  div:hover { color: blue; text-decoration: underline;} */

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
    padding: 3px;
    width: 37.5%;
    height: 100%;
    float: right;
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
  }
  .writer{
    font-weight: bold;
    color:grey;
  }

  .title {
    font-weight: bold;
    margin-top:5px;
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
    height: 4.5em;
    overflow:hidden;
  }
  .url {
    font-size:0.8em;
    overflow:hidden;
    position:absolute;
    bottom:5px;
    width: 100%;
  }
  .src-img {
    margin: 0 0;
    width: 100%;
    height: 100%;
    border: 1px solid rgba(55, 53, 47, 0);
    border-radius: 5px;
  }
</style>
