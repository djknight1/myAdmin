<template>
  <el-checkbox-group style="max-width: 80%" v-model="checkedItems">
      <!-- change事件要自定义传参这样写, checked是它的默认参数 -->
    <el-checkbox
      @change="handleChange(item)"
      class="question"
      :label="item.questionId">
      {{item.questionName}}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>
export default {
  data () {
    return {
      checkedItems: []
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  components: {
  },
  methods: {
    handleChange (item) {
      /* item.isShow = !item.isShow */
      /* 这种方式vue检测不到变化 用set或者Object.assign才能让子组件监听到prop */
      console.log(item.isShow)
      this.$emit('dataChanged', !item.isShow)
      // this.$set(item, 'isShow', !item.isShow)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  .question
    margin-left: 10px
    display: flex!important;
</style>
