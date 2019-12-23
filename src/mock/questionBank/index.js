// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
// mock一组数据
export const versionList = function(opt){
    let p = getParams(opt.url);
    window.console.log(p);
    let d = Mock.mock({
        status:'',
        msg:'',
        "extra|2-4":[{
            "name":'版本：'+'@csentence(3)',
            "entityId|+1": 1,
            "id|+1": 1,
            "a":p.questionType
        }]
    });
    return d
}
export const  itemList= function(opt){
    let p = getParams(opt.url);
    let parentId = p.parentId?p.parentId:'.'
    let d = Mock.mock({
        status:'',
        msg:'',
        "extra|13-18":[{
            "itemName":p.versionId+'.'+ parentId+'@csentence(1,3)',
            "itemType":1,
            "entityId|+1": 1,
            "id": p.versionId+p.parentId+'@increment'
        }]
    });
    return d
}
export const  itemDetailList= function(opt){
    let p = getParams(opt.url);
    let d = Mock.mock({
        status:'',
        msg:'',
        "extra|13-18":[{
            "name":p.itemId+'@csentence(3, 5)',
            "code": "fontsize",
            "showWay|+1":[1,2,3,4],
            "entityId|+1": 1,
            "id": p.itemId+'@increment'
        }]
    });
    return d
}
export const  itemDetailValueList= function(opt){
    let p = getParams(opt.url);
    let d = Mock.mock({
        status:'',
        msg:'',
        "extra|3-8":[{
            "name":p.detailId + '@cword("零一二三四五六七八九十")',
            "value|+2":1,
            "entityId|+1": 1,
            "id": p.detailId +'@increment'
        }]
    });
    return d
}

function getParams(url){
    let p ={};
    if(url.split('?')[1]){

        url.split('?')[1].split('&').forEach((v)=>{let c = v.split('='); p[c[0]]=c[1]});
    }
    return p;
}