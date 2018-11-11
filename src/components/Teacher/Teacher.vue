<template>
  <div style="height: 100%;">
    <!-- v-if $route.fullpath.indexof('nameOfFatherRouter') > 0  -->
    <tnav-bar></tnav-bar>
  </div>
</template>

<script>
import TnavBar from 'common/TeacherNavBar/TnavBar.vue'
export default {
  components: {
    TnavBar
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
