import React, { PropTypes } from 'react' 
import { deletePost, hideModal } from '../../actions'

const SendReportModal = () => (
  <div className="fill-report">
    <h3 className="h1">Отчет миньону</h3>
    <hr/>
    <p className="sub-title">Напиши сообщение миньону о том, что тренировка отработана! Если ты и правда все сделал :)</p>
    <div className="input input--box fill-report--input-info">
      <input className="input__field" type="text" placeholder="Выполнено, сделал, справился..."/>
    </div>
    <p className="text-center">Как ты себя чувствовал во время выполнения заданий?</p>
    <ul className="your-condition">
      <li className="your-condition__item your-condition__item--active">
        <span className="your-condition__ico">
          <svg className="svg-icon ico-your-condition-1">
            <use xlinkHref="#ico-your-condition-1"></use>
          </svg>
        </span>
        <p className="your-condition__title">отлично</p>
      </li>
      <li className="your-condition__item">
        <span className="your-condition__ico">
          <svg className="svg-icon ico-your-condition-2">
            <use xlinkHref="#ico-your-condition-2"></use>
          </svg>
        </span>
        <p className="your-condition__title">так себе</p>
      </li>
      <li className="your-condition__item">
        <span className="your-condition__ico">
          <svg className="svg-icon ico-your-condition-3">
            <use xlinkHref="#ico-your-condition-3"></use>
          </svg>
        </span>
        <p className="your-condition__title">не очень</p>
      </li>
    </ul>

    <p className="text-center mb30">Прикрепите файл или вставьте ссылку с видео выполнения заданий</p>

    <div className="fill-report__video-report">
      <div className="input input--box input--btn">
        <input type="text" className="input__field" placeholder="http://youtube.com"/>
        <div className="btn btn--secondary">Прикрепить файл</div>
      </div>
    </div>

    <hr/>

    <div className="text-center">
      <div className="btn btn--primary js-fill-report-2">Отправить отчет</div>
    </div>
  </div>
)

export default SendReportModal
