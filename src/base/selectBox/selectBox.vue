<template>
    <div class="select-groups">
      <div class="select-items academic-competition">
        <div class="items-title">
          <div class="title">{{selectList[0].name}}</div>
        </div>
        <div class="items-header">
          <ul class="title-container">
            <li class="select-box">{{selectList[0].option.prizeTitle}}</li>
            <li class="search-box">{{selectList[0].option.competitionTitle}}</li>
            <li class="select-box">{{selectList[0].option.awardsTitle}}</li>
            <li class="upload">{{selectList[0].option.materialTitle}}</li>
          </ul>
        </div>
        <div class="item-container" v-for="(val,index) in selectList[0].value" :key="index">
          <select-option
            :selectOptions1="selectList[0].option.prizeLevel"
            :searchOptions="selectList[0].option.competitionName"
            :selectOptions2="selectList[0].option.awardsLevel"
          >
          </select-option>
        </div>
        <div class="add-item-container">
          <el-row>
            <el-button class="add-item" type="primary"  @click="addSelectItem(0)">+</el-button>
          </el-row>
        </div>
      </div>
    </div>
</template>

<script>
import SelectOption from 'common/SelectOption/SelectOption'
export default {
  components: {
    SelectOption
  },
  data () {
    // title: '创新创业能力-学科竞赛',
    return {
      selectList: [
        {
          name: '创新创业能力-学科竞赛',
          option: {
            prizeTitle: '获奖等级',
            prizeLevel: [
              {
                value: '选项1',
                label: '国家级'
              },
              {
                value: '选项2',
                label: '省级'
              },
              {
                value: '选项3',
                label: '市级'
              },
              {
                value: '选项4',
                label: '校级'
              },
              {
                value: '选项5',
                label: '院级'
              }],
            competitionTitle: '竞赛名称',
            competitionName: [
              '四级',
              '六级'
            ],
            awardsTitle: '获奖情况',
            awardsLevel: [
              {
                value: '选项1',
                label: '特等奖'
              },
              {
                value: '选项2',
                label: '一等奖'
              },
              {
                value: '选项3',
                label: '二等奖'
              },
              {
                value: '选项4',
                label: '三等奖'
              },
              {
                value: '选项5',
                label: '参与奖'
              }
            ],
            materialTitle: '证明材料'
          },
          value: [
            1
          ]
        },
        {
          title: '创新创业能力-科技立项',
          prizeTitle: '获奖等级',
          prizeLevel: [
            {
              value: '选项1',
              label: '国家级'
            },
            {
              value: '选项2',
              label: '省级'
            },
            {
              value: '选项4',
              label: '校级(春萌计划)'
            }],
          projectTitle: '立项名称',
          projectName: '',
          awardsTitle: '获奖情况',
          awardsLevel: [
            {
              value: '选项1',
              label: '项目负责人'
            },
            {
              value: '选项2',
              label: '项目参与者'
            }],
          material: '证明材料'
        },
        {
          title: '创新创业能力-论文及著作',
          publicationTitle: '所属刊物',
          publicationLevel: [
            {
              value: '选项1',
              label: '三大索引'
            },
            {
              value: '选项2',
              label: '以及学术刊物'
            },
            {
              value: '选项3',
              label: '二级学术刊物'
            },
            {
              value: '选项4',
              label: '其他公开发表的学术刊物'
            }],
          paperTitle: '论文名称',
          paperName: '',
          dutyTitle: '职责',
          dutyLevel: [
            {
              value: '选项1',
              label: '第一作者'
            },
            {
              value: '选项2',
              label: '第二作者'
            },
            {
              value: '选项3',
              label: '第三作者'
            },
            {
              value: '选项4',
              label: '参与者'
            }],
          material: '证明材料'
        },
        {
          title: '创新创业能力-知识产权',
          propertyTitle: '产权类别',
          propertyKind: [
            {
              value: '选项1',
              label: '发明专利'
            },
            {
              value: '选项2',
              label: '实用新型/外观设计专利和软件著作权'
            }],
          patentTitle: '专利名称',
          patentName: '',
          dutyTitle: '职责',
          dutyLevel: [
            {
              value: '选项1',
              label: '第一专利人/第一著作权人'
            },
            {
              value: '选项2',
              label: '第二专利人/第二著作权人'
            },
            {
              value: '选项3',
              label: '参与者'
            }],
          material: '证明材料'
        },
        {
          title: '创新创业能力-创业'
        },
        {
          title: '创新创业能力-产品(成果)、软件、课件',
          technologyTitle: '技术类别',
          technologyKind: [
            {
              value: '选项1',
              label: '技术成果转让'
            },
            {
              value: '选项2',
              label: '新产品、软件、课件推广'
            }],
          propertyTitle: '论文名称',
          propertyName: '',
          dutyTitle: '职责',
          dutyLevel: [
            {
              value: '选项1',
              label: '第一转让人/第一开发人'
            },
            {
              value: '选项2',
              label: '参与者'
            }],
          material: '证明材料'
        }
      ],
      item: {
        questionName: '中共党员',
        questionId: '110',
        isShow: true
      }
    }
  },
  methods: {
    addSelectItem (index) {
      this.selectList[index].value.push(1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.select-groups
  box-sizing: border-box
.title-container
  list-style: none
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  align-items: center
  text-align: center
  padding-left: 0px
  .select-box
    width: 15%
  .search-box
    width: 40%
  .upload
    width: 30%
.items-title
  .title
    margin-bottom: 10px
    font-size: 16px
    font-weight: bold
.item-container
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
.add-item-container
  text-align: center
</style>
