import React from "react";
import style from './index.less';

import FontIcon from "../common/FontIcon";
export default function Journey({ from, to, showCitySelector, exchangeFromTo }) {
  return (
    <div className={style.journeyWrapper}>
      <div className={style.station} onClick={() => showCitySelector(true)}>
        <input type="text" readOnly value={from} className={`${style.journeyInput} ${style.journeyFrom}`} name="from" />
      </div>
      <div className={style.exchange} onClick={exchangeFromTo}>
        <FontIcon id="symboliconicon-" />
      </div>
      <div className={style.station} onClick={() => showCitySelector(false)}>
        <input type="text" readOnly value={to} className={`${style.journeyInput} ${style.journeyTo}`} name="to" />
      </div>
    </div>
  )
}
