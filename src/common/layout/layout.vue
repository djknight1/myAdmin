<!-- layout作为整个页面的骨架 -->
<template>
  <div class="web-view">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container" :style="style">
      <nav-bar></nav-bar>
      <tags></tags>
      <main-view class="main-view"></main-view>
    </div>
  </div>
</template>

<script>
import MainView from './subComponents/MainView'
import Sidebar from './subComponents/Sidebar/Sidebar'
import NavBar from './subComponents/Navbar'
import Tags from './subComponents/Tags'
import { mapGetters } from 'vuex'
export default {
  name: 'layout',
  computed: {
    style () {
      if (this.isCollapse) {
        return `margin-left: 50px`
      } else {
        return ''
      }
    },
    ...mapGetters([
      'isCollapse'
    ])
  },
  components: {
    MainView,
    Sidebar,
    NavBar,
    Tags
  }
}
</script>

<style lang="stylus" scoped>
.main-container
  margin-left: 180px
  transition: margin-left .28s
</style>
