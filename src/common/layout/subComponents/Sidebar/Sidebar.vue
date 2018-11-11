<template>
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      class="el-menu"
      ref="elMenu"
      router
      :collapse="isCollapse"
      background-color="#008784"
      text-color="#fff"
      active-text-color="#ffd04b">
      <nav-item v-for="route in ExtraRouter"
                :key="route.name"
                :base-url="route.path"
                :item="route">
      </nav-item>
    </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import navItem from './SidebarItem'

export default {
  name: 'TnavBar',
  data () {
    return {
      activeIndex2: '1'
    }
  },
  computed: {
    ...mapGetters([
      'ExtraRouter',
      'isCollapse'
    ])
  },
  components: {
    navItem
  },
  methods: {}
}
</script>

<style lang="stylus" scoped>
  .el-menu
    position: fixed
    top: 0
    bottom: 0
    left: 0
    /* 只有在没有collapse的时候才180px */
    &:not(.el-menu--collapse)
      width: 180px
  .el-menu--collapse
    width: 50px
</style>
