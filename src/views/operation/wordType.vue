<template>
  <div class="main">
    <div>
      <a-row>
        <h3>【题干】</h3>
        <a-row>
          <a-input v-model='da.testInfo.stem' />
        </a-row>
      </a-row>
      <a-row>
        <h3>【原始素材】</h3>
        <a-col :span='4'>

          <a-upload name="file" :multiple="true" :action="action" :headers="headers" @change="handleFileChange">
            <a-button>
              <a-icon type="upload" />上传文件 </a-button>
          </a-upload>
        </a-col>
        <a-col :span='20' class="materialList">
          <span v-for="(file, index) in da.testInfo.materialList" :key="index" style="margin:0 20px 0 0">
            <a-dropdown-button>
              {{file.fileName}}
              <a-menu slot="overlay" @click="(e) =>handleMenuClick(e, index)">
                <a-menu-item key="view">预览</a-menu-item>
                <a-menu-item key="delete">删除</a-menu-item>
              </a-menu>
            </a-dropdown-button>
          </span>
        </a-col>
      </a-row>
      <a-row>
        <h3>【结果文件】</h3>
        <a-row>
          <a-input v-model='da.testInfo.resultFile' />
        </a-row>
      </a-row>
      <a-row>
        <h3>【操作要求】</h3>
        <a-table :columns="columns" :dataSource="da.testInfo.options" :rowKey='setRowKey' bordered :pagination='false'>
          <div slot="content" slot-scope="content, record">
            <a-input v-model="record.content">
              <span slot="suffix">
                <a-icon type="setting" @click="showConfig(record)" style="color:#1890ff" title="配置设置项" />
                <a-icon type="close-circle" theme='filled' @click="clearInput(record)" title="清空描述内容" />
              </span>
            </a-input>
          </div>
          <template slot="items" slot-scope="record" class="configItem">
            <vuedraggable class="wrapper" v-model="record.items" handle='.targetIcon'>
              <transition-group>
                <a-row v-for="(vv, ii) in record.items" :key="'B'+ii" class='itemRow'>
                  <a-col :span="3">{{vv.parentItemIdName}}</a-col>
                  <a-col :span="3">{{vv.childItemIdName}}</a-col>
                  <a-col :span="12" v-for="(vvv, iii) in vv.details" :key="'C'+iii">
                    <i>【{{vvv.detailName}}】：</i>
                    <i>{{vvv.detailValue}}</i>
                  </a-col>
                  <a-col :span="4">
                    <a-input :value="vv.valueScore" @change="e => handleChange(e.target.value, vv)"><span slot="addonAfter">分</span></a-input>
                  </a-col>
                  <a-col :span="2">
                    <a-icon type="delete" @click="deleteItem(record.items, ii)" />
                    <a-icon type="drag" class="targetIcon" />

                  </a-col>
                </a-row>
              </transition-group>
            </vuedraggable>
          </template>
        </a-table>
        <a-row>
          <a-button style="width:100%" @click="addOption" class="addOption">
            <a-icon type="plus-circle" theme='filled' />添加操作项</a-button>
        </a-row>
      </a-row>
      <a-row>
        <a-col :span='2'> <label for="">【分值】</label> </a-col>
        <a-col :span='4'>
          <a-input-number :min='0' :value='score' :disabled="true" />
        </a-col>
      </a-row>
    </div>
    <item ref="item" :optionData='option' :questionType='questionType'></item>
  </div>
</template>

<script>
import vuedraggable from 'vuedraggable'
import item from './setupItem'
export default {
  name: 'HelloWorld',
  components: {
    item,
    vuedraggable
  },
  props: {
    questionType: Number
  },
  computed: {
    score: function() {
      let total = 0
      this.da.testInfo.options.forEach(i => {
        i.items.forEach(j => {
          total += Number(j.valueScore)
        })
      })
      return total
    }
  },
  data() {
    return {
      headers: {
        authorization: 'authorization-text'
      },
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      da: {
        examId: 1,
        testInfo: {
          stem: '', //题干
          materialList: [],
          resultFile: '', // 结果文件
          analysis: '暂无', //解析
          options: [
            {
              //选项和描述信息
              content: '', //选项和操作内容
              isRealAnsOrJudgementPoint: false, //是否正确答案或是否判分点
              num: '', //选项编号和操作步骤
              realAnswer: '', //答案Linux和网络互连试题
              items: []
            }
          ],

          score: 2, //分值
          subjectId: 1, //科目 id
          label: '' //标签 逗号分隔
        }
      },
      option: {},
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
      ],
      rules: [
        { name: 'stem', required: 'true' },
        { name: 'materialList', required: 'true' },
        { name: 'resultFile', required: 'true' },
        { name: 'options', required: 'true'}
      ]
    }
  },
  methods: {
    showConfig(da) {
      this.$refs.item.showModal(da)
    },
    handleChange(v, k) {
      k['valueScore'] = v
    },
    deleteItem(items, ii) {
      items.splice(ii, 1)
    },
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
    },
    clearInput(v) {
      v.content = ''
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          window.console.log('Received values of form: ', values)
        }
      })
    },
    // 设置表格key值
    setRowKey(key, id) {
      return `${key.parentId}-${id}`
    },
    //
    handleFileChange(info) {
      if (info.file.status !== 'uploading') {
        window.console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} 上传成功`)
        this.da.testInfo.materialList.push({
          url: info.file.response.url,
          fileName: info.file.name
        })
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 上传失败`)
      }
    },
    handleMenuClick(e, index) {
      if (e.key === 'delete') {
        this.da.testInfo.materialList.splice(index, 1)
      }
    },
    returnData() {}
  },
  created() {},
  mounted() {},
  updated() {}
}
</script>
<style scoped>
.main {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
.main > div > .ant-row {
  margin-bottom: 30px;
}
.option {
  margin-bottom: 20px;
}
.close-circle {
  color: #eee;
  opacity: 0.1;
}
.configItem {
  line-height: 32px;
  text-align: center;
}
.configItem > div {
  margin-bottom: 10px;
}
.anticon-delete {
  color: red;
}
.anticon-close-circle {
  margin-left: 10px;
  opacity: 0.3;
}
.itemRow {
  line-height: 32px;
  margin-bottom: 10px;
}
.itemRow > div:last-child i {
  margin-left: 5px;
}
.addOption {
  margin-top: 10px;
}
.ant-upload-list.ant-upload-list-text {
  display: none;
}
</style>