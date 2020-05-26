import { Model } from 'dva';

const model: Model = {
  namespace: 'gift',
  state: {
    gift_list: [], // 礼品列表
    type: null,
    num: 0,
    list: [], // 添加礼品页面各个活动的数据
    sum: 0,
    gift_data: [], // 传给后端的数据
    page: 1,
    total_pages: 1,
    total: '', // 总数量
  },
  reducers: {
    setData(state: any, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
    reset() {
      return {
        gift_list: [], // 礼品列表
        type: null,
        num: 0,
        list: [], // 添加礼品页面各个活动的数据
        sum: 0,
        gift_data: [], // 传给后端的数据
        page: 1,
        total_pages: 1,
        total: '', // 总数量
      }
    }
  },

}

export default model
