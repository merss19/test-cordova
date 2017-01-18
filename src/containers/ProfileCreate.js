import React , { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as actions from '../actions'
import { SubmissionError } from 'redux-form'
import SubmitValidationForm from '../components/profile/SubmitValidationForm'
import LoadingView from '../components/componentKit/LoadingView'
import cookie from 'react-cookie'
import Modal from 'boron/FadeModal'
import moment from 'moment'
import { api } from '../config.js'

let contentStyle = {
  borderRadius: '18px',
  padding: '30px'
}

let firstTime = true

class ProfileCreate extends Component {
  static propTypes = {
    token: PropTypes.string,
    profileData: PropTypes.object,
    selectedProfile: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentWillMount() {
    if (window.mobilecheck()) {
      contentStyle.margin = '80px'
      contentStyle.width = '340px'
    }
  }

  componentDidUpdate() {
    const { profileData, dispatch } = this.props
    if (profileData && profileData.isFirstEdit)
      dispatch({ type: 'IS_READY_TO_TASKS', isReadyToTasks: true })
  }

  componentDidMount() {
    const { dispatch, selectedProfile, profileData } = this.props
    dispatch(actions.fetchProfileIfNeeded(selectedProfile))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedProfile !== this.props.selectedProfile) {
      const { dispatch, selectedProfile } = nextProps
      dispatch(actions.fetchProfileIfNeeded(selectedProfile))
    }
  }

  render() {
    const { profileData, insurance, bodyParams, token, isFetching, isBabyFeed,
      birthday, babyBirthday, babyFeed, isReadyToTasks, dispatch, sportsPast } = this.props
    let { injuries } = this.props
    const isEmpty = !profileData || !profileData.email
    const insuranceIsEmpty = !insurance

    console.log(profileData)

    return (
      <div className="entry__inner">
        {isEmpty
          ? (isFetching
            ? <LoadingView title="Загружается..."/>
            : <LoadingView title="Ничего не найдено"/>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <SubmitValidationForm
              bodyMeasure={bodyParams}
              isReadyToTasks={isReadyToTasks}
              date={moment(profileData.birthday).format('YYYY-MM-DD')}
              babyDate={moment(profileData.babyBirthday).format('YYYY-MM-DD')}
              feedDate={moment(profileData.lastBabyFeedMonth).format('YYYY-MM-DD')}
              injuriesEx={profileData.injuriesExist}
              isReadyToTasks={isReadyToTasks}
              isBabyFeed={profileData.isBabyFeeding}
              initialValues={{
                ...profileData,
                country: !profileData.country ? 'Россия' : profileData.country,
                city: !profileData.city ? 'Москва' : profileData.city,
                fullName: !insuranceIsEmpty && insurance.fullName
                  ? insurance.fullName : '' ,
                profession: !insuranceIsEmpty && insurance.profession
                  ? insurance.profession : '',
                passport: !insuranceIsEmpty && insurance.passport
                  ? insurance.passport : '',
                address: !insuranceIsEmpty && insurance.address
                  ? insurance.address : '',
                insuranceFile: !insuranceIsEmpty && insurance.insuranceFile
                  ? insurance.insuranceFile : []
              }}
              onSubmit={ data => {

                let isValidBirthday = true
                let isValidBabyBirhday = true
                let isValidBabyFeed = true

                if (!window.mobilecheck()) {
                  console.log('MOBILE')
                  console.log(data)
                  data.birthday = birthday

                  if (babyBirthday)
                    data.babyBirthday = babyBirthday

                  if (babyFeed)
                    data.lastBabyFeedMonth = babyFeed
                } else {
                  console.log('check')
                  console.log(data)
                  data.birthday = moment(data.birthday).format('YYYY-MM-DD')
                  console.log(data.birthday)
                  console.log(moment(data.birthday, 'YYYY-MM-DD', true).isValid())
                  isValidBirthday = moment(data.birthday, 'YYYY-MM-DD', true).isValid()

                  data.birthday = birthday

                  if (babyBirthday)
                    data.babyBirthday = babyBirthday

                  if (babyFeed)
                    data.lastBabyFeedMonth = babyFeed

                  if (data.program === 2) {
                    console.log(data.babyBirthday)
                    console.log(data.lastBabyFeedMonth)
                    data.babyBirthday = moment(data.babyBirthday).format('YYYY-MM-DD')
                    data.lastBabyFeedMonth = moment(data.lastBabyFeedMonth).format('YYYY-MM-DD')
                    isValidBabyBirhday = moment(data.babyBirthday, 'YYYY-MM-DD', true).isValid()
                    isValidBabyFeed = moment(data.lastBabyFeedMonth, 'YYYY-MM-DD', true).isValid()
                  }
                }

                if (isValidBirthday && isValidBabyBirhday && isValidBabyFeed) {
                  this.refs.loadingModal.show()
                  data.injuries = injuries.join()
                  data.didSports = sportsPast
                  data.isBabyFeeding = isBabyFeed

                  delete data.password
                  const payload = {
                    authToken: token ? token : cookie.load('token'),
                    data
                  }

                  return fetch(`${api}/user/user-update`, {
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(payload)
                  })
                  .then(response => response.json())
                  .then(user => {
                    console.log('userrrrrrrrrrrrrrrrrrrrrrr')
              console.log(user)
                    this.refs.loadingModal.hide()
                    if (!user.data) {
                      throw new SubmissionError({ _error: 'Что-то пошло не так, попробуйте снова.' })
                    } else {
                      this.refs.successModal.show()
                    }
                  })
                } else if (data.program === 2) {
                  this.refs.failDatesModal.show()
                } else {
                  this.refs.failBirthdayModal.show()
                }
              }}
            />
            <Modal ref='successModal' contentStyle={contentStyle}>
              <h2>Профиль обновлен!</h2>
              <br/>
              <h4>Мы проверим анкету на наличие опечаток и пришлём подтверждение по почте. Ознакомьтесь с разделом Вопросы/Ответы!</h4>
              <br/>
              <div className="btn btn--primary" onClick={() => {
                browserHistory.push('/task')
              }}>
                К заданиям
              </div>
              <div className="divider" />
              <div className="btn btn--action" onClick={() => {
                this.refs.successModal.hide()
                dispatch({ type: 'IS_READY_TO_TASKS', isReadyToTasks: true })
              }}>
                Продолжить
              </div>
            </Modal>

            <Modal ref='failBirthdayModal' contentStyle={contentStyle}>
              <h2>Дата вашего рождения не верна, проверьте формат даты</h2>
              <br/>
              <div className="btn btn--action" onClick={() => {
                this.refs.failBirthdayModal.hide()
              }}>
                Продолжить
              </div>
            </Modal>

            <Modal ref='failDatesModal' contentStyle={contentStyle}>
              <h2>Дата вашего рождения, рождения вашего ребенка или последнего месяца кормления грудью не верны</h2>
              <br/>
              <div className="btn btn--action" onClick={() => {
                this.refs.failDatesModal.hide()
              }}>
                Продолжить
              </div>
            </Modal>

            <Modal ref='loadingModal' contentStyle={contentStyle} backdrop={false}>
              <h2>Подождите...</h2>
            </Modal>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
	console.log('profilecreate')
	console.log(state)

  const { selectedProfile, recivedProfile, userToken, birthday, isBabyFeeding,
    babyBirthday, babyFeed, isReadyToTasks, injuries, sportsPast } = state
  const {
    isFetching,
    lastUpdated,
    profileData,
    insurance,
    bodyParams
  } = recivedProfile[selectedProfile] || {
    isFetching: true,
    profileData: {}
  }

  return {
    selectedProfile,
    isFetching,
    lastUpdated,
    profileData,
    insurance,
    bodyParams,
    birthday,
    babyBirthday,
    babyFeed,
    isReadyToTasks,
    injuries,
    sportsPast,
    isBabyFeed: isBabyFeeding,
    token: userToken.token
  }
}

ProfileCreate = connect(
  mapStateToProps
)(ProfileCreate)

export default ProfileCreate
