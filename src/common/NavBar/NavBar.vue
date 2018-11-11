<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="navbar"
      mode="horizontal"
      :router="isUsingRouter"
      background-color="#008784"
      text-color="#fff"
      active-text-color="#ffd04b">
      <li class="header">
        <div class="img-container">
          <img class="logo" src="../../assets/img/logo.jpg">
        </div>
      </li>
      <el-menu-item v-for="(navItem, index) in navList"
                    :key="index"
                    :index="navItem.url"
                    :class="navItem.position">
        {{navItem.name}}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      /* activeIndex为激活的index 不选副index */
      isUsingRouter: true,
      /* navList后面需要从后台获得 后面要改成prop！ */
      navList: [
        { url: '/student/index', name: '首页', position: 'left' },
        { url: '/student/MoralQuality', name: '品德素质评价', position: 'left' },
        { url: '/student/DevAbility', name: '发展能力评价', position: 'left' },
        { url: '/student/personal', name: '个人素质预览', position: 'left' },
        { url: '/student', name: '专业班级', position: 'right' },
        { url: '/student', name: '姓名', position: 'right' }
      ]
    }
  },
  computed: {
    activeIndex () {
      return this.navList[0].url
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  .navbar
    .header
      height: 60px
      line-height: 60px
      margin: 0
      padding: 0 20px
      float: left
      .img-container
        height: 100%
        display: flex
        align-items:center
        .logo
          display: block
          width: 316px
          height: 39px
    .right
      float: right
</style>
