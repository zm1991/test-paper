<template>
  <div class="main">
    <a-row>
      <h3>【题干】</h3>
      <a-row>
        <a-input v-model='da.testInfo.stem' />
      </a-row>
    </a-row>
    <a-row>
      <h3>【操作要求】</h3>
      <a-row v-for="(k, i) in da.testInfo.options" :key="i">
        <a-col :span='20'>
          <a-input v-model='k.content'>
            <span slot="prefix">{{i+1}}.</span>
          </a-input>
          <div class="realAnswer">
            <h4>【答案】</h4>
            <p>
              <a-textarea v-model='k.realAnswer' :rows="4" />
            </p>
          </div>
        </a-col>
        <a-col :span='4' class="isRealAnsOrJudgementPoint">
          <a-checkbox v-model="k.isRealAnsOrJudgementPoint">作为判断点</a-checkbox>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span='20'>
          <a-button style="width:100%" @click="addOption" class="addOption">
            <a-icon type="plus-circle" theme='filled' />添加操作项</a-button>
        </a-col>
      </a-row>
    </a-row>
    <a-row>
      <h3>【解析】选填</h3>
      <a-row>
        <a-textarea v-model='da.testInfo.analysis' :rows='5' />
      </a-row>
    </a-row>
    <a-row>
      <a-col :span='2'> <label for="">【分值】</label> </a-col>
      <a-col :span='4'>
        <a-input-number :min='0' :value='da.testInfo.score' />
      </a-col>
    </a-row>
  </div>

</template>

<script>
export default {
  props: {
    questionType: Number
  },
  data() {
    return {
      headers: {
        authorization: 'authorization-text'
      },
      da: {
        examId: 1,
        testInfo: {
          analysis: '暂无', //解析
          difficulty: 4, //难易度
          knowIds: '2,3,4,5,6', //知识点
          majorId: '', //专业id
          options: [
            {
              //选项和描述信息
              content: "1.设置页边距为：左右'3cm'， 上下为'1.5cm'", //选项和操作内容
              isRealAnsOrJudgementPoint: false, //是否正确答案或是否判分点
              num: '', //选项编号和操作步骤
              realAnswer: '答案Linux和网络互连试题', //答案Linux和网络互连试题
              items: [
                {
                  //操作设置项
                  parentItemId: 1,
                  parentItemIdName: '中文',
                  childItemId: 2,
                  childItemIdName: '文字',
                  valueScore: 2.0,
                  versionId: 1,
                  details: [
                    {
                      //设置项详情
                      detailId: 2,
                      detailCode: 'fontsize',
                      detailName: '字号',
                      detailValue: '22'
                    }
                  ]
                }
              ]
            },
            {
              //选项和描述信息
              content: "2.设置页边距为：左右'3cm'， 上下为'1.5cm'", //选项和操作内容
              isRealAnsOrJudgementPoint: false, //是否正确答案或是否判分点
              num: '', //选项编号和操作步骤
              realAnswer: '', //答案Linux和网络互连试题
              items: [
                {
                  //操作设置项
                  parentItemId: 1,
                  parentItemIdName: '中文',

                  childItemId: 2,
                  childItemIdName: '文字',

                  valueScore: 2.0,
                  versionId: 1,
                  details: [
                    {
                      //设置项详情
                      detailId: 2,
                      detailCode: 'fontsize',
                      detailName: '字号',
                      detailValue: '22'
                    }
                  ]
                },
                {
                  //操作设置项
                  parentItemId: 1,
                  parentItemIdName: '中文',
                  childItemId: 2,
                  childItemIdName: '文字',
                  valueScore: 2.0,
                  versionId: 1,
                  details: [
                    {
                      //设置项详情
                      detailId: 2,
                      detailCode: 'fontsize',
                      detailName: '字号',
                      detailValue: '22'
                    }
                  ]
                }
              ]
            }
          ],
          materialList: [
            {
              url: '/static/file/1.png',
              fileName: '国画.png'
            }
          ],
          questionType: 51, //题型
          stem: '鲁迅是民国时期著名文学家', //题干
          score: 2, //分值
          subjectId: 1, //科目 id
          label: '', //标签 逗号分隔
          resultFile: '国画.pws'
        }
      },
      option: {},
      form: this.$form.createForm(this, {}),
      columns: [
        {
          title: '描述',
          dataIndex: 'content',
          scopedSlots: { customRender: 'content' }
        },
        {
          title: '设置项',
          scopedSlots: { customRender: 'items' }
        }
      ]
    }
  },
  methods: {
    addOption() {
      let defaultV = {
        //选项和描述信息
        content: '', //选项和操作内容
        isRealAnsOrJudgementPoint: false, //是否正确答案或是否判分点
        num: '', //选项编号和操作步骤
        realAnswer: '', //答案Linux和网络互连试题
        items: []
      }
      this.da.testInfo.options.push(defaultV)
    }
  }
}
</script>

<style scoped>
.realAnswer {
  background: #eee;
  padding: 10px;
  margin-bottom: 20px;
}
.realAnswer p {
  background: #fff;
}
.main {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
.main > div > .ant-row {
  margin-bottom: 30px;
}
.isRealAnsOrJudgementPoint{
  padding-left: 10px;
}
</style>