<template>
  <el-container>
    <el-header height="100px" class="current-student">
      <div class="name-container">
        <h1>当前学生: 朱XX</h1>
      </div>
      <div class="current-progress">
        <el-progress :percentage="70"></el-progress>
        <div class="remaining-student">
          <span class="finished">227</span>
          /
          <span class="total">440</span>
        </div>
      </div>
    </el-header>
    <el-main>
      <el-tabs class="tabs" v-model="activeName2" type="border-card">
        <el-tab-pane label="基本信息" name="first">
          <info-input :info="basicData"></info-input>
        </el-tab-pane>
        <el-tab-pane label="思想品德" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="发展能力" name="third">角色管理</el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
import InfoInput from 'common/InfoInput/InfoInput'
export default {
  name: 'changeInfo',
  data () {
    return {
      activeName2: 'first',
      basicData: [
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
      ]
    }
  },
  components: {
    InfoInput
  }
}
</script>

<style lang="stylus" scoped>
  .current-student
    background-color: #B3C0D1
    display: flex
    justify-content: space-between
    align-items:center
    .current-progress
      display: flex
      flex-direction: column
      flex-grow: 0.5
      .remaining-student
        margin-top: 15px
        align-self:center
        .finished, .total
          font-size: 18px
        .finished
          color:#ea6f5a
    .name-container
      font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
</style>
