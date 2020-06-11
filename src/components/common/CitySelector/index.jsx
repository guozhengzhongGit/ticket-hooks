import React, {useCallback, useState, useEffect, memo, useMemo} from "react";
import Loading from '@/components/common/Loading';
import { fetchSearchResult } from '@/pages/index/api';
import style from './index.less';
import FontIcon from "../FontIcon";

const SuggestItem = memo(({ name, onClick }) => {
  return (
    <li className={style.citySuggestLi} onClick={() => onClick(name)}>
      {name}
    </li>
  )
})

const Suggest = memo(({ searchKey, onSelect }) => {
  const [result, setResult] = useState([])
  async function getSearchResult() {
    const res = await fetchSearchResult(searchKey);
    const { result, searchKey: resultKey } = res
    if (searchKey === resultKey) setResult(result)
  }
  useEffect(() => {
    getSearchResult()
  }, [searchKey])
  const fallBackResult = useMemo(() => {
    return result.length ? result : [{ display: searchKey }]
  }, [result, searchKey])
  return (
    <div className={style.citySuggest}>
      <ul className={style.citySuggestUl}>
        {
          fallBackResult.map(item => (
            <SuggestItem key={item.display} name={item.display} onClick={onSelect} />
          ))
        }
      </ul>
    </div>
  )
})

const CityItem = memo(({ name, onSelect }) => {
  return (
    <li className={style.cityItem} onClick={() => onSelect(name)}>
      {name}
    </li>
  )
})

const CitySection = memo(({ title, cities = [], onSelect }) => {
  return (
    <ul className={style.cityUl}>
      <li className={style.cityTitle} key="title" data-cate={title}>
        {title}
      </li>
      {
        cities.map(city => {
          return (
            <CityItem key={city.name} name={city.name} onSelect={onSelect} />
          )
        })
      }
    </ul>
  )
})


const CityList = memo(({ sections, onSelect, toAlpha }) => {
  return (
    <div className={style.cityList}>
      <div className={style.cityCate}>
        {
          sections.map(section => {
            return (
              <CitySection title={section.title} cities={section.cities} key={section.title} onSelect={onSelect} />
            )
          })
        }
      </div>
      <div className={style.cityIndex}>
        {
          alphabet.map(alpha => <AlphaIndex key={alpha} alpha={alpha} onClick={toAlpha} />)
        }
      </div>
    </div>
  )
})

const alphabet = Array.from({length: 26}, (ele, index) => {
  return String.fromCharCode(65 + index);
})

const AlphaIndex = memo(({ alpha, onClick }) => {
  return (
    <i className={style.cityIndexItem} onClick={() => onClick(alpha)}>{alpha}</i>
  )
})

const CitySelector = memo(function ({ cityData, show, hideCitySelector, fetchCityData, isLoading, handleSelect }) {
  const [searchKey, setSearchKey] = useState('');
  const handleChangeKey = (e) => {
    setSearchKey(e.target.value.trim())
  }

  const onSelect = (params) => {
    setSearchKey('');
    handleSelect(params);
  }

  const toAlpha = useCallback((alpha) => {
    document.querySelector(`[data-cate=${alpha}]`).scrollIntoView();
  }, [])

  useEffect(() => {
    if (!show || cityData || isLoading) return
    fetchCityData()
  }, [show, cityData, isLoading])

  const outputCitySections = () => {
    if (isLoading) return <Loading />
    if (cityData) {
      return (
        <CityList sections={cityData.cityList} onSelect={onSelect} toAlpha={toAlpha} />
      )
    }
    return <div>error</div>
  }
  return (
    <div className={show ? style.citySelector : style.citySelectorHidden}>
      <div className={style.citySearch}>
        <div className={style.searchBack} onClick={hideCitySelector}>
          <FontIcon id="symboliconbiaoqing" />
        </div>
        <div className={style.searchInputWrapper}>
          <input type="text" className={style.searchInput} placeholder="城市、车站的中文或拼音" value={searchKey} onChange={handleChangeKey}/>
        </div>
        <i className={searchKey ? style.searchClean : style.searchCleanHidden} onClick={() => setSearchKey('')}><FontIcon id="symboliconguanbi" /></i>
      </div>
      {
        Boolean(searchKey) && <Suggest searchKey={searchKey} onSelect={(name) => { onSelect(name) }} />
      }
      {
        !Boolean(searchKey) && outputCitySections()
      }
    </div>
  )
})

export default CitySelector
