<template>
  <div v-if="item.children">
    <!-- 这个template只是为了包裹下面的代码块,用div也行 不过可能会有影响 -->
    <template v-if="hasShowingChild(item.children, item)">
      <!-- 因为这个menu也是需要点击的,所以我们使用el-menu-item -->
      <!-- 只有一个需要展开子元素 -->
      <el-submenu
        :index="resolvePath(item.path)"
        v-if="showingChildren.length === 1">
        <template slot="title">
          <i :class="'el-' + item.meta.icon"></i>
          <span slot="title">
            {{item.meta.title}}
          </span>
        </template>

        <tnav-bar-item
          v-if="defaultShow.children&&defaultShow.children.length>0"
          :key="defaultShow.path"
          :item="defaultShow"
          :base-url="resolvePath(defaultShow.path)"
        />
        <el-menu-item
          v-wave
          v-else
          :index="resolvePath(defaultShow.path)">
          <span slot="title">
           {{defaultShow.meta.title}}
          </span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item
        v-wave
        v-else
        :index="resolvePath(defaultShow.path)">
        {{defaultShow.meta.title}}
      </el-menu-item>
    </template>
    <!---->
    <!-- 如果hasShowingChild 返回了false 说明有不只一个需要显示的item 所以要用submenu -->
    <el-submenu
      v-else
      :index="resolvePath(item.path)">
      <!-- 这里再对submenu进行递归组件 就是套用刚才上面的逻辑 -->
      <!-- 这里的template是submenu的名字 应该叫啥名字 -->
      <template slot="title">
        <i :class="'el-' + item.meta.icon"></i>
        <span slot="title">
          {{item.meta.title}}
        </span>
      </template>
      <!-- 执行到这里肯定由children了 但是如果child也是不显示的话你也不显示 -->
      <div
        v-for="child in item.children"
        v-if="!child.hidden"
        :key="child.name">
        <tnav-bar-item
          v-if="child.children&&child.children.length>0"
          :key="child.path"
          :item="child"
          :base-url="resolvePath(child.path)"
        />
        <el-menu-item
          v-else
          v-wave
          :key="child.name"
          :index="resolvePath(child.path)">
          {{child.meta.title}}
        </el-menu-item>
      </div>
    </el-submenu>
  </div>
</template>

<script>
/* 封装一个递归导航组件 */
export default {
  name: 'TnavBarItem',
  data () {
    return {
      defaultShow: {},
      showingChildren: []
    }
  },
  props: {
    /* 路由对象 */
    item: {
      type: Object,
      default: () => {}
    },
    baseUrl: {
      type: String,
      default: ''
    }
  },
  methods: {
    hasShowingChild (children, parent) {
      /* 这个方法就是判断需要显示item的children有几个 */
      /* 如果只有一个 就显示它,且用item就够了 */
      /* 如果没用需要显示的children */
      /* 那就显示它的父元素就行了 */
      this.showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false
        } else {
          this.defaultShow = item
          return true
        }
      })

      /* 如果只有一个需要显示的元素 就返回true 出现一个item就行 */
      if (this.showingChildren.length === 1) {
        return true
      }
      if (this.showingChildren.length === 0) {
        /* ...将parent展开, 让path为空就行 由path.resolve来解析。通过他的父元素的url加上他的url */
        this.defaultShow = { ...parent, path: '', noDefaultShowChild: true }
        return true
      }
      return false
    },
    resolvePath (url) {
      const baseURL = url.replace('/', '')
      return `${this.baseUrl}/${baseURL}`
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
