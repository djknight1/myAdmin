<template>
  <div style="height: 100%;">
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from 'common/NavBar/NavBar'
export default {
  components: {
    NavBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  .container
    padding: 80px 0 0 120px
    .main-area
      min-height: 1024px
</style>
