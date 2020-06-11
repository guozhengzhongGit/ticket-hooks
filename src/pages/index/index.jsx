import React, { useCallback } from 'react';
import { useHistory, connect } from 'umi';
import styles from './index.less';
import Header from "@/components/common/Header";
import DepartDate from "@/components/DepartDate";
import HighSpeed from "@/components/HighSpeed";
import Journey from "@/components/Journey";
import Submit from "@/components/Submit";


import CitySelector from "@/components/common/CitySelector";

function Index({
   from,
   to,
   cityData,
   isCitySelectorVisible,
   dispatch,
   isFetchCityDataLoading,
   currentSelectingLeftCity
}) {
  const history = useHistory();
  const onBack = useCallback(() => {
    history.goBack()
  }, [])
  /**
   * @param flag boolean true=>from false=>to
   */
  const showCitySelector = useCallback((flag) => {
    dispatch({
      type: 'index/showCitySelector',
      payload: {
        isCitySelectorVisible: true,
      }
    })
    dispatch({
      type: 'index/changeCurrentSelectingLeftCity',
      payload: {
        currentSelectingLeftCity: flag,
      }
    })
  }, [])
  const hideCitySelector = useCallback(() => {
    dispatch({
      type: 'index/hideCitySelector',
      payload: {
        isCitySelectorVisible: false,
      }
    })
  }, [])
  const exchangeFromTo = useCallback(() => {

    dispatch({
      type: 'index/exchangeFromTo',
      payload: {
        to: from,
        from: to,
      }
    })
  }, [from, to])
  const fetchCityData = () => {
    const cache = JSON.parse(localStorage.getItem('cityDataCache'))
    if (cache && Date.now() < cache.expires) {
      dispatch({
        type: 'index/fetchCityDataSuc',
        payload: {
          cityData: cache.data,
        }
      })
    } else {
      dispatch({
        type: 'index/fetchCityData'
      })
    }
  }
  const onSelectCity = (cityName) => {
    if (currentSelectingLeftCity) {
      dispatch({
        type: 'index/changeFrom',
        payload: {
          from: cityName
        }
      })
    } else {
      dispatch({
        type: 'index/changeTo',
        payload: {
          to: cityName
        }
      })
    }
    dispatch({
      type: 'index/hideCitySelector',
      payload: {
        isCitySelectorVisible: false,
      }
    })
  }

  return (
    <div>
      <Header title="火车票" onBack={onBack}/>
      <Journey
        from={from}
        to={to}
        showCitySelector={showCitySelector}
        exchangeFromTo={exchangeFromTo}
      />
      <CitySelector
        cityData={cityData}
        show={isCitySelectorVisible}
        hideCitySelector={hideCitySelector}
        isLoading={isFetchCityDataLoading}
        fetchCityData={fetchCityData}
        handleSelect={onSelectCity}
      />
      <DepartDate />
      <HighSpeed />
      <Submit />
    </div>
  );
}


const mapStateToProps = (state) => {
  const indexStore = state.index
  const { from, to, cityData, isCitySelectorVisible, currentSelectingLeftCity } = indexStore
  const isFetchCityDataLoading = state.loading.effects['index/fetchCityData']
  return {
    cityData,
    isCitySelectorVisible,
    from,
    to,
    isFetchCityDataLoading,
    currentSelectingLeftCity,
  }
}

export default connect(mapStateToProps)(Index)
