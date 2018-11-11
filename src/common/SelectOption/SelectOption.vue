<template>
  <div  class="select-item">
    <div class="select-box-container">
      <el-select class="select-box" v-model="selectValue1" v-on:placeholder="selectOptions1[0].label">
        <el-option
          v-for="item in selectOptions1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="search-box-container">
      <el-select class="search-box" v-model="searchValue" filterable placeholder="请选择">
        <el-option
          v-for="item in searchOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="select-box-container">
      <el-select class="select-box" v-model="selectValue2" v-on:placeholder="selectOptions2[0].label">
        <el-option
          v-for="item in selectOptions2"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="upload-container">
      <upload class="upload" ref="upload" :item="item"></upload>
    </div>
  </div>
</template>

<script>
import upload from 'common/Upload/upload'
export default {
  components: {
    upload
  },
  name: 'SelectOption',
  data () {
    return {
      selectValue1: '',
      searchValue: '',
      selectValue2: '',
      item: {
        questionName: '中共党员',
        questionId: '110',
        isShow: true
      }
    }
  },
  props: {
    selectOptions1: {
      type: Array,
      default: () => []
    },
    searchOptions: {
      type: Array,
      default: () => []
    },
    selectOptions2: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="stylus" scoped>
  .select-item
    display: flex
    flex-direction: row
    flex-wrap: nowrap
    text-align: center
    align-items: center
    .select-box-container
      width: 15%
      display: flex
      .select-box
        margin: 0 auto
        flex-basis: 50%
  .search-box-container
    width: 40%
    display: flex
    .search-box
      margin: 0 auto
      flex-basis: 80%
  .upload-container
    width: 30%
    display: flex
    text-align: center
    .upload
      margin: 0 auto
      flex-basis: 100%
</style>
