<template>
  <el-container>
    <el-main>
      <question-box></question-box>
    </el-main>
  </el-container>
</template>

<script>
import questionBox from 'base/questionBox/questionBox'
import navBar from 'common/NavBar/NavBar.vue'
export default {
  components: {
    questionBox,
    navBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>

</style>
