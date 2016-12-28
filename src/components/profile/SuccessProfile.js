import React, { Component } from 'react'
import LoadingView from '../componentKit/LoadingView'

class SuccessProfile extends Component {
  componentWillMount() {
    const fbScript = document.createElement("script")
    fbScript.text = "fbq('track', 'PageView'); fbq('track', 'Purchase')"
    document.body.appendChild(fbScript)
  }

  render() {
    return (
      <div>
        <ul className="entry-bc entry-bc--step-1">
          <li className="entry-bc__item entry-bc__item--done">
            <span className="entry-bc__step">
              <span className="entry-bc__step-num">1</span>
              <svg className="svg-icon ico-done">
                <use xlinkHref="#ico-done"></use>
              </svg>
            </span>
            <span className="entry-bc__title">План</span>
          </li>
          <li className="entry-bc__item entry-bc__item--done">
            <span className="entry-bc__step">
              <span className="entry-bc__step-num">2</span>
              <svg className="svg-icon ico-done">
                <use xlinkHref="#ico-done"></use>
              </svg>
            </span>
            <span className="entry-bc__title">Регистрация/Вход</span>
          </li>
          <li className="entry-bc__item entry-bc__item--done">
            <span className="entry-bc__step">
              <span className="entry-bc__step-num">3</span>
              <svg className="svg-icon ico-done">
                <use xlinkHref="#ico-done"></use>
              </svg>
            </span>
            <span className="entry-bc__title">Оплата</span>
          </li>
          <li className="entry-bc__item entry-bc__item--done">
            <span className="entry-bc__step">
              <span className="entry-bc__step-num">4</span>
              <svg className="svg-icon ico-done">
                <use xlinkHref="#ico-done"></use>
              </svg>
            </span>
            <span className="entry-bc__title">Успех</span>
          </li>
        </ul>
        <br/>
        <br/>
        <br/>
        <LoadingView
          title="Оплата прошла успешно! Вам придет подтверждение об оплате с кодом на ваш email"
          logout={true}
        />
      </div>
    )
  }
}

export default SuccessProfile
