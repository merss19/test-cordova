import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router'
import Header from '../../stories/Header'
import RadioProfile from '../componentKit/RadioProfile'

import CustomInput from '../componentKit/CustomInput'
import InputProfile from '../componentKit/InputProfile'
import CheckboxProfile from '../componentKit/CheckboxProfile'

const SubmitValidationForm = props => {
  const { error, handleSubmit, pristine, reset, submitting } = props
  return (
    // <form onSubmit={handleSubmit(props.onSubmit)}>
    //   <br/>
    //   <Field name='firstName' title='Имя' component={CustomInput} />
    //   <Field name='lastName' title='Фамилия' component={CustomInput} />
    //   <Field name='gender' title='Пол' component={CustomInput} />
    //   <Field name='country' title='Страна' component={CustomInput} />
    //   <Field name='city' title='Город' component={CustomInput} />
    //   <Field name='phone' title='Номер телефона' component={CustomInput} />
    //   <Field name='email' title='Email' component={CustomInput} />
    //   <Field name='password' title='Пароль' component={CustomInput} type='password' />
    //   <Field name='birthday' title='День Рождения' component={CustomInput} />
    //   <Field name='height' title='Рост' component={CustomInput} />
    //   <Field name='weight' title='Вес' component={CustomInput} />
    //   <Field name='squatsCount' title='Количество приседаний за минуту' component={CustomInput} />
    //   {error && <strong>{error}</strong>}
    //
    //   <br/>
    //   <button type='submit'>
    //     Сохранить
    //   </button>
    //
    //   <Link to="/task">Кабинет</Link>
    //
    // </form>

    <div className="layout">

      <Header/>

      <div className="layout__inner layout__inner--profile">
        <div className="stage-box stage-box--small-padding">

          <h1 className="h1">Профиль</h1>

          <hr/>

          <h3 className="h3">Личные данные</h3>

          <div className="text-center">
            <div className="avatar avatar--profile">
              <label className="upload-file avatar--upload" htmlFor="ava[1]">
                <input id="ava[1]" type="file" className="upload-file__input"/>
              </label>
              <div className="avatar__img-wrap">
                <img className="avatar__img" src="assets/img/png/ava-ph-big.png" alt=""/>
              </div>
            </div>
          </div>

          <hr/>

          <div className="gender">
            <p className="gender__title">Пол</p>
            <Field name='gender' title='Мужчина' id="gender[1]" component={RadioProfile} />
            <Field name='gender' title='Женщина' id="gender[2]" component={RadioProfile} />
          </div>

          <hr/>

          <Field name="firstName" placeholder="Имя" component={InputProfile} />
          <Field name="secondName" placeholder="Фамилия" component={InputProfile} />

          <p className="base-parag">Дата рождения</p>
          <div className="input input--box mb30">
            <input type="text" className="input__field input__field--date" placeholder="д/М/гггг" defaultValue=""/>
          </div>

          <h3 className="h3">Контактные данные</h3>

          <div className="select">
            <select className="select__field">
              <option defaultValue="02">Россия</option>
              <option defaultValue="01">Украина</option>
            </select>
            <svg className="svg-icon ico-arrow-accordion">
              <use xlinkHref="#ico-arrow-accordion"></use>
            </svg>
          </div>

          <div className="select">
            <select className="select__field">
              <option defaultValue="02">Москва</option>
              <option defaultValue="01">Одесса</option>
            </select>
            <svg className="svg-icon ico-arrow-accordion">
              <use xlinkHref="#ico-arrow-accordion"></use>
            </svg>
          </div>

          <Field name="phone" type="tel" placeholder="+7 ХХХ ХХХ ХХ ХХ" component={InputProfile} />
          <Field disabled name="email" type="tel" placeholder="Почта" defaultValue="anna@gmail.com" component={InputProfile} />

          <div className="select mb30">
            <select className="select__field">
              <option defaultValue="02">Часовой пояс Минкс+1</option>
              <option defaultValue="01">Часовой пояс Минкс+1</option>
            </select>
            <svg className="svg-icon ico-arrow-accordion">
              <use xlinkHref="#ico-arrow-accordion"></use>
            </svg>
          </div>

          <div className="text-center">
            <div className="btn btn--primary">Сохранить изменения</div>
          </div>

          <hr/>

          <div className="grid">
            <div className="grid__cell">
              <h3 className="h3">Привязка к социальным сетям</h3>
              <ul className="btn-social">
                <li className="btn-social__item btn-social__item--vk">
                  <svg className="svg-icon ico-vk">
                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#vk"></use>
                  </svg>
                  <span className="btn-social__title">Вконтакте</span>
                </li>
                <li className="btn-social__item btn-social__item--odnoklassniki">
                  <svg className="svg-icon ico-odnoklassniki">
                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#odnoklassniki"></use>
                  </svg>
                  <span className="btn-social__title">Одноклассники</span>
                </li>
                <li className="btn-social__item btn-social__item--fb">
                  <svg className="svg-icon ico-fb">
                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#fb"></use>
                  </svg>
                  <span className="btn-social__title">facebook</span>
                </li>
              </ul>
            </div>
          </div>

          <hr/>

          <h3 className="h3">Для программы "Мама может"</h3>

          <div className="grid mb30">
            <div className="1/2--desk 1/1-pocket grid__cell">
              <p className="base-parag">Дата рождения последнего ребёнка</p>
              <Field name="babyBirthday" placeholder="д/М/гггг" component={InputProfile} />
            </div>
            <div className="1/2--desk 1/1-pocket grid__cell">
              <p className="base-parag">Месяц когда перестали кормить грудью</p>
              <Field name="lastBabyFeedMonth" placeholder="д/М/гггг" component={InputProfile} />
            </div>
          </div>

          <h3 className="h3">Страховка</h3>
          <p className="sub-title">Обеспечь свою безопасность. Это займет всего 2 минуты</p>

          <div className="text-center mb30">
            <div className="btn btn--secondary">Активировать страховку</div>
          </div>

          <p className="sub-title">Для того, чтобы добиться быстрых и качественных результатов тренеру важно знать некоторые особенности твоего организма. Это поможет ему правильно распределить нагрузку на мышцы и организовать последовательность тренировок, не навредив твоему организму</p>

          <hr/>

          <p className="base-parag text-center">Как у тебя со спортом? Выбери свой уровень</p>

          <ul className="options options--white mtb30">
            <li className="options__item">Сложно</li>
            <li className="options__item is-active">Нормально</li>
            <li className="options__item">Хорошо</li>
            <li className="options__item">Отлично</li>
          </ul>

          <p className="base-parag text-center">Занимался спортом раньше?</p>

          <ul className="options options--white mtb30">
            <li className="options__item">Да</li>
            <li className="options__item is-active">Нет</li>
          </ul>

          <div className="text-center">
            <Field name='insurance' title='Я любитель' id="insurance[1]" component={RadioProfile} />
            <Field name='insurance' title='Я профи' id="insurance[2]" component={RadioProfile} />
          </div>

          <hr/>

          <p className="base-parag text-center ">Есть травмы или проблемные зоны?</p>

          <ul className="options options--white mtb30">
            <li className="options__item">Есть</li>
            <li className="options__item is-active">Нет</li>
          </ul>

          <ul className="checkboxes">
            <Field name='injuries' title='Шея/Плечи' id='insurance[3]' component={CheckboxProfile} />
            <Field name='injuries' title='Руки' id='insurance[4]' component={CheckboxProfile} />
            <Field name='injuries' title='Спина/Поясница' id='insurance[5]' component={CheckboxProfile} />
            <Field name='injuries' title='Колени' id='insurance[6]' component={CheckboxProfile} />
            <Field name='injuries' title='Другое' id='insurance[7]' component={CheckboxProfile} />
          </ul>

          <hr/>

          <p className="base-parag text-center">А хронические заболевания?</p>

          <ul className="options options--white mtb30">
            <li className="options__item">Есть</li>
            <li className="options__item is-active">Нет</li>
          </ul>

          <ul className="checkboxes mb20">
            <Field name='diseases' title='Диабет' id='insurance[8]' component={CheckboxProfile} />
            <Field name='diseases' title='Сердце' id='insurance[9]' component={CheckboxProfile} />
            <Field name='diseases' title='Почки' id='insurance[10]' component={CheckboxProfile} />
            <Field name='diseases' title='Поджелудочная' id='insurance[11]' component={CheckboxProfile} />
            <Field name='diseases' title='Другое' id='insurance[12]' component={CheckboxProfile} />
          </ul>

          <Field name="diseases" placeholder="Другое" component={InputProfile} />

          <hr/>

          <p className="base-parag text-center">Какое у тебя давление?</p>

          <ul className="options options--white mtb30">
            <li className="options__item">Пониженное</li>
            <li className="options__item is-active">Нормальное</li>
            <li className="options__item">Повышенное</li>
          </ul>

          <p className="base-parag text-center">Что со вредными привычками?</p>

          <ul className="options options--white mtb30">
            <li className="options__item">Есть</li>
            <li className="options__item is-active">Нет</li>
          </ul>

          <hr/>

          <h3 className="h3">Осталось решить всего 1 вопрос и бонусы будут у тебя в копилочке!</h3>

          <p className="sub-title">Посчитай сколько раз ты приседаешь за 1 минуту и запиши цифру</p>

          <div className="input input--box mb30">
            <input type="text" className="input__field" placeholder="Впиши свой результат сюда"/>
          </div>

          <p className="base-rapag text-center">Вот тебе таймер обратного отсчета. Запускай и начинай приседать</p>

          <div className="timer">
            <input type="text" className="timer__min" defaultValue="1"/>
            <input type="text" className="timer__sec" defaultValue="20"/>
          </div>

          <div className="text-center mb30">
            <div className="btn btn--secondary">Начать</div>
          </div>

          <hr/>

          <div className="text-center">
            <div className="btn btn--primary">Отправить анкеру</div>
          </div>

        </div>
      </div>

      <ul className="menu-mob-bottom">
        <li className="menu-mob-bottom__item menu-mob-bottom__item--active">
          <a href="#" className="menu-mob-bottom__item-inner">
            <span className="menu-mob-bottom__ico">
              <svg className="svg-icon ico-m-tasks">
                <use xlinkHref="#ico-m-tasks"></use>
              </svg>
            </span>
            <span className="menu-mob-bottom__title">Задания</span>
          </a>
        </li>
        <li className="menu-mob-bottom__item">
          <a href="#" className="menu-mob-bottom__item-inner">
            <span className="menu-mob-bottom__ico">
              <svg className="svg-icon ico-m-book">
                <use xlinkHref="#ico-m-book"></use>
              </svg>
            </span>
            <span className="menu-mob-bottom__title">Зачетка</span>
          </a>
        </li>
        <li className="menu-mob-bottom__item">
          <a href="#" className="menu-mob-bottom__item-inner">
            <span className="menu-mob-bottom__ico">
              <svg className="svg-icon ico-m-food">
                <use xlinkHref="#ico-m-food"></use>
              </svg>
            </span>
            <span className="menu-mob-bottom__title">Питание</span>
          </a>
        </li>
        <li className="menu-mob-bottom__item">
          <a href="#" className="menu-mob-bottom__item-inner">
            <span className="menu-mob-bottom__ico">
              <svg className="svg-icon ico-m-faq">
                <use xlinkHref="#ico-m-faq"></use>
              </svg>
            </span>
            <span className="menu-mob-bottom__title">ЧАВО</span>
          </a>
        </li>
      </ul>

      <div className="menu-mob-left">
        <div className="menu-mob-left__inner">
          <div className="menu-mob-left__ico-close">
            <svg className="svg-icon ico-close">
              <use xlinkHref="#ico-close"></use>
            </svg>
          </div>
          <div className="menu-mob-left__logo">
            <svg className="svg-icon ys_logo_web">
              <use xlinkHref="#ys_logo_web"></use>
            </svg>
          </div>
          <ul className="main-nav">
            <li className="main-nav__item main-nav__item--active">
              <a href="#" className="main-nav__item-inner">
                <svg className="svg-icon ico-m-tasks">
                  <use xlinkHref="#ico-m-tasks"></use>
                </svg>
                <span className="main-nav__title">Задания</span>
              </a>
            </li>
            <li className="main-nav__item">
              <a href="#" className="main-nav__item-inner">
                <svg className="svg-icon ico-m-book">
                  <use xlinkHref="#ico-m-book"></use>
                </svg>
                <span className="main-nav__title">Зачетка</span>
              </a>
            </li>
            <li className="main-nav__item">
              <a href="#" className="main-nav__item-inner">
                <svg className="svg-icon ico-m-food">
                  <use xlinkHref="#ico-m-food"></use>
                </svg>
                <span className="main-nav__title">Питание</span>
              </a>
            </li>
            <li className="main-nav__item">
              <a href="#" className="main-nav__item-inner">
                <svg className="svg-icon ico-m-faq">
                  <use xlinkHref="#ico-m-faq"></use>
                </svg>
                <span className="main-nav__title">ЧАВО</span>
              </a>
            </li>
          </ul>
          <hr/>
          <div className="profile">
            <a href="#">
              <p className="profile__name">Анна Иванова</p>
              <p className="profile__sub-text">Профиль</p>
            </a>
          </div>
          <hr/>
          <ul className="banner-ls banner-ls--menu-mob-left">
            <li className="banner-ls__item">
              <a href="#">
                <div className="banner-ls__img">
                  <img src="tmp/banner-2.png" alt=""/>
                </div>
                <p className="banner-ls__desc">В твой выходной день только сегодня TezTour дарит -10% на тур</p>
              </a>
            </li>
            <li className="banner-ls__item">
              <a href="#">
                <div className="banner-ls__img">
                  <img src="tmp/banner-1.png" alt=""/>
                </div>
              </a>
            </li>
          </ul>
          <hr/>
          <div className="btn btn--action">Выйти из кабинета</div>
        </div>
      </div>

    </div>
  )
}

const validate = data => {
  const errors = {}

  if (!data.firstName) {
    errors.firstName = 'Имя должно быть заполнено'
  }

  if (!data.lastName) {
    errors.lastName = 'Фамилия должна быть заполнена'
  }

  if (!data.gender) {
    errors.gender = 'Пол должен быть заполнен'
  }

  if (!data.country) {
    errors.country = 'Поле страны должно быть заполнено'
  }

  if (!data.city) {
    errors.city = 'Город должнен быть заполнен'
  }

  if (!data.phone) {
    errors.phone = 'Поле телефона должно быть заполнено'
  }

  if (!data.email) {
    errors.email = 'Email должен быть заполнен'
  }

  if (!data.password) {
    errors.password = 'Поле пароля должно быть заполнено'
  }

  if (!data.birthday) {
    errors.birthday = 'День Рождения должен быть заполнен'
  }

  if (!data.height) {
    errors.height = 'Рост должен быть заполнен'
  }

  if (!data.weight) {
    errors.weight = 'Вес должен быть заполнен'
  }

  if (!data.squatsCount) {
    errors.squatsCount = 'Количество приседаний должно быть заполнено'
  }

  return errors
}

export default reduxForm({
  form: 'submitValidation',
  validate
})(SubmitValidationForm)
