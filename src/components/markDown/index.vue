<template>
  <div class="layout">
  </div>
</template>

<!--0 1px 1px rgba(0, 0, 0, 0.2),
0 8px 0 -3px #f6f6f6,
0 9px 1px -3px rgba(0, 0, 0, 0.2),
0 16px 0 -6px #f6f6f6,
0 17px 2px -6px rgba(0, 0, 0, 0.2)-->
<script>
export default {
  data () {
    return {
      editor: null
    }
  },
  mounted () {
    this.$initMarkDown('.layout', {
      autofocus: true,
      toolbar: [],
      placeholder: 'aaaaaaaaaaaaaaa'
    })
  },
  methods: {
    show () {
    }
  },
  components: {
  }
}
</script>

<style lang="stylus" scoped>
  .layout
    margin: 30px 50px
</style>
