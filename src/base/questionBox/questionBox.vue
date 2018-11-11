<template>
  <div>
    <h2 class="header">
      {{header}}
    </h2>
    <div class="container">
      <div class="question-content">
        <div v-for="FatherQ in questionList" class="question-section" :key="FatherQ.subTitleId">

          <div class="question-header">
            <div class="title">{{FatherQ.title}}</div>
          </div>

          <div class="question-list">
            <div class="question-group mb25" v-for="(questionGroup, index) in FatherQ.questionGroup" :key="index">
              <div class="item-container">
                <div class="item" v-for="item in questionGroup.questions" :key="item.questionId" >
                  <checked-groups @dataChanged="handleDataChange(item, arguments)" :item="item"></checked-groups>
                    <upload ref="upload" :item="item"></upload>
                </div>
              </div>
              <div class="tip-content">
                <h3>tips:</h3>
                <div class="text">
                  <span>
                 {{questionGroup.tips}}
                  </span>
                </div>
              </div>
            </div>
           </div>
        </div>
      </div>
    </div>

    <el-row class="button-group">
      <el-col :span="24">
        <el-button type="primary" round @click="collectData">下一步</el-button>
      </el-col>
    </el-row>

    <form action="http://localhost:3000/upload" method="post">
      <input type="file" name="111">
      <input type="file" name="112">
      <input type="text" name="113">
      <button type="submit">a</button>
    </form>
  </div>
</template>

<script>
import Upload from 'common/Upload/upload'
import Formdata from 'form-data'
import { postFile } from 'api/submit'
import CheckedGroups from 'common/CheckedGroups/CheckedGroups'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      header: '品德素质评价',
      /* questionList将从后端取得！！ */
      /* 都要改成props */
      checkedList: [],
      checkedItems: [],
      questionList: [
        {
          title: '思想表现',
          subTitleId: 123,
          questionGroup: [
            {
              tips: '叶高翔首先对新同学的到来表示欢迎。“什么是大学梦”？他结合学校发展史、办学成果就学校应用型和国际化的办学特色向同学们阐述了“大学梦”的深刻内涵叶高翔指出，优秀的研究生是实现“大学梦”的必要指标，是科学研究的生力军，也是服务社会的骨干力量。',
              questions: [
                {
                  questionName: '中共党员',
                  questionId: '110'
                },
                {
                  questionName: '大学一年级被列为入党积极分子',
                  questionId: '111'
                },
                {
                  questionName: '大学二年级被列入党员发展计划',
                  questionId: '112'
                },
                {
                  questionName: '积极参加团日活动,所在团支部获校级以上先进团支部荣誉',
                  questionId: '113'
                },
                {
                  questionName: '积极参加院级以上政治理论学习组织或参加思想宣传类活动的以及其他二级学院认定的情况',
                  questionId: '114'
                }
              ]
            },
            {
              tips: '叶高翔首先对新同学的到来表示欢迎。“什么是大学梦”？他结合学校发展史、办学成果就学校应用型和国际化的办学特色向同学们阐述了“大学梦”的深刻内涵叶高翔指出，优秀的研究生是实现“大学梦”的必要指标，是科学研究的生力军，也是服务社会的骨干力量。',
              questions: [
                {
                  questionName: '违反四项基本原则之言行',
                  questionId: '220'
                }
              ]
            }
          ]
        },
        {
          title: '文明守纪',
          subTitleId: 124,
          tips: '但左述个人若在所评学年收到学校处分或收到学校、学院和有关部门通报批评...........................',
          questionGroup: [
            {
              tips: '叶高翔首先对新同学的到来表示欢迎。“什么是大学梦”？他结合学校发展史、办学成果就学校应用型和国际化的办学特色向同学们阐述了“大学梦”的深刻内涵叶高翔指出，优秀的研究生是实现“大学梦”的必要指标，是科学研究的生力军，也是服务社会的骨干力量。',
              questions: [
                {
                  questionName: '学生所在寝室月卫生检查成绩曾获优良等级或有反映助人为乐和学术诚信事迹的,二级学院认证的其他情况',
                  questionId: '130',
                  points: '+10'
                },
                {
                  questionName: '所在寝室卫生检查成绩在学年内有月评定记录不合格',
                  questionId: '131',
                  points: '+10'
                },
                {
                  questionName: '缴费、还贷等有失信或违约记录',
                  questionId: '132',
                  points: '+10'
                }
              ]
            },
            {
              tips: '叶高翔首先对新同学的到来表示欢迎。“什么是大学梦”？他结合学校发展史、办学成果就学校应用型和国际化的办学特色向同学们阐述了“大学梦”的深刻内涵叶高翔指出，优秀的研究生是实现“大学梦”的必要指标，是科学研究的生力军，也是服务社会的骨干力量。',
              questions: [
                {
                  questionName: '违反四项基本原则之言行',
                  questionId: '240'
                }
              ]
            }
          ]
        }
      ],
      fileList: []
    }
  },
  computed: {
    ...mapGetters([
      'choosenQuestion'
    ])
  },
  mounted () {
  },
  methods: {

    handleDataChange (item, isShow) {
      /* item.isShow = !item.isShow */
      /* 这种方式vue检测不到变化 用set或者Object.assign才能让子组件监听到prop */

      /* vue中自定义事件传递多个参数使用arguments 或者$event 传递过来的参数是一个数组 */
      let param = isShow[0]
      this.$set(item, 'isShow', param)
    },
    collectData () {
      const uploadComponent = this.$refs.upload
      uploadComponent.forEach((item) => {
        item.clearFinalResults()
      })
      uploadComponent.forEach((item) => {
        item.getFinalResults()
      })
      // let obj = {}
      let form = new Formdata()
      this.choosenQuestion.forEach((item, index) => {
        if (item.questionId) {
          item.files.forEach(file => {
            form.append(item.questionId, file.raw)
          })
        }
      })
      console.log(form)
      postFile(form).then((res) => {
        console.log(res)
      })
    }
  },
  components: {
    Upload,
    CheckedGroups
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '~@/assets/styles/varible.styl'
  .header
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","PingFang SC",Arial,sans-serif;
    font-size: 22px
  .container
    height: 100%
    display: flex
    padding: 10px
    justify-content:space-between
    align-items:flex-start
    .question-content
      width: 100%
      .question-section
        width:100%
        .question-header
          .title
            margin-bottom: 10px
            font-size: 16px
            font-weight:bold
        .question-list
          .question-group
            display: flex
            justify-content:space-between
            .item-container
              flex-basis: 50%
              margin-right: 15px
              .item
                display: flex
                flex-direction: column
                align-items: flex-start
                margin-bottom: 10px
                justify-content:space-between
                .question
                  margin-left: 10px
                  display: flex!important;
            .tip-content
              flex-basis: 45%
              h3
                margin:0 auto
              .text
                font-size: 13px
                padding: 5px 15px
                span
                  color: #999
                  text-align: justify
                  line-height: 20px
                  height: 20px

  .button-group
    background-color: $bgColor
    text-align: center
</style>
