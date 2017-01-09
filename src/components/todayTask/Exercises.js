import React, { Component } from 'react'
import YoutubeModal from './YoutubeModal';

const contentStyle = {
  borderRadius: '18px',
  padding: '30px'
}

class Exercises extends Component {

  // componentWillMount() {
  //   if (window.mobilecheck()) {
  //     contentStyle.width = '300px'
  //   }
  // }


  render() {
    const { sendReport, tasks } = this.props
    return (
      <div className="stage-box stage-box--big-padding">

        <h2 className="h1">Задание на день</h2>

        <ul className="task">
          {tasks.map((task, index) => (
            <li id={index} key={index} className="task__item">
              <div className="task__header">
                <div className="task__title">
                  <span className="task__number">
                    <span>{index + 1}</span>
                  </span>
                  <span className="task__name">{task.name}</span>
                </div>
                <div id={`btn${index}`} className="btn-taks">
                  <span className="checkbox">
                    <label className="checkbox__label" htmlFor={`task[${index}]`}>
                      <span className="checkbox__title">Выполнил</span>
                      <input className="checkbox__field checkbox__field--btn-taks" id={`task[${index}]`} onClick={ e => {
                        const isNotDone = document.getElementById(index).className === 'task__item'
                        if (isNotDone) {
                          const nextElement = document.getElementById(`btn${index + 1}`)
                          let offset = 0

                          if (nextElement) {
                            offset = nextElement.offsetTop - 20
                          } else {
                            offset = this.refs.taskResults.offsetTop
                          }

                          window.scrollTo(0, offset)
                        }
                      }} type="checkbox"/>
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
                    <li key={ind} className="num-list__item">
                      <span className="num-list__number">{ind + 1}</span>
	                    <YoutubeModal exercise={exercise}
	                        ind={ind}>{exercise.description}
	                    </YoutubeModal>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <div ref='taskResults' className="tasks-results">
          <h2 className="h1 tasks-results__title">Подведем итоги?</h2>
          <p className="tasks-results__desc">Молодец! На сегодня программа выполнена! Это конечно не максимум того, что мы могли бы сделать всметсе, но у нас еще есть немного времени впереди</p>
          <div className="text-center">
            <div className="btn btn--primary js-fill-report-1" onClick={sendReport}>
              Заполнить отчет!
            </div>
          </div>

        </div>

        {/* <hr/>

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
        </div> */}
      </div>
    )
  }
}

export default Exercises
