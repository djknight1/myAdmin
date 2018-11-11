<template>
    <el-button
      :loading="downloadLoading"
      style="margin:0 0 20px 20px;"
      type="primary"
      icon="document"
      @click="handleDownload">
      导出Excel
    </el-button>
</template>

<script>
import Bus from 'base/util/EventBus'
export default {
  data () {
    return {
      downloadLoading: false,
      ExcelType: 'xlxs'
    }
  },
  mounted () {
    this.$nextTick(() => {
      Bus.$on('chooseType', (type) => {
        this.ExcelType = type
      })
    })
  },
  methods: {
    handleDownload () {
      import('@/base/export2Excel/Export2Excel.js').then(excel => {
        const tHeader = ['Id', 'Name', 'Class', '品德素质', '学业测评', '发展能力', '总分', '体测成绩', '挂科数']
        const data = this.list
        excel.export_json_to_excel({
          header: tHeader, // 表头 必填
          data, // 具体数据 必填
          filename: 'excel-list', // 非必填
          bookType: this.ExcelType // 非必填
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
