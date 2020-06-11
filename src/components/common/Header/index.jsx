import React from "react";
import PropTypes from 'prop-types';

import FontIcon from '@/components/common/FontIcon';


import style from './index.less';
export default function Header(props) {
  const { onBack, title } = props
  return (
    <div className={style.header}>
      <div className={style.headerBack} onClick={onBack}>
        <FontIcon id="symboliconbiaoqing" />
      </div>
      <h1 className={style.headerTitle}>{title}</h1>
    </div>
  )
}

Header.propTypes = {
  onBack: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}
