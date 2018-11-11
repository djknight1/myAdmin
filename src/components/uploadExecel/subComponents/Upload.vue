<template>
  <div class="upload-container">
    <input class="excel-upload-input"
           ref="excelUploadInput"
           type="file"
           accept=".xlsx, .xls">
    <div class="receive-file"
         @drop="handleDrop"
         @dragenter.prevent="handleDragOver"
         @dragover.prevent="handleDragOver">
      Drop Excel File here or
      <el-button :loading="isLoading" size="mini" type="primary"> 选择文件 </el-button>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    getHeader (sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      /* decode后会得到cell的范围 用{s:S, e:E}保存 s是第一个cell e是最后一个cell */
      /* 相当于一个二维数组 A3:B7 is represented by the object {s:{c:0, r:2}, e:{c:1, r:6}} */
      /* R是第一个元素纵坐标 */
      const R = range.s.r
      /* 从第一个元素的横坐标开始,小于最后一个元素的横坐标 */
      for (let C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        /* 得到第一行所有的cell */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        /* cell.t是cell的type */
        /* format_cell得到cell的value 但是是用number模式的 */
        /* 所以我们用value */
        if (cell && cell.t) hdr = cell.v
        headers.push(hdr)
      }
      return headers
    },
    isExcel (file) {
      return /\.(xlsx|xls|csv)$/.test(file.name)
    },
    handleDrop (e) {
      /* TODO: fixBUG: 按钮有时会变成loading,有时不会 */
      e.stopPropagation()
      e.preventDefault()
      let files = e.dataTransfer.files
      /* 只能上传一个文件 */
      if (files.length !== 1) {
        this.$message.error('Only support uploading one file!')
        return
      }
      /* 只能上传excel文件 */
      let file = files[0]
      if (!this.isExcel(file)) {
        this.$message.error('只能上传后缀名为xlsx,xls,cvs的文件')
        return
      }
      this.isLoading = true
      this.upload(file).then(({ header, results }) => {
        this.isLoading = false
        this.$emit('onSuccess', { header, results })
      })
    },
    upload (file) {
      this.$refs['excelUploadInput'].value = null
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = e => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'binary' })
          const firstSheetName = workbook.SheetNames[0]
          const workSheet = workbook.Sheets[firstSheetName]
          const header = this.getHeader(workSheet)
          const results = XLSX.utils.sheet_to_json(workSheet)
          resolve({ header, results })
        }
        reader.readAsBinaryString(file)
      })
    },
    handleDragOver (e) {
      /* 设置为copy 这样在文件拖动到上面时会显示复制 */
      e.dataTransfer.dropEffect = 'copy'
    }
  }
}
</script>

<style lang="stylus" scoped>
  .upload-container
    .excel-upload-input
      display: none
    .receive-file
      margin: 0 auto
      width: 600px
      height: 160px
      line-height: 160px
      font-size: 24px
      color: #bbb
      text-align: center
      border: 2px dashed #bbb
      border-radius: 5px
</style>
