<template>
  <section class="main-view">
    <!-- 要是想缓存之前打开的router可以用keep-alive的include属性 -->
    <!-- 但是它有个弊端,是根据组件名来动态缓存的,当你有文章详情页时,组件是一样的,所以你切换文章它时是不会更新的 -->
    <transition name="mainView" mode="out-in">
      <router-view v-if="$route.meta.keepAlive === 'no'"></router-view>
      <keep-alive v-else :max="10">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'MainView',
  /* 绑定key是因为路由在只有/serviceId/:id id改变的情况下并不会刷新,绑定个key让每次都不一样 这样就会刷新了 */
  computed: {
    key () {
      return this.$route.fullPath
    }
  }
}
</script>

<style lang="stylus" scoped>
  .main-view
    min-height: 1024px
    width: 100%
    position: relative
    overflow: hidden
  .mainView-enter-active
  .mainView-leave-active
    transition: all .48s
  .mainView-enter,
  .mainView-leave-to
    opacity: 0
    transform: translate3d(-20px, 0, 0)
</style>
