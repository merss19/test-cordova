import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Header from '../../stories/Header'
import Menu from './Menu'
import FoodEditorValidationForm from './FoodEditorValidationForm'
import LoadingView from '../componentKit/LoadingView'
import cookie from 'react-cookie'
import moment from 'moment'
import { api } from '../../config.js'
import Modal from 'boron/FadeModal'

let contentStyle = {
  borderRadius: '18px',
  padding: '30px'
}

class FoodEditor extends Component {
  componentDidMount() {
    const fbScript = document.createElement("script")
    fbScript.text = "fbq('track', 'PageView');"
    document.body.appendChild(fbScript)

    const { dispatch, selectedFood, selectedPrograms } = this.props
    dispatch(actions.fetchFoodIfNeeded(selectedFood))
    dispatch(actions.fetchProgramsIfNeeded(selectedPrograms))
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, selectedFood, selectedPrograms } = nextProps

    if (nextProps.selectedFood !== this.props.selectedFood)
      dispatch(actions.fetchFoodIfNeeded(selectedFood))

    if (nextProps.selectedPrograms !== this.props.selectedPrograms)
      dispatch(actions.fetchProgramsIfNeeded(selectedPrograms))
  }

  render() {
    const { food, token, isFetching, editDay, dayIntro, dayDate,
      programs, program, foodDescription, selectedFood, dispatch, editor, content } = this.props
    const isEmpty = !programs || !food

    console.log('<<<<<<')
    console.log(food)

    return (
      <div className='layout'>
        <Header burger={false} />
        {isEmpty
          ? isFetching
            ? <LoadingView title="Загружается..."/>
            : <LoadingView title="Ничего не найдено"/>
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <div className="layout__inner">
                <FoodEditorValidationForm
                  food={food}
                  program={this.props.params.program}
                  programs={programs}
                  foodProgram={program}
                  editor={editor}
                  onSubmit={ data => {
                    this.refs.loadingModal.show()

                    const payload = {
                      authToken: token ? token : cookie.load('token'),
                      data: {
                        id: program,
                        description: foodDescription,
                        content: JSON.stringify(content[program-1])
                      }
                    }

                    const headers = {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    }

                    const method = 'POST'
                    return fetch(`${api}/day/food-update`, {
                      headers,
                      method,
                      body: JSON.stringify(payload)
                    })
                    .then(response => response.json())
                    .then(json => {
                      this.refs.loadingModal.hide()
                      if (json.errorCode === 1) {
                        dispatch(actions.fetchFoodIfNeeded(selectedFood))
                        this.refs.successPromoModal.show()
                      } else {
                        this.refs.errorModal.show()
                      }
                    })
                }}/>
                <Modal ref='loadingModal' contentStyle={contentStyle} backdrop={false}>
                  <h2>Подождите...</h2>
                </Modal>
                <Modal ref='errorModal' contentStyle={contentStyle}>
                  <h2>Что-то пошло не так, попробуйте снова</h2>
                  <br/>
                  <button className="btn btn--action" onClick={() => this.refs.errorModal.hide()}>
                    Продолжить
                  </button>
                </Modal>
                <Modal ref='successPromoModal' contentStyle={contentStyle}>
                  <h2>Изменения сохранены</h2>
                  <br/>
                  <button className="btn btn--action" onClick={() => this.refs.successPromoModal.hide()}>
                    Продолжить
                  </button>
                </Modal>
              </div>
            </div>
          }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedPrograms, recivedPrograms, selectedFood, recivedFood,
    userToken, foodProgram, foodDescription, editor, content } = state
  const {
    isFetching,
    food,
  } = recivedFood[selectedFood] || {
    isFetching: true,
    food: []
  }

  const { programs } = recivedPrograms[selectedPrograms] || []

  return {
    selectedFood,
    selectedPrograms,
    isFetching,
    food,
    program: foodProgram,
    foodDescription,
    programs,
    editor,
    content,
    token: userToken.token
  }
}

FoodEditor = connect(
  mapStateToProps
)(FoodEditor)

export default FoodEditor
