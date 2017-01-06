import React , { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
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
      contentStyle.width = '300px'
    }
  }

  componentDidMount() {
    const { dispatch, selectedProfile } = this.props
    dispatch(actions.fetchProfileIfNeeded(selectedProfile))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedProfile !== this.props.selectedProfile) {
      const { dispatch, selectedProfile } = nextProps
      dispatch(actions.fetchProfileIfNeeded(selectedProfile))
    }
  }

  render() {
    const { profileData, insurance, bodyParams, token, isFetching,
      birthday, isReadyToTasks, dispatch } = this.props
    const isEmpty = !profileData || !profileData.email
    const insuranceIsEmpty = !insurance

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
              date={moment(profileData.birthday).format('DD.MM.YYYY')}
              injuriesEx={profileData.injuriesExist}
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
                this.refs.loadingModal.show()
                data.birthday = birthday
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
                    this.refs.loadingModal.hide()
                    if (!user.data) {
                      throw new SubmissionError({ _error: 'Что-то пошло не так, попробуйте снова.' })
                    } else {
                      this.refs.successModal.show()
                    }
                  })
                }
              }
            />
            <Modal ref='successModal' contentStyle={contentStyle}>
              <h2>Профиль обновлен!</h2>
              <br/>
              <h4>Мы проверим анкету на наличие опечаток и пришлём подтверждение по почте. Ознакомьтесь с разделом ЧАВО!</h4>
              <br/>
              <div className="btn btn--action" onClick={() => {
                this.refs.successModal.hide()
                dispatch({ type: 'IS_READY_TO_TASKS', isReadyToTasks: true })
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
  const { selectedProfile, recivedProfile, userToken, birthday, isReadyToTasks } = state
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
    isReadyToTasks,
    token: userToken.token
  }
}

ProfileCreate = connect(
  mapStateToProps
)(ProfileCreate)

export default ProfileCreate
