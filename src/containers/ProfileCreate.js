import React , { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { SubmissionError } from 'redux-form'
import SubmitValidationForm from '../components/profile/SubmitValidationForm'
import cookie from 'react-cookie'
import Modal from 'boron/DropModal'

const contentStyle = {
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
    const { profileData, insurance, bodyParams, token, isFetching } = this.props
    const isEmpty = !profileData || !profileData.email

    console.log('<=========||===')
    console.log(profileData)
    console.log(isEmpty)
    return (
      <div>
        {isEmpty
          ? (isFetching ? <h2>Загружается...</h2> : <h2>Ничего не найдено</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <SubmitValidationForm
              insurance={insurance}
              bodyMeasure={bodyParams}
              initialValues={profileData}
              onSubmit={data => {
                const payload = {
                  authToken: token ? token : cookie.load('token'),
                  data
                }

                return fetch('http://sport.muhanov.net/api/user/user-update', {
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(payload)
                  })
                  .then(response => response.json())
                  .then(user => {
                    if (!user.data) {
                      throw new SubmissionError({ _error: 'Что-то пошло не так, попробуйте снова.' })
                    } else {
                      this.refs.successModal.show()
                    }
                  })
                }
              }
            />
            <Modal ref='successModal' modalStyle={contentStyle}>
              <h2>Профиль обновлен!</h2>
            </Modal>
          </div>
        }
      </div>
    )
  }
}


const mapStateToProps = state => {
  const { selectedProfile, recivedProfile, userToken } = state

  // console.log('<<<<<<<==)==0')
  // console.log(recivedProfile)
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
    token: userToken.token
  }
}

ProfileCreate = connect(
  mapStateToProps
)(ProfileCreate)

export default ProfileCreate
