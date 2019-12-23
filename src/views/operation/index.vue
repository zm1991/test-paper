<template>
  <div>
    <a-dropdown>
      <a-menu slot="overlay" @click="handleMenuClick">
        <a-menu-item v-for="(btn, index) in buttonData" :key="index">
          {{btn.name}}
        </a-menu-item>
      </a-menu>
      <a-button style="margin-left: 8px"> {{btnText}}
        <a-icon type="down" />
      </a-button>
    </a-dropdown>
    <a-button @click="saveData">保存</a-button>
    <a-row>
      <a-col :span='18'>
        <wordType v-if="wordTypes.indexOf(da.testInfo.questionType )>-1" ref="operation" :questionType = 'da.testInfo.questionType' />
        <linuxType v-if="linuxTypesd.indexOf(da.testInfo.questionType)>-1" ref="operation" :questionType = 'da.testInfo.questionType'/>
      </a-col>
      <a-col :span='6'>
        <div>
          <p>专业：{{da.testInfo.majorId}}</p>
          <p>科目：{{da.testInfo.subjectId}}</p>
          <p>知识点：{{da.testInfo.knowIds}}</p>
          <p>难易度：{{da.testInfo.difficulty}}</p>
          <p>标签选填：{{da.testInfo.label}}</p>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// 引入word操作题类和linux操作题类
import wordType from './wordType'
import linuxType from './linuxType'
export default {
  components: {
    wordType,
    linuxType
  },
  data() {
    return {
      btnText: 'word操作题',
      wordTypes: [1,2,3,4],
      linuxTypesd: [5,6],
      buttonData: [
        {
          questionType: 1,
          name: 'word'
        },
        {
          questionType: 2,
          name: 'excel'
        },
        {
          questionType: 3,
          name: 'ppt'
        },
        {
          questionType: 4,
          name: 'ps'
        },
        {
          questionType: 5,
          name: 'linux'
        },
        {
          questionType: 6,
          name: '互联网'
        }
      ],
      da: {
        examId: '',
        testInfo: {
          questionType: 0 //题型
        }
      }
    }
  },
  methods: {
    handleMenuClick(e) {
      let k = this.buttonData[e.key]
      this.btnText = k.name
      this.da.testInfo.questionType = k.questionType
    },
    saveData() {
      // 保存通过父级获取数据
      let da = Object.assign({}, this.da, this.$refs.operation.da)
      window.console.log(da)
    }
  },
  created() {
    // 获取 this.da.examId
    this.da.examId = '1'
  }
}
</script>

<style>
</style>   