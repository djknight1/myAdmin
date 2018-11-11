<template>
  <div>
    <excel-type></excel-type>
    <export-excel></export-excel>
  </div>
</template>

<script>
import exportExcel from './subComponents/exportExcel.vue'
import ExcelType from './subComponents/ExcelType'
export default {
  components: {
    exportExcel,
    ExcelType
  }
}
</script>

<style lang="stylus" scoped>
</style>
