import React, { Component } from 'react'
import Modal from 'boron/DropModal'

const contentStyle = {
  borderRadius: '18px',
  padding: '30px'
}


class Exercises extends Component {
  render() {
    const { sendReport, tasks } = this.props
    return (
      <div className="stage-box stage-box--big-padding">

        <h2 className="h1">Задание на день</h2>

        <ul className="task">
          {tasks.map((task, index) => (
            <li key={index} className="task__item task__item--complete">
              <div className="task__header">
                <div className="task__title">
                  <span className="task__number">
                    <span>{index + 1}</span>
                  </span>
                  <span className="task__name">{task.name}</span>
                </div>
                <div className="btn-taks">
                  <span className="checkbox">
                    <label className="checkbox__label" htmlFor="task[1]">
                      <span className="checkbox__title">Готово!</span>
                      <input className="checkbox__field checkbox__field--btn-taks" id="task[1]" type="checkbox" defaultChecked/>
                      <span className="checkbox__ph">
                        <svg className="svg-icon ico-tick">
                          <use xlinkHref="#ico-tick"></use>
                        </svg>
                      </span>
                    </label>
                  </span>
                </div>
              </div>
              <div className="task-description">
                <h3 className="h3">Как правильно выполнять</h3>
                <p className="sub-title sub-title--line">Как правильно выполнять показано на видео. Правильная техника важна - следи за собой :)</p>
                <p className="base-parag text-center">{task.description}</p>
                <ul className="num-list">
                  {task.exercises.map((exercise, ind) => (
                    <li key={index} className="num-list__item">
                      <span className="num-list__number">{index + 1}</span>
                      <p className="num-list__description">
                        <a href="#" className="video-pupup" onClick={ e => {
                          e.preventDefault()
                          this.props.refs.videoModal.show()
                        }}>
                          {exercise.description}
                        </a>
                      </p>
                      <Modal ref='videoModal' modalStyle={contentStyle}>
                        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/E3Wq9YxqTI4" frameborder="0" allowfullscreen=""></iframe>
                      </Modal>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <div className="tasks-results">
          <h2 className="h1 tasks-results__title">Подведем итоги?</h2>
          <p className="tasks-results__desc">Молодец! На сегодня программа выполнена! Это конечно не максимум того, что мы могли бы сделать всметсе, но у нас еще есть немного времени впереди</p>
          <div className="text-center">
            <div className="btn btn--primary js-fill-report-1" onClick={sendReport}>
              Заполнить отчет!
            </div>
          </div>

        </div>

        <hr/>

        <div className="share-box">
          <h2 className="h1 share-box__title">Делись результатами</h2>
          <ul className="btn-social">
            <li className="btn-social__item btn-social__item--vk">
              <svg className="svg-icon ico-vk">
                <use xlinkHref="#vk"></use>
              </svg>
              <span className="btn-social__title">Вконтакте</span>
            </li>
            <li className="btn-social__item btn-social__item--odnoklassniki">
              <svg className="svg-icon ico-odnoklassniki">
                <use xlinkHref="#odnoklassniki"></use>
              </svg>
              <span className="btn-social__title">Одноклассники</span>
            </li>
            <li className="btn-social__item btn-social__item--fb">
              <svg className="svg-icon ico-fb">
                <use xlinkHref="#fb"></use>
              </svg>
              <span className="btn-social__title">facebook</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Exercises
