<template>
  <div class="container">
    <!-- TODO: 当alert消失的时候，让下面的元素平滑移动 -->
    <div class="alert" :class="{isMove: isMove}">
      <span class="title">
      xxxxxxxxxxxxx
      </span>
      <i class="close-btn el-icon-close" @click="close">
      </i>
    </div>
    <div class="component-container" >
      <upload-component class="upload" @onSuccess="handleSuccess"></upload-component>
      <el-table
        v-if="tableData.results.length > 0"
        class="table"
        :data="tableData.results"
        :border="true"
        style="min-width:50%; max-width: 80%;">
        <!-- prop是对应列的字段名 它会在tableData.results中查找字段名跟prop一样的放到里面去 -->
        <el-table-column
          v-for="column in tableData.header"
          align="center"
          :label="column"
          :prop="column"
          :key="column">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import uploadComponent from './subComponents/Upload'
export default {
  data () {
    return {
      tableData: {
        header: [],
        results: []
      },
      isMove: false
    }
  },
  components: {
    uploadComponent
  },
  methods: {
    close () {
      this.isMove = true
    },
    handleSuccess (res) {
      this.tableData.header = res.header
      this.tableData.results = res.results
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container
    margin-top: 10px
    .alert
      position: relative
      display: flex
      padding: 8px 16px
      /* height是为了动画效果 */
      height: 32px
      width: 100%
      align-items: center
      background: #f4f4f5
      color: #909399
      overflow: hidden
      border-radius: 4px
      /* 告诉浏览器你的padding和border是包括在width里面的！ */
      box-sizing: border-box
      &.isMove
        animation: out .2s
        animation-fill-mode: forwards
      .title
        font-size: 13px
        line-height: 18px
      .close-btn
        position: absolute
        font-size: 12px
        color: #c0c4cc
        top: 12px
        right: 15px
        cursor: pointer
    .component-container
      .upload,
      .table
        transition: all .3s
      .table
        margin: 25px auto
  @keyframes out{
    0% {
      height: 32px
      padding: 8px 16px
      opacity:1
    }
    50% {
      height: 16px
      padding: 4px 16px
      opacity: .5
    }
    100% {
      height: 0
      padding: 0 16px
      opacity: 0
    }
  }
</style>
