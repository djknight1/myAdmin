<template>
  <div class="bread-crumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- 因为match生成的是从上到下的路由表 所以最后一个路由肯定是当前路由 -->
      <!-- 同时要注意如果有submenu submenu的标题是不能redirect的 所以要添加一个isActive字段 -->
      <transition-group name="breadcrumb">
        <el-breadcrumb-item class="bread-item" v-for="(item, index) in pathList" :key="item.path">
        <span
          v-if="item.meta.isActive==='no' || index===pathList.length -1 "
          class="no-to-path">
          {{item.meta.title}}
        </span>
          <router-link v-else :to="item.path">
            {{item.meta.title}}
          </router-link>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'breadCrumb',
  data () {
    return {
      pathList: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getPathList()
    })
  },
  methods: {
    getPathList () {
      /* route.match会返回一个从上到下的所有路由记录 */
      let matched = this.$route.matched.filter((item) => {
        if (item.meta.title) {
          return true
        }
      })
      console.log(matched)
      this.pathList = matched
    }
  },
  watch: {
    $route () {
      /* route每次切换会变化 */
      this.getPathList()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .bread-crumb
    padding: 17.5px
    float: left
    .bread-item
      font-size: 15px
  .breadcrumb-enter-active,
  .breadcrumb-leave-active
    transition: all .5s
  .breadcrumb-enter，
  .breadcrumb-leave-to
    opacity: 0
    transform:translate3d(-20px, 0, 0)
  .breadcrumb-leave-active
    position: absolute
</style>
