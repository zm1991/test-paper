import Mock from 'mockjs'
import * as data from './questionBank/index'
Mock.mock(/\/questionBank\/createQuestionsTool\/setupItemVersion\/web\/list/, 'get', data.versionList);
Mock.mock(/\/questionBank\/createQuestionsTool\/setupItem\/web\/list/, 'get', data.itemList);
Mock.mock(/\/questionBank\/createQuestionsTool\/setupItemDetail\/web\/list/, 'get', data.itemDetailList);
Mock.mock(/\/questionBank\/createQuestionsTool\/setupItemDetailValue\/web\/list/, 'get', data.itemDetailValueList);

