import React, { PropTypes } from 'react'
import tingle from 'tingle.js'

const Exercises = props => {
  return (
    <div className="stage-box stage-box--big-padding">

      <h2 className="h1">Задание на первый день</h2>

      <ul className="task">
        <li className="task__item task__item--complete">
          <div className="task__header">
            <div className="task__title">
              <span className="task__number">
                <span>1</span>
              </span>
              <span className="task__name">Круговая тренировка 3 упражнения 4 круга отдых между подходами 55 сек</span>
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
            <p className="base-parag text-center">Отжимания под углом 45 градусов 10 раз, приседания руки за головой 15 раз, выпады на месте 10 раз</p>
            <ul className="num-list">
              <li className="num-list__item">
                <span className="num-list__number">1</span>
                <p className="num-list__description"><a href="#" className="video-pupup">Отжимания под углом 45 градусов</a></p>
              </li>
              <li className="num-list__item">
                <span className="num-list__number">2</span>
                <p className="num-list__description"><a href="#" className="video-pupup">Приседания руки за головой</a></p>
              </li>
              <li className="num-list__item">
                <span className="num-list__number">3</span>
                <p className="num-list__description"><a href="#" className="video-pupup">Выпады на месте</a></p>
              </li>
            </ul>

            <p className="base-parag">Круговая тренировка означает, что ты делаешь десять раз отжимания, затем без перерыва пятнадцать приседаний и сразу без перерыва выпады на месте.</p>
            <p className="base-parag">Затем ты делаешь перерыв около минуты и потом снова повторяешь эти три упражнения.</p>

            <p className="base-parag">Все, теперь в душ!</p>

            <hr/>

            <h3 className="h3">Pекомендации по питанию</h3>

            <div className="grid">
              <div className="1/1--pocket 1/2--lap 1/2--desk grid__cell">
                <table className="base-table">
                  <tr>
                    <td>Белки</td>
                    <td className="base-table__cell-center">40 гр.</td>
                  </tr>
                  <tr>
                    <td>Жиры</td>
                    <td className="base-table__cell-center">40 гр.</td>
                  </tr>
                  <tr>
                    <td>Углеводы</td>
                    <td className="base-table__cell-center">10 гр.</td>
                  </tr>
                </table>
              </div>
              <div className="1/1--pocket 1/2--lap 1/2--desk grid__cell">
                <p className="base-parag"><strong>Как примерно эти граммы выглядят:</strong></p>
                <ul className="base-list">
                  <li className="base-list__item">Завтрак - гречка</li>
                  <li className="base-list__item">Перекус - салат мимоза со вчера оставшийся</li>
                  <li className="base-list__item">Обед - суп гороховый</li>
                  <li className="base-list__item">Полдник - отварная грудка</li>
                </ul>
              </div>
            </div>

            <p className="base-parag">Ужин отдай врагу (у кого нет врагов поясняем - вообще ничего на ужин не готовьте, а лягте пораньше спать!:)</p>

            <p className="base-parag">Советы от паталогоанатома, не вздумай им следовать, слабак!</p>

            <p className="base-parag">Ты сегодня ничего не сделал и не собираешься? Тогда, мой любимый ленивец, вот тебе моя отговорка:</p>

            <p className="base-parag">Сегодня всего лишь второе января. Еще так много всего вредного, но вкусного недоедено и ведь жаль это выбрасывать (и выливать тоже жаль). А по телевизору Эрнст Константинович заготовил столько всего интересного, пропустить это было бы преступлением! Для тебя ведь старался! Лежи в кроватке весь день, но не забывай почаще возвращаться к холодильнику. А лучше побольше оливье (или что там у тебя припасено) положи поближе к себе - так удобнее и сохраннее. И передавай от меня привет своей печени - мы уже очень скоро встретимся.</p>

            <p className="base-parag">Искренне твой, Анастас Кудимыч! Поцелуйчики, обнимашечки!!!</p>

            <div className="text-center">
              <div className="btn btn--secondary">Выполнил! Давай следующее!</div>
            </div>
          </div>
        </li>
        <li className="task__item">
          <div className="task__header">
            <div className="task__title">
              <span className="task__number">
                <span>2</span>
              </span>
              <span className="task__name">Второе задание</span>
            </div>
            <div className="btn-taks">
              <span className="checkbox">
                <label className="checkbox__label" htmlFor="task[2]">
                  <span className="checkbox__title">Выполнил</span>
                  <input className="checkbox__field checkbox__field--btn-taks" id="task[2]" type="checkbox"/>
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
            <p className="sub-title sub-title--line">Правильное выполнение продемонстрировано на видео. Правильная техника очень важна - следи за собой :)</p>
            <p className="base-parag text-center">Выполнять каждое утро упражнение по 4 раза, отдых между подходами 55 секунд</p>
            <ul className="num-list">
              <li className="num-list__item">
                <span className="num-list__number">1</span>
                <p className="num-list__description"><a href="#">Встаньте прямо, ноги чуть шире плеч.</a></p>
              </li>
              <li className="num-list__item">
                <span className="num-list__number">2</span>
                <p className="num-list__description">Опустите плечи и отведите их назад. Округлённая спина вам тут не нужна — в противном случае вы перегрузите поясницу. На протяжении всего упражнения важно сохранять прямую осанку.</p>
              </li>
              <li className="num-list__item">
                <span className="num-list__number">3</span>
                <p className="num-list__description">У рук может быть несколько положений. Первое — они вытянуты вперёд, ладони направлены вниз. Второе — согнуты в локтях и прижаты к туловищу, большие пальцы «смотрят» вверх. Третье — сложены за голову, локти в стороны. Четвёртое — в замке перед собой. Пятое — ладони лежат на талии.</p>
              </li>
            </ul>
            <div className="text-center">
              <div className="btn btn--secondary">Выполнил! Давай следующее!</div>
            </div>
          </div>
        </li>
      </ul>
      <div className="tasks-results">
        <h2 className="h1 tasks-results__title">Подведем итоги?</h2>
        <p className="tasks-results__desc">Молодец! На сегодня программа выполнена! Это конечно не максимум того, что мы могли бы сделать всметсе, но у нас еще есть немного времени впереди</p>
        <div className="text-center">
          <div className="btn btn--primary js-fill-report-1" onClick={props.sendReport}>
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

export default Exercises
