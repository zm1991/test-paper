
# 1.点击设置按钮后，根据试题题型获取版本列表
**接口地址**：
> /questionBank/createQuestionsTool/setupItemVersion/web/list

**参数说明**：
> questionType	Integer	Y	--	试题题型(6 种题型的id)

**返回值定义**：versionList[version] versionId
```
    [
        {
            "name": "2013",
            "entityId": "3",
            "id": 3 // versionId
        },
        {
            "name": "2010",
            "entityId": "4",
            "id": 4
        },
        {
            "name": "2007",
            "entityId": "5",
            "id": 5
        }
    ]
    
```
# 2.根据默认选中的版本id，获取一级设置项列表
**接口地址**：
> /questionBank/createQuestionsTool/setupItem/web/list

接口说明：根据版本id和上级设置项id获取顶级设置项列表，在上级设置项id为空的情况下获取的是版本下的一级设置项列表

**参数说明**：

- versionId	Long	Y	^[1-9]\d*$	设置项版本id version.id
- parentId	Long	N	--	上级设置项id, 为空获取一级列表 itemOne.id

**返回值定义**：itemOneList[itemOne]   itemTwoList[itemTwo]


```
一级设置项 ：itemOneList[itemOne]
[
    {
        "itemName": "段落",
        "itemType": 1,
        "entityId": "3",
        "id": 3 //parentId itemId
    },
    {
        "itemName": "文字",
        "itemType": 2,
        "entityId": "4",
        "id": 4
    },
    {
        "itemName": "表格",
        "itemType": 1,
        "entityId": "5",
        "id": 5
    }
]

二级设置项 itemTwoList[itemTwo] 
[
    {
        "itemName": "字体",
        "itemType": 1,
        "entityId": "3",
        "id": 3
    },
    {
        "itemName": "字号",
        "itemType": 2,
        "entityId": "4",
        "id": 4
    },
    {
        "itemName": "字间距",
        "itemType": 1,
        "entityId": "5",
        "id": 5 //itemId
    }
]
```

# 3.根据一级设置项id获取子集设置项列表
同步骤2
# 4.根据设置项id获取详情列表
**接口地址**：
> /questionBank/createQuestionsTool/setupItemDetail/web/list

接口说明：根据设置项id获取顶级设置项详情列表

**参数说明**：
参数名	类型	必填	验证要求	说明
itemId	Long	Y		设置项id

**返回值定义**： itemDetailList[detail]
```
[
    {
        "name": "字号",
        "code": "fontsize",
        "showWay": 1,
        "entityId": "3",
        "id": 3
    },
    {
        "name": "操作词语",
        "code": "fontsize",
        "showWay": 2,
        "entityId": "4",
        "id": 4 //detailId
    }
]
```
showWay的值	表示详情值展示方式
1	多选下拉框
2	单选下拉框
3	文本输入框
4	文件上传

# 5.根据详情id获取详情值列表
**接口地址**：
> /questionBank/createQuestionsTool/setupItemDetailValue/web/list

**参数说明**：
> detailId	Long	Y	^[1-9]\d*$	设置项详情id

**返回值定义**：

```
[
    {
        "name": "小四",
        "value": "22",
        "entityId": "3",
        "id": 3
    },
    {
        "name": "小五",
        "value": "19",
        "entityId": "4",
        "id": 4
    }
]
```


# 前端文件说明
src\views\operation\index.vue 文件是试题编辑的模板，示例怎么使用
src\views\operation\wordType.vue word类数据
src\views\operation\linuxType.vue linux数据

src\api\questionBank\operation.js 接口文档
src\mock\index.js mock模拟数据拦截

上传服务，需要根据公司项目调整url和保存的字段

### 保存服务传给后台数据
```
    {
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
      }
```