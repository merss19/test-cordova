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
    profile: PropTypes.object,
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
    const { selectedProfile, profileData, dispatch, token, isFetching, lastUpdated } = this.props
    const isEmpty = profileData === undefined || profileData.data === undefined
    return (
      <div>
        {isEmpty
          ? (isFetching ? <h2>Загружается...</h2> : <h2>Ничего не найдено</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <SubmitValidationForm initialValues={profileData.data[0]} onSubmit={data => {
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
            }}/>
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

  const {
    isFetching,
    lastUpdated,
    profileData
  } = recivedProfile[selectedProfile] || {
    isFetching: true,
    profile: {}
  }

  return {
    selectedProfile,
    isFetching,
    lastUpdated,
    profileData,
    token: userToken.token
  }
}

ProfileCreate = connect(
  mapStateToProps
)(ProfileCreate)

export default ProfileCreate
