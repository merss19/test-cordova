import React, { PropTypes } from 'react'
import { deletePost, hideModal } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import InputModal from '../componentKit/InputModal'

const SendReportModal = props => {
  console.log('MMM====')
  console.log(props)
  const { error, handleSubmit, pristine, reset, submitting, onSubmit } = props
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="h1">Отчет миньону</h3>
      <hr/>
      <p className="sub-title">Напиши сообщение миньону о том, что тренировка отработана! Если ты и правда все сделал :)</p>
      <Field name="report" placeholder="Выполнено, сделал, справился..." component={InputModal} />
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

      <Field name="video" placeholder="http://youtube.com" component={InputModal} />
      {error && <div className="text-center"><strong>{error}</strong></div>}

      <hr/>

      <div className="text-center">
        <button type='submit' className="btn btn--primary js-fill-report-2">
          Отправить отчет
        </button>
      </div>
    </form>
)}

const validate = data => {
  const errors = {}

  if (!data.report)
    errors.report = 'Поле текста не должно быть пустым'

  if (!data.video)
    errors.video = 'Ссылка на видео должна быть заполнена'

  return errors
}

export default reduxForm({
  form: 'sendReportValidation',
  validate
})(SendReportModal)
