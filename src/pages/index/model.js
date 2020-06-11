import { getCityData } from './api'
export default {
  namespace: 'index',
  state: {
    from: '北京',
    to: '上海',
    isCitySelectorVisible: false,
    currentSelectingLeftCity: false,
    cityData: null,
    isDateSelectorVisible: false,
    highSpeed: false,
  },
  effects: {
    *fetchCityData(_, { call, put }) {
      try {
        const res = yield call(getCityData)
        console.log(res)
        yield put({
          type: 'fetchCityDataSuc',
          payload: {
            cityData: res
          },
        })
        localStorage.setItem('cityDataCache', JSON.stringify({
          expires: Date.now() + 60 * 1000,
          data: res
        }))
      } catch (e) {
        alert(e)
      }
    }
  },
  reducers: {
    fetchCityDataSuc(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
    exchangeFromTo(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
    showCitySelector(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
    hideCitySelector(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
    changeCurrentSelectingLeftCity(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    changeFrom(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    changeTo(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    }
  }
}
