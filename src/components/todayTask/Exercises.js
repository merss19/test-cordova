import React, { Component } from 'react'
import TaskItem from './TaskItem';

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
    const { sendReport, tasks, token } = this.props
    return (
      <div className="stage-box stage-box--big-padding">

        <h2 className="h1">Задание на день</h2>

        <ul className="task">
          {tasks.map((task, index) => {
            return (<li id={`task-${index}`} key={index} className="task__item">
              <TaskItem task={task} index={index} token={token}/>
            </li>
            )})}
        </ul>

        <div ref='taskResults' className="tasks-results">
          <h2 className="h1 tasks-results__title">Подведем итоги?</h2>
          <p className="tasks-results__desc">Молодец! На сегодня программа выполнена! Это конечно не максимум того, что мы могли бы сделать вместе, но у нас еще есть немного времени впереди</p>
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
