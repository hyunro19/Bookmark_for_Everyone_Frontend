<template>
    <div class="thumbnail-wrapper">
      <!-- <div>{{posts.user_id}}</div> -->
      <div class="content-wrapper">
        <div class="topic-writer-wrapper">
          <span class="topic"> [ {{this.topics[parseInt(posts.topic)]}} ] </span>
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
</template>

<script>
export default {
    name: "ThumbNail",
    data() {
      return {
        topics: ['IT 트랜드', '문화·독서', '음악·미술', '직장생활', '여행','기타'],
      }
    },
    props: ["posts"],

    methods: {

    }
}
</script>

<style scoped>
  .thumbnail-wrapper {
    position:relative;
    margin: 20px;
    width: 400px;
    height: 150px;
    border:2px solid rgba(77, 77, 88, 0.36);
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
    margin-top:2px;
    width: 100%;
    font-size:1em;
    font-weight: bold;
    white-space:nowrap;
    overflow:hidden;
  }
  .description {
    height: 100%;
    font-size:0.9em;
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
  }
</style>
