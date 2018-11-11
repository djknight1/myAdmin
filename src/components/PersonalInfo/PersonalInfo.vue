<template>
  <el-container class="container">
    <el-header class="header">
      <h2>个人信息</h2>
    </el-header>
    <el-container class="sub-container">
      <el-aside class="basic-info" width="40%">
        <div class="info-container">
          <info-input :Info="basicInfo" :is-disable="isDisable">
          </info-input>
        </div>
      </el-aside>
      <el-main class="general-info">
        <div class="general-info-item" v-for="item in generalInfo" :key="item.id">
          <div class="title">
            {{item.label}}
          </div>
          <div class="table-container">
            <!-- !!!!!!data数组有几项,你的表格就有几行!!!!! -->
            <el-table
              class="table"
              :data="item.data_list"
              :border="isBorder"
              style="width: 100%">
              <el-table-column  :label="date" v-for="(date, key) in item.headers" :key="key">
                <template slot-scope="scope">
                  {{item.data_list[scope.$index][key]}}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import InfoInput from 'common/InfoInput/InfoInput'
export default {
  name: 'PersonalInfo',
  data () {
    return {
      isBorder: true,
      isDisable: true,
      input1: '',
      basicInfo: [
        { name: '姓名',
          value: '朱xx'
        },
        {
          name: '姓名',
          value: '朱xx'
        },
        {
          name: '姓名',
          value: '朱xx' },
        {
          name: '姓名',
          value: '朱xx' },
        {
          name: '姓名',
          value: '朱xx' },
        {
          name: '姓名',
          value: '朱xx' },
        {
          name: '姓名',
          value: '朱xx' },
        {
          name: '姓名',
          value: '朱xx' },
        {
          name: '姓名',
          value: '朱xx'
        }
      ],
      generalInfo: [
        {
          headers: ['思想', '文明', '学习', '总分'],
          data_list: [[18, 19, 20, 57]],
          label: '思想素质评价',
          id: 110
        },
        {
          headers: ['思想', '文明', '学习', '总分'],
          data_list: [[18, 19, 20, 57]],
          label: '发展能力评价',
          id: 111
        },
        {
          headers: ['思想', '文明', '学习', '总分'],
          data_list: [[18, 19, 20, 57]],
          label: '综合能力评价',
          id: 112
        }
      ]
    }
  },
  components: {
    InfoInput
  }
}
</script>

<style lang="stylus" scoped>
  .container
    .basic-info
      margin-right: 30px
      .info-container
        display: flex
        flex-direction:column
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
    .general-info
      display: flex
      flex-direction:column
      .general-info-item
        margin-bottom: 20px
        .title
          font-size: 18px
          font-weight:bold
          color: #999
          margin-bottom: 10px
</style>
