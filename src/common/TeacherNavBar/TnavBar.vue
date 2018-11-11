<template>
  <el-container class="basic-container">
    <nav-bar></nav-bar>
    <el-container>
      <el-aside width="200px" class="el-aside">
        <el-row class="tac">
          <el-col class="column" :span="24">
            <el-menu
              :default-active="$route.path"
              class="el-menu"
              router
              background-color="#008784"
              text-color="#fff"
              active-text-color="#ffd04b">
              <nav-item v-for="route in ExtraRouter"
                        :key="route.name"
                        :base-url="route.path"
                        :item="route">
              </nav-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-main class="np-main">
          <router-view>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>

</template>

<script>
import { mapGetters } from 'vuex'
import navItem from './TnavBarItem'
import navBar from 'common/layout/subComponents/Navbar.vue'
export default {
  name: 'TnavBar',
  data () {
    return {
      activeIndex2: '1'
    }
  },
  mounted () {
    this.$nextTick(() => {
      console.log(this.$route.path)
    })
  },
  computed: {
    ...mapGetters([
      'ExtraRouter'
    ])
  },
  components: {
    navItem,
    navBar
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
  .basic-container
    min-height: 800px
  .el-header
    background-color: #00F5F1
    .title, .user
      padding: 20px 0
      line-height: 20px
    .title
      float: left
    .user
      float: right
      span
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif
        font-size: 20px
  .el-aside
    .tac
      height: 100%
      .column
        height: 100%
        .el-menu
          height: 100%
</style>
