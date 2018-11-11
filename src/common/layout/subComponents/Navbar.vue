<template>
  <div class="navbar">
    <div class="dropdown-control" >
      <svg-icon @click.native="toggleCollapse"  iconClass="zhankai" class-name="dropdown">
      </svg-icon>
    </div>

    <bread-crumb></bread-crumb>
    <div class="right-menu">
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import breadCrumb from 'base/breadCrumb/breadCrumb'
export default {
  name: 'Navbar',
  computed: {
    ...mapGetters([
      'isCollapse'
    ])
  },
  methods: {
    toggleCollapse () {
      this.setCollapse(!this.isCollapse)
    },
    ...mapMutations({
      setCollapse: 'SET_IS_COLLAPSE'
    })
  },
  components: {
    breadCrumb
  }
}
</script>

<style lang="stylus" scoped>
  .navbar
    height: 50px
    line-height: 50px
    .dropdown-control
      float: left
      padding:0 10px
      .dropdown
        height: 20px
        width: 20px
        cursor: pointer
</style>
