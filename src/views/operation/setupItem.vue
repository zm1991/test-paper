<template>
  <div>
    <a-modal title="选择设置项" :visible="visible" @cancel="showModal" width='1200px' class="operation" okText="确认" cancelText="取消" @ok="hideModal">
      <h3>
        <a-radio-group buttonStyle="solid" v-model="itemData.versionId">
          <a-radio :value="i.id" v-for="i in list[0].data" :key="i.id">{{i.name}}</a-radio>
        </a-radio-group>
      </h3>
      <a-row class="container">
        <!-- 一级设置项 -->
        <a-col :span="4" class="scrollbar">
          <p v-for="i in list[1].data" :key="i.id" :class="{selected:i.id===itemData.parentItemId}" @click="setValue('parentItemId',i)">{{i.itemName}}</p>
        </a-col>
        <!-- 二级设置项 -->
        <a-col :span="4" class="scrollbar">
          <p v-for="i in list[2].data" :key="i.id" :class="{selected:i.id===itemData.childItemId}" @click="setValue('childItemId',i)">{{i.itemName}}</p>
        </a-col>
        <a-col :span="16" class="scrollbar">
          <!-- 一级设置项详情 -->
          <a-row>
            <a-col :span="i.showWay===1?24:8" type="flex" v-for="i in list[3].data" :key="i.id" class="item">
              <a-col :span="i.showWay===1?4:12" class="label"> <label for=""> {{i.name}}</label></a-col>
              <a-col :span="i.showWay===1?20:12">
                <a-select v-if="i.showWay == 1" mode="multiple" placeholder="多选" style="width: 100%" @select="setDetailValue" @deselect='deselect' v-model="selectedModel[i.id]">
                  <a-select-option v-for="i in detailList[i.id]" :key="i.id">{{i.name}}</a-select-option>
                </a-select>
                <a-select v-if="i.showWay == 2" placeholder="单选" style="width: 100%" @select="setDetailValue" @deselect='deselect' v-model="selectedModel[i.id]">
                  <a-select-option v-for="i in detailList[i.id]" :key="i.id">{{i.name}}</a-select-option>
                </a-select>
                <a-input v-if="i.showWay == 3" placeholder="输入框" v-model="selectedModel[i.id]" @blur="setInputValue(i.id, i)" />
                <a-upload v-if="i.showWay == 4" name="file" :multiple="false" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" :headers="headers" @change="(e) => handleFlieChange(e, i)">
                  <a-button v-if="!selectedObj[i.id]">
                    <a-icon type="upload" /> 上传文件
                  </a-button>
                  <span v-else>{{selectedObj[i.id].detailFlieName}}</span>
                </a-upload>
              </a-col>
            </a-col>
          </a-row>
          <a-divider />
          <!-- 二级设置项详情 -->
          <a-row>
            <a-col :span="i.showWay===1?24:8" v-for="i in list[4].data" :key="i.id" class="item">
              <a-col :span="i.showWay===1?4:12" class="label"> <label for=""> {{i.name}}</label></a-col>
              <a-col :span="i.showWay===1?20:12">
                <a-select v-if="i.showWay == 1" mode="multiple" placeholder="多选" style="width: 100%" @select="setDetailValue" @deselect='deselect' v-model="selectedModel[i.id]">
                  <a-select-option v-for="i in detailList[i.id]" :key="i.id">{{i.name}}</a-select-option>
                </a-select>
                <a-select v-if="i.showWay == 2" placeholder="单选" style="width: 100%" @select="setDetailValue" @deselect='deselect' v-model="selectedModel[i.id]">
                  <a-select-option v-for="i in detailList[i.id]" :key="i.id">{{i.name}}</a-select-option>
                </a-select>
                <a-input v-if="i.showWay == 3" placeholder="输入框" v-model="selectedModel[i.id]" @blur="setInputValue(i.id, i)" />
                <a-upload v-if="i.showWay == 4" name="file" :multiple="false" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" :headers="headers" @change="handleFlieChange">
                  <a-button v-if="!selectedObj[i.id]">
                    <a-icon type="upload" /> 上传文件
                  </a-button>
                  <span v-else title="点击替换文件">{{selectedObj[i.id].detailFlieName}}</span>

                </a-upload>

              </a-col>
            </a-col>
          </a-row>
          <a-row class="saveItem">
            <a-col :span="2"> <label for="">分值</label></a-col>
            <a-col :span="8">
              <a-input-number :min='0' :defaultValue="1" v-model="itemData.valueScore" />
            </a-col>
            <a-col :span="12">
              <a-button @click="addDetail">保存</a-button>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-table :columns="columns" :dataSource="optionData.items" :rowKey='setRowKey' bordered :showHeader='false' :pagination='false'>
        <a-icon type="delete" @click="deleteItem(index)" slot="action" slot-scope="index" />
        <div slot="detail" slot-scope="details">
          <span v-for="(vvv, iii) in details" :key="iii" class="details">
            <span>【{{vvv.detailName}}】</span>:
            <span>{{vvv.detailValue}}</span>
          </span>
        </div>
        <div slot="valueScore" slot-scope="valueScore, index">
          <a-input-number :min='0' :value="valueScore" @change="e => handleChange(e, index)" />
        </div>
      </a-table>
    </a-modal>
  </div>
