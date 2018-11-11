<template>
  <div>
    <el-dialog
      title="图片预览"
      :visible.sync="isHidden"
      :before-close="close"
      width="50%">
      <div class="img-container">
        <img class="image" :src="File.url">
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="close">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'isHidden',
      'File'
    ])
  },
  components: {
  },
  methods: {
    close () {
      this.setIsHidden(false)
    },
    ...mapMutations({
      setIsHidden: 'SET_IS_HIDDEN'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  .img-container
    margin: 0 auto
    width: 80%
    .image
      display: block
      width: 100%
</style>
