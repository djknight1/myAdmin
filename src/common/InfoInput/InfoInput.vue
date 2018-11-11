<template>
  <div class="container">
    <div class="item" v-for="(item, index) in Info" :key="index">
      <div class="label">{{item.name}}:</div>
      <div class="input-group">
        <el-input
          :placeholder="item.value"
          class="inputs"
          :disabled="isDisable">
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoInput',
  props: {
    Info: {
      type: Array,
      default: () => []
    },
    isDisable: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus" scoped>
  .item
    display: flex
    justify-content: flex-start
    align-items:center
    margin-bottom: 15px
    .label
      font-size: 16px
      margin-left: 5%
      flex-basis: 30%
    .input-group
      color: #000
      flex-basis: 50%
</style>