</template>

<script>
import * as api from '@/api/questionBank/operation.js'

export default {
  props: {
    questionType: Number
  },
  data() {
    return {
      visible: false,
      // 调取服务api以及返回值存储和参数配置项
      list: [
        {
          api: api.setupItemVersion,
          data: [],
          params: { questionType: '' }
        },
        {
          api: api.setupItem,
          data: [],
          params: { versionId: '', parentId: '' }
        },
        {
          api: api.setupItem,
          data: [],
          params: { versionId: '', parentId: '' }
        },
        {
          api: api.setupItemDetail,
          data: [],
          params: { itemId: '' }
        },
        {
          api: api.setupItemDetail,
          data: [],
          params: { itemId: '' }
        }
      ],
      optionData: {}, // 获取上级传入数据
      detailList: {}, // 设置项详情列表，按照id存储对象
      detailKeyObj: {}, // 字典方式存储配置项详情
      selectedObj: {}, // 选中的配置项详情，按照id对象
      selectedModel: {}, // 方便数据绑定
      // 存储配置数据
      itemData: {
        parentItemId: '',
        childItemId: '',
        valueScore: '',
        versionId: '',
        items: []
      },
      // 表格列配置项
      columns: [
        {
          title: '一级配置',
          dataIndex: 'parentItemIdName',
          key: 'parentItemIdName'
        },
        {
          title: '二级配置',
          dataIndex: 'childItemIdName',
          key: 'childItemIdName'
        },
        {
          title: '详情',
          dataIndex: 'details',
          scopedSlots: { customRender: 'detail' }
        },
        {
          title: '分数',
          dataIndex: 'valueScore',
          key: 'valueScore',
          scopedSlots: { customRender: 'valueScore' }
        },
        {
          title: 'Action',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      headers: {
        authorization: 'authorization-text'
      }
    }
  },
  watch: {
    'itemData.versionId': function() {
      this.list[1].params.versionId = this.itemData.versionId
      this.getData(1, 'parentItemId', this.setDefault)
    },
    'itemData.parentItemId': function() {
      this.list[2].params.versionId = this.itemData.versionId
      this.list[2].params.parentId = this.itemData.parentItemId
      this.getData(2, 'childItemId', this.setDefault)
      this.list[3].params.itemId = this.itemData.parentItemId
      this.getData(3, 3, this.getDetail)
    },
    'itemData.childItemId': function() {
      this.list[4].params.itemId = this.itemData.childItemId
      this.getData(4, 4, this.getDetail)
    },
    questionType() {
      if (this.questionType) {
        // 初始化页面设置答题类型
        this.list[0].params.questionType = this.questionType
        // 初始页面选择默认版本号
        this.getData(0, 'versionId', this.setDefault)
      }
    }
  },
  methods: {
    // 显示弹出框，获取数据
    showModal(da) {
      this.optionData = da
      window.console.log(da)
      this.visible = !this.visible
    },
    // 根据api获取按照级别获取版本、一级配置、二级配置、一级配置项、二级配置项
    getData(index, key, cb) {
      let params = this.list[index].params
      this.list[index].api(params).then(res => {
        this.list[index].data = res.data.extra
        if (typeof cb === 'function') {
          cb(key, index)
        }
      })
    },
    // 设置默认值
    setDefault(key, index) {
      this.itemData[key] = this.list[index].data[0].id
      this.itemData[key + 'Name'] = this.list[index].data[0].itemName
    },
    // 获取配置项的详情
    getDetail(key) {
      this.list[key].data.forEach(i => {
        api.setupItemDetailValue({ detailId: i.id }).then(res => {
          this.detailList[i.id] = res.data.extra
          this.formatData(res.data.extra)
        })
      })
    },
    // 按照字典方式存储配置项详情，方便渲染时取值
    formatData(data) {
      data.forEach(i => {
        this.detailKeyObj[i.id] = i
      })
    },
    // 点击选中设置默认值
    setValue(k, v) {
      this.itemData[k] = v.id
      this.itemData[k + 'Name'] = v.itemName
    },
    // 选中设置项详情则按照字典方式保存到对象中
    setDetailValue(v) {
      let d = this.detailKeyObj[v]
      this.selectedObj[v] = {
        detailName: d.name,
        detailValue: d.value,
        detailId: d.id,
        detailCode: d.entityId
      }
    },
    // input输入框，则按照字典方式保存到对象中
    setInputValue(id, opt) {
      if (typeof this.selectedModel[id] !== 'undefined') {
        this.selectedObj[id] = {
          detailName: opt.name,
          detailValue: this.selectedModel[id],
          detailId: opt.id,
          detailCode: opt.code
        }
      }
    },
    // 多选框删除配置项
    deselect(v) {
      delete this.selectedObj[v]
    },
    // 保存配置项
    addDetail() {
      const da = Object.values(this.selectedObj)
      if (da.length > 0 && Number(this.itemData.valueScore) > 0) {
        this.itemData.details = Object.values(this.selectedObj)
        this.optionData.items.push(this.itemData)
        this.clearData()
      } else {
        this.$message.warning('请至少选择一项配置项详情，并填写分数')
        // this.$notification.warning({
        //   message: '提示',
        //   description:'请至少选择一项配置项详情，并填写分数'
        // });
      }
    },
    // 清空配置面板数据
    clearData() {
      this.selectedObj = {}
      this.selectedModel = {}
      this.itemData = Object.assign({}, this.itemData, { valueScore: '', items: [] })
    },
    // 关闭弹窗
    hideModal() {
      this.visible = false
    },
    // 表格中删除配置项
    deleteItem(index) {
      this.optionData.items.splice(index, 1)
    },
    // 设置表格key值
    setRowKey(key, id) {
      return `${key.parentId}-${id}`
    },
    // 改变分值
    handleChange(v, k) {
      k['valueScore'] = v
    },
    // 上传成功服务
    handleFlieChange(info, opt) {
      if (info.file.status !== 'uploading') {
        window.console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} 上传成功`)
        this.setFileValue(info, opt)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 上传失败`)
      }
    },
    // 上传结果处理
    setFileValue(info, opt) {
      // 文件类型传值待商榷
      this.$set(this.selectedObj, opt.id, {
        detailName: opt.name,
        detailValue: info.file.response.url,
        detailFlieName: info.file.name,
        detailId: opt.id,
        detailCode: opt.code
      })
    }
  },
  created() {},
  mounted() {}
}
</script> 
<style  scoped>
.container {
  border: 1px solid #ebedf0;
  height: 450px;
  font-size: 16px;
}
.ant-radio-wrapper {
  font-size: 16px;
}
.scrollbar {
  overflow-y: auto;
  height: 100%;
}
.scrollbar::-webkit-scrollbar {
  width: 10px;
  height: 1px;
}
.scrollbar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 5px #e3e3e3;
  background: #e3e3e3;
}
.scrollbar::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #e3e3e3;
  border-radius: 10px;
  background: #f6f3f3;
}
.saveItem {
  background: #f0efef;
  padding: 10px;
  position: sticky;
  width: 100%;
  bottom: 0;
}
.saveItem button {
  float: right;
}
.container > div {
  height: 100%;
  cursor: pointer;
}
p {
  margin-top: 0;
  line-height: 2.5;
  margin-block-end: 0;
  padding-left: 20px;
}
.container > div:first-child {
  background: #f7f7f7;
}
.selected {
  color: #108ee9;
}
.container > div:first-child .selected {
  border-left: 3px solid;
  background: #fff;
}

.container > div:nth-child(3) > div:nth-child(1) {
  padding: 20px 10px 0 10px;
}
.container > div:nth-child(3) > div:nth-child(3) {
  padding: 0px 10px 0 10px;
}
.item {
  margin-bottom: 10px;
  height: 32px;
}
.item .label {
  text-align: right;
  padding-right: 5px;
}
.operation label {
  line-height: 32px;
  height: 32px;
  overflow: hidden;
  display: inline-block;
  text-align: right;
}

.res {
  border: 1px solid #ebedf0;
  margin-top: 20px;
  padding: 20px;
}
.has-error {
  border-color: #f5222d;
}
.ant-upload-list {
  display: none;
}
/* .operation {
  line-height: 32px;
}




.container > div {
}

}
.container > div:first-child p{
 padding-left: 10px;
}
.container > div:nth-child(3) {
  height: 100%;
}


.details {
  margin-right: 20px;
}
 */
</style>