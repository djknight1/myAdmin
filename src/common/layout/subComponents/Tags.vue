<template>
  <div class="tags-container">
    <router-link
      class="tags-item"
      v-for="item in tagList"
      :key="item.name"
      :class="{isCurrent: $route.path === item.path}"
      :to="item.path"
    >
      {{item.title}}
      <!-- 把这个icon变成圆形 这样就可以做点小文章 -->
      <span
        ref="closeIcon"
        class="icon-container"
        @click.prevent="closeTag(item)">
        <i class="close-icon el-icon-close">
        </i>
      </span>
    </router-link>
  </div>
</template>

<script>
/* eslint-disable no-useless-return */
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Tags',
  computed: {
    ...mapGetters([
      'tagList'
    ])
  },
  mounted () {
    this.addRouteList()
  },
  methods: {
    addRouteList () {
      let currentRoute = this.$route
      const { name } = currentRoute
      if (name) {
        let isSame = this.tagList.some((item) => {
          return item.path === currentRoute.path
        })
        if (isSame) return false
        if (!isSame) {
          /* TODO: fix这个贼奇怪的bug 如果是push routeObj就不行 */
          let routeObj = Object.assign({}, {
            title: currentRoute.meta.title,
            path: currentRoute.path,
            name: currentRoute.name
          })
          this.setTagList(routeObj)
        }
      }
    },
    /* 这个函数用于判断删除的tag是不是当前展示的tag */
    isCurrentView (item) {
      return Object.is(item.path, this.$route.path)
    },
    closeTag (view) {
      this.$nextTick(() => {
        this.$store.dispatch('delTag', view).then((viewed) => {
          /* -1代表从尾部选取,如果没有第二个参数,代表从尾部选到头部 */
          if (this.isCurrentView(view)) {
            const latestView = viewed.slice(-1)[0]
            if (latestView) {
              this.$router.push({
                path: latestView.path,
                query: { t: +new Date() }
              })
            } else {
              /* hack方法,在path一样的时候 router.push没有用 给每个path后面加上时间戳 让url不一样 */
              this.$router.push({
                /* TODO:更改router的时候这里也要改！ */
                path: '/student',
                query: { t: +new Date() }
              })
            }
          }
        })
      })
    },
    ...mapMutations({
      setTagList: 'SET_TAG_LIST',
      delTag: 'DEL_TAG_ITEM'
    })
  },
  watch: {
    /* vue-router跳转到本来的页面是不刷新的！！！ 给router-view加个key解决这个问题 */
    $route (to, from) {
      this.addRouteList()
    }
  }
}
</script>

<style lang="stylus" scoped>
.tags-container
  display: flex
  align-items: center
  justify-content:flex-start
  height: 36px
  padding: 0 25px
  margin-bottom: 10px
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04)
  clear: both
  .tags-item
    position: relative
    padding: 8px 12px
    line-height: 10px
    font-size: 12px
    margin-right: 15px
    border: 1px solid #eee
    border-radius: 4px
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04)
    transition: all .28s
    transform: translate3d(15px,0, 0)
    &.isCurrent
      background-color: #42b983
      color: #fff
      border-color: #42b983
    .icon-container
      margin-left: 5px
      display: inline-block
      text-align: center
      height: 14px
      width : 14px
      border-radius: 50%
      transition: all .2s
      &:hover
        background: #b4bccc
        color: #fff
      .close-icon
        font-size: 10px
        line-height: 14px
</style>
