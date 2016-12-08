import React from 'react'

const LoadingView = ({title}) => (
  <div className="layout layout--login">
    <div className="entry entry--sign-in">
      <div className="entry__inner">
        <div className="entry__box">
          <h2>{title}</h2>
        </div>
      </div>
    </div>
  </div>
)

export default LoadingView
