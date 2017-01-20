import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {
  fetchChat,
  closeChat,
  createWithMessage,
  rejectExam,
  waitingExam,
  approveExam,
  fetchPendingExam,
  PRIVATE_CHAT_ID
} from '../actions'

import Chat from './Chat'
import UserReportsMenu from '../components/userReports/UserReportsMenu'

const programs = [
  'Я герой',
  'Мама может',
  'Экстренная сушка'
]

const healthConditions = {
	bad: 'Ужасно',
	middle: 'Так себе',
	good: 'Отлично'
}
const youtubePattern = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/

class UserReports extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isConfirmPopupVisible: false
    }
  }

  componentWillMount() {
    const {fetchPendingExam, routeParams} = this.props

    fetchChat(PRIVATE_CHAT_ID)
    fetchPendingExam(routeParams.userId, routeParams.dayId)
  }

  componentWillUnmount() {
    const {closeChat} = this.props

    closeChat()
  }

  confirmChoice() {
    const {confirmMessage} = this.refs
    const {confirmationAction} = this.state

    this.toggleStatus(confirmationAction, confirmMessage.value)
  }

  toggleStatus(action, message) {
    const {id, router} = this.props

    action(id, message)
      .then(() => router.push('/userReports/exams'))
  }

  showConfirmPopup(confirmationAction) {
    this.setState({isConfirmPopupVisible: true, confirmationAction})
  }

  hideConfirmPopup() {
    this.setState({isConfirmPopupVisible: false})
  }

	dateFormat(date){
		console.log(date)
		let newDate

		if(date){
			let arr = date.split('-')
			newDate = arr[2].slice(0,2) + '-'+arr[1] + '-' + arr[0]
			return newDate
		}



		return 'Нет данных'

	}

  render() {
    const {isConfirmPopupVisible} = this.state

	  console.log('renderrrr')
	  console.log(this.state)
    const {
      userId,
      isFetching,
      approveExam,
      waitingExam,
      rejectExam,
      video = '',
      report,
      health,
      createTs,
      userInfo
    } = this.props
	  console.log(userInfo)

	  const {
		  firstName,
		  lastName,
		  city,
		  program,
		  diseases,
		  birthday,
		  bodyMeasure
		  } = userInfo ? userInfo : 'Нет данных'


	  const {
		  hips,
		  chest,
		  height,
		  thigh,
		  waist,
		  weight,
		  date,
		  } = bodyMeasure ? bodyMeasure : 'Нет данных'

	  const fullName = firstName + ' ' + lastName

	  const birthdayFormat = this.dateFormat(birthday),
	        dateFormat = this.dateFormat(date),
		  createTsFormat = this.dateFormat(createTs)


    const healthCondition = healthConditions[health] || healthConditions.middle

    const matchYoutubeUrl = video ? video.match(youtubePattern) : '';
    const isVideoValid = matchYoutubeUrl && matchYoutubeUrl[2].length === 11
    const videoEmbedUrl = isVideoValid ? `https://www.youtube.com/embed/${matchYoutubeUrl[2]}?autoplay=0` : null

    return (
      <div className="layout layout--login">
        <Chat
          userId={userId}
          onWaiting={() => this.toggleStatus(waitingExam, '')}/>

        <div className="header">
          <div className="grid header__inner">
            <h1 className="grid__cell header__logo">
              Ясегодня
              <img src="/assets/img/ys_logo.svg" alt="Ясегодня"/>
            </h1>
          </div>
        </div>

        <div className="user-reports">

          <div className="entry entry--sign-up">
            <div className="entry__inner">
              <div className="entry-info entry-info_top-menu">
                <div className="entry-info__inner">
                  <UserReportsMenu />
                </div>
              </div>

              <div className="entry__box">
                {
                  isFetching ? <div className="spinner"></div> : (
                      <div className="pending-profile">
                        <div className="pending-profile__top-panel">
                          <div className="pending-profile__buttons">
                            <button
                              onClick={() => this.showConfirmPopup(approveExam)}
                              className="pending-profile__button btn btn--primary">
                              Отчёт принят
                            </button>
                            <button
                              onClick={() => this.showConfirmPopup(rejectExam)}
                              className="pending-profile__button btn btn--action">
                              Отчёт не принят
                            </button>
                            <button
                              onClick={() => this.showConfirmPopup(waitingExam)}
                              className="pending-profile__button btn btn--secondary">
                              Вернуть клиенту
                            </button>
                          </div>

                          <Link
                            to="/userReports/exams"
                            className="pending-profile__close-button">
                            <svg className="svg-icon ico-close">
                              <use xlinkHref="#ico-close"></use>
                            </svg>
                          </Link>
                        </div>

                        <div className="pending-profile__container">
                          <div className="pending-profile__row">
                            <h3 className="pending-profile__row-title">
                              Состояние
                            </h3>

                            {healthCondition}
                          </div>


                          <div className="pending-profile__row">
                            <h3 className="pending-profile__row-title">
                              Комментарий
                            </h3>

                            {report}
                          </div>

                          <div className="pending-profile__row">
                            <h3 className="pending-profile__row-title">
                              Видео
                            </h3>

                            {
                              isVideoValid ? (
                                  <iframe width="420" height="315" src={videoEmbedUrl}/>
                                ) : 'Некорректная ссылка, либо отсутствует'

                            }
                          </div>

	                        <div className="pending-profile__row">
		                        <h2>Информация о пользователе</h2>

		                        <div className="pending-profile__row">
			                        <h3 className="pending-profile__row-title">
				                        Имя
			                        </h3>

			                        {fullName}
		                        </div>

		                        <div className="pending-profile__row">
			                        <h3 className="pending-profile__row-title">
				                       Программа
			                        </h3>

			                        {programs[program-1]}
		                        </div>

		                        <div className="pending-profile__row">
			                        <h3 className="pending-profile__row-title">
				                        Город
			                        </h3>

			                        {city}
		                        </div>

		                        <div className="pending-profile__row">
			                        <h3 className="pending-profile__row-title">
				                        День рождения
			                        </h3>

			                        {birthdayFormat}
		                        </div>

		                        <div className="pending-profile__row">
			                        <h3 className="pending-profile__row-title">
				                        Травмы
			                        </h3>

			                        {diseases}
		                        </div>

		                        <div className="pending-profile__row">
			                        <h3 className="pending-profile__row-title">
				                        Дата отправки отчета
			                        </h3>

			                        {createTsFormat}
		                        </div>

		                        <div className="pending-profile__row">
			                        <h3 className="pending-profile__row-title">
				                        Параметры тела:
			                        </h3>

			                        <div>
				                        <table className="pending-profile__params">
					                        <tr>
						                        <td>Дата заполнения</td>
						                        <td> {dateFormat}</td>
					                        </tr>
					                        <tr>
						                        <td>Рост</td>
						                        <td>{height ? height +' см':'нет данных'}</td>
					                        </tr>
					                        <tr>
						                        <td>Вес</td>
						                        <td>{weight ? weight +' кг':'нет данных'}</td>
					                        </tr>
					                        <tr>
						                        <td>Рост</td>
						                        <td>{chest ? chest+' см':'нет данных'}</td>
					                        </tr>
					                        <tr>
						                        <td>Талия</td>
						                        <td>{waist ? waist+' см':'нет данных'}</td>
					                        </tr>
					                        <tr>
						                        <td>Бедра</td>
						                        <td>{hips ? hips +' см':'нет данных'}</td>
					                        </tr>
					                        <tr>
						                        <td>Обхват бедра</td>
						                        <td> {thigh ? thigh +' см':'нет данных'}</td>
					                        </tr>

				                        </table>
			                        </div>


		                        </div>
	                        </div>

                        </div>
                      </div>
                    )
                }



                {
                  isConfirmPopupVisible ? (
                      <div className="pending-profile__inner-popup">
                        <div className="pending-profile__top-panel">
                          <div className="pending-profile__buttons">
                            <button
                              onClick={() => this.confirmChoice()}
                              className="pending-profile__button btn btn--primary">
                              Принять
                            </button>
                            <button
                              onClick={() => this.hideConfirmPopup()}
                              className="pending-profile__button btn btn--action">
                              Отмена
                            </button>
                          </div>

                          <div className="pending-profile__close-button"
                               onClick={() => this.hideConfirmPopup()}>
                            <svg className="svg-icon ico-close">
                              <use xlinkHref="#ico-close"></use>
                            </svg>
                          </div>
                        </div>

                        <textarea
                          ref="confirmMessage"
                          className="pending-profile__desc-box"
                          placeholder="Сообщение пользователю"/>
                      </div>
                    ) : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {pendingEvent = {}} = state
	console.log('ssstate-pending')
	console.log(state)

  return pendingEvent
}

const mapDispatchToProps = {
  fetchChat,
  closeChat,
  createWithMessage,
  rejectExam,
  waitingExam,
  approveExam,
  fetchPendingExam
}

UserReports = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserReports);

export default UserReports
