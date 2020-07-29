<template>
  <div id="app">
  </div>
</template>

<script>

export default {
  name: 'Home',
  created() {
    this.$router.push("/posts/recent")
  }
}
</script>
