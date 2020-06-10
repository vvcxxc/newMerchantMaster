import { Model } from 'dva';

const model: Model = {
  namespace: 'gift',
  state: {
    total: 0
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

      }
    }
  },

}

export default model
