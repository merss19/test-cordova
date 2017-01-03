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
    const { profileData, insurance, bodyParams, token, isFetching, birthday } = this.props
    const isEmpty = !profileData || !profileData.email
    const insuranceIsEmpty = !insurance || !insurance[insurance.length - 1]

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
              date={moment(profileData.birthday).format('DD.MM.YYYY')}
              injuriesEx={profileData.injuriesExist}
              initialValues={{
                ...profileData,
                country: !profileData.country ? 'Россия' : profileData.country,
                city: !profileData.city ? 'Москва' : profileData.city,
                fullName: !insuranceIsEmpty && insurance[insurance.length - 1].fullName
                  ? insurance[insurance.length - 1].fullName : '' ,
                profession: !insuranceIsEmpty && insurance[insurance.length - 1].profession
                  ? insurance[insurance.length - 1].profession : '',
                passport: !insuranceIsEmpty && insurance[insurance.length - 1].passport
                  ? insurance[insurance.length - 1].passport : '',
                address: !insuranceIsEmpty && insurance[insurance.length - 1].address
                  ? insurance[insurance.length - 1].address : '',
                insuranceFile: !insuranceIsEmpty && insurance[insurance.length - 1].insuranceFile
                  ? insurance[insurance.length - 1].insuranceFile : []

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
              <div className="btn btn--action" onClick={() => this.refs.successModal.hide()}>
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
  const { selectedProfile, recivedProfile, userToken, birthday } = state
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
    token: userToken.token
  }
}

ProfileCreate = connect(
  mapStateToProps
)(ProfileCreate)

export default ProfileCreate
