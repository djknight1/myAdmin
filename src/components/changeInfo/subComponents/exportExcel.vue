<template>
  <div class="table-container">
    <el-table
        class="table"
        v-show="togglePage"
        :data="cutList"
        :border="true"
        style="width: 100%">
        <el-table-column align="center" label="Id" width="75">
          <template slot-scope="scope">
            {{ scope.row.userId }}
          </template>
        </el-table-column>
        <el-table-column label="Name" width="95">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="Class" align="center">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.class }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="品德素质" width="115" align="center">
          <template slot-scope="scope">
            {{ scope.row.moralPoints }}
          </template>
        </el-table-column>
        <el-table-column label="学业测评" width="115" align="center">
          <template slot-scope="scope">
            {{ scope.row.studyPoints }}
          </template>
        </el-table-column>

        <el-table-column label="发展能力" width="115" align="center">
          <template slot-scope="scope">
            {{ scope.row.devPoints }}
          </template>
        </el-table-column>

        <el-table-column label="总分" width="115" align="center">
          <template slot-scope="scope">
            {{ scope.row.totalPoints }}
          </template>
        </el-table-column>

        <el-table-column label="体测成绩" width="115" align="center">
          <template slot-scope="scope">
            {{ scope.row.exeGrades }}
          </template>
        </el-table-column>

        <el-table-column label="挂科数" width="115" align="center">
          <template slot-scope="scope">
            {{ scope.row.failNum }}
          </template>
        </el-table-column>

      <el-table-column label="操作" width="115">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
      </el-table>
    <div class="button-container">
      <el-button
        size="medium"
        round
        class="button"
        :loading="downloadLoading"
        style="margin:0 0 20px 20px;"
        type="primary"
        icon="document"
        @click="handleDownload">
        导出Excel
      </el-button>
    </div>
    <div class="pagination-container">
      <el-pagination
        class="pagination"
        :current-page="currentPage"
        :page-size="20"
        @size-change="sizeChange"
        @prev-click="prevClick"
        @next-click="nextClick"
        @current-change="currentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalItem">
        <!-- 前端一次性处理 page数用total/ 每一页显示的数目 -->
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getStuList } from 'api/getStuList'
import Bus from 'base/util/EventBus'

export default {
  data () {
    return {
      stuList: [],
      totalItem: 0,
      currentPage: 1,
      showNum: 20,
      togglePage: true,
      downloadLoading: false,
      ExcelType: 'xlsx'
    }
  },
  computed: {
    cutList () {
      /* 返回 [0,19] [20, 39] */
      return this.stuList.slice((this.currentPage - 1) * this.showNum, (this.showNum * this.currentPage) - 1)
    }
  },
  created () {
    this.fetchList()
  },
  mounted () {
    this.$nextTick(() => {
      Bus.$on('chooseType', (type) => {
        this.ExcelType = type
      })
    })
  },
  methods: {
    fetchList () {
      getStuList().then((res) => {
        this.stuList = res.data.items
        this.totalItem = res.data.total
      }).catch((error) => {
        this.$message.error(error)
      })
    },
    handleDownload () {
      import('@/base/export2Excel/Export2Excel.js').then(excel => {
        const tHeader = ['userId', 'name', 'class', 'moralPoints', 'studyPoints', 'devPoints', 'totalPoints', 'exeGrades', 'failNum']
        const data = this.formatJson(tHeader, this.stuList)
        excel.export_json_to_excel({
          header: tHeader, // 表头 必填
          data, // 具体数据 必填
          filename: 'excel-list', // 非必填
          bookType: this.ExcelType // 非必填
        })
      })
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    formatJson (filterVal, jsonData) {
      /* 格式是[[x,c,v,b,n],...] */
      /* map是映射,把原来的数组映射成新的数组 */
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    },
    prevClick (current) {
      this.currentPage = current
    },
    nextClick (current) {
      this.currentPage = current
    },
    sizeChange (pageSize) {
      this.showNum = pageSize
    },
    currentChange (current) {
      this.currentPage = current
    }
  }
}
</script>

<style lang="stylus" scoped>
  .table-container
    padding: 20px
    .table
      transition: all .48s
    .button-container
      text-align:center
      .button
        margin: 10px 0 0 10px!important
    .pagination-container
      display: flex
      justify-content: center
      align-items: center
      .pagination
        margin-top: 20px
</style>
