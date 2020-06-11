import React from "react";

export default function FontIcon({ id }) {
  return (
    <svg className="symbolicon" aria-hidden="true">
      <use xlinkHref={`#${id}`}></use>
    </svg>
  )
}
