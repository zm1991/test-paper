import axios from '@/utils/axios';
// # 1.点击设置按钮后，根据试题题型获取版本列表
// questionType	Integer	Y	--	试题题型(6 种题型的id)
export function setupItemVersion(params) {
  return axios({
    url: '/questionBank/createQuestionsTool/setupItemVersion/web/list',
    method: 'get',
    params: params
  });
}
// 接口说明：根据版本id和上级设置项id获取顶级设置项列表，在上级设置项id为空的情况下获取的是版本下的一级设置项列表
// - versionId	Long	Y	^[1-9]\d*$	设置项版本id version.id
// - parentId	Long	N	--	上级设置项id, 为空获取一级列表 
export function setupItem(params) {
  return axios({
    url: '/questionBank/createQuestionsTool/setupItem/web/list',
    method: 'get',
    params: params
  });
}
// # 4.根据设置项id获取详情列表 itemId	Long	Y		设置项id
export function setupItemDetail(params) {
  return axios({
    url: '/questionBank/createQuestionsTool/setupItemDetail/web/list',
    method: 'get',
    params: params
  });
}
// # 5.根据详情id获取详情值列表 detailId	Long	Y	^[1-9]\d*$	设置项详情id
export function setupItemDetailValue(params) {
  return axios({
    url: '/questionBank/createQuestionsTool/setupItemDetailValue/web/list',
    method: 'get',
    params: params
  });
}

