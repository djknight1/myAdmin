<template>
  <div class="select-container">
      <span class="title">
        请选择导出类型:
      </span>
    <el-select @change="handleChange" :value="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import bus from 'base/util/EventBus'
export default {
  data () {
    return {
      options: ['xlxs', 'csv'],
      value: ''
    }
  },
  methods: {
    handleChange (currentVal) {
      bus.$emit('chooseType', currentVal)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .select-container
    width: 80%
    margin: 0 auto
    text-align: right
    .title
      font-size: 14px
      color: #606266
      font-weight: 700
</style>
