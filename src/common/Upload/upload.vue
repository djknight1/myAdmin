<template>
  <div class="upload-container">
    <transition name="upload">
      <el-upload
        class="upload common"
        action="null"
        v-show="item.isShow"
        :on-preview="handlePreview"
        ref="upload"
        :on-exceed="handleExceed"
        :before-remove="beforeRemove"
        :on-change="handleChange"
        :file-list="fileList"
        :auto-upload="false"
        :limit="3"
        list-type="picture-card">
        <i class="el-icon-plus"></i>
      </el-upload>
    </transition>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" >
    </el-dialog>
    <thumb-nail></thumb-nail>
  </div>
</template>

<script>
import ThumbNail from 'common/thumbnail/ThumbNail'
import { recursiveCopy } from 'base/util/utilsMethods'
import { mapMutations } from 'vuex'
import { postFile } from 'api/submit'
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      questionDetail: {}
    }
  },
  mounted () {
  },
  methods: {
    /* 这个方法为代理方法 */
    /* 父组件点击下一步的时候把这个界面所有的item给存到vuex里, 在父组件调用这个方法 */
    getFinalResults () {
      this.setChoosenQuestion(this.questionDetail)
    },
    clearFinalResults () {
      this.clearChoosenQuestion()
    },

    /* 设置一个问题的具体参数 有questionId和图片 */
    setDetail (fileList) {
      let fileObj = {
        files: fileList
      }
      let newObj = {}
      this.questionDetail = recursiveCopy(newObj, Object.assign(this.item, fileObj))
      for (let key in this.questionDetail) {
        if (key === 'isShow') {
          delete this.questionDetail[key]
        }
      }
      console.log(this.questionDetail)
    },

    submitFile () {
      let file = this.setParams(this.fileList)
      postFile(file).then((res) => {
        console.log(res)
      })
    },

    /* 设置上传文件的formDATA */
    setParams (fileList) {
      let formData = new FormData()
      fileList.forEach((item) => {
        formData.append('imgs', item.raw)
      })
      return formData
    },

    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handlePreview (file) {
      this.setIsHidden(true)
      this.setFile(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleChange (file, fileList) {
      this.fileList = fileList
      let files = this.fileList
      this.setDetail(files)
    },
    ...mapMutations({
      setIsHidden: 'SET_IS_HIDDEN',
      setFile: 'SET_FILE',
      setChoosenQuestion: 'SET_CHOOSEN_QUESTION',
      clearChoosenQuestion: 'CLEAR_CHOOSEN_QUESTION'
    })
  },
  components: {
    ThumbNail
  }
}
</script>

<style lang="stylus" scoped>
  .upload-container
    width: 100%
    .upload
      padding: 5px 25px
      color: #409EFF
      &.upload-enter-active, &.upload-leave-active
        transition: all .3s
      &.upload-enter, &.upload-leave-to
        opacity: 0
        transform: translate3d(0 , -10px, 0)
</style>
