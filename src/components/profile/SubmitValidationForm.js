import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router'
import Header from '../../stories/Header'

import RadioProfile from '../componentKit/RadioProfile'
import CustomInput from '../componentKit/CustomInput'
import InputProfile from '../componentKit/InputProfile'
import CheckboxProfile from '../componentKit/CheckboxProfile'
import SelectProfile from '../componentKit/SelectProfile'
import InputProfileBirthday from '../componentKit/InputProfileBirthday'

let injuries = []
let diseases = []

const SubmitValidationForm = props => {
  const { error, handleSubmit, pristine, reset, submitting } = props

  const sports = [
    'Сложно',
    'Нормально',
    'Хорошо',
    'Отлично'
  ]

  const sportsPast = [
    { text: 'Да', val: true },
    { text: 'Нет', val: false }
  ]

  const injuriesExist = [
    { text: 'Есть', val: true },
    { text: 'Нет', val: false }
  ]

  const injuriesList = [
    'Шея/Плечи',
    'Руки',
    'Спина/Поясница',
    'Колени',
    'Другое'
  ]

  const diseasesList = [
    'Диабет',
    'Сердце',
    'Почки',
    'Поджелудочная',
    'Другое'
  ]

  const pressure = [
    'Пониженное',
    'Нормальное',
    'Повышенное'
  ]

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
                <img className="avatar__img" src="/assets/img/png/ava-ph-big.png" alt=""/>
              </div>
            </div>
          </div>

          <hr/>

          <div className="gender">
            <p className="gender__title">Пол</p>
            <Field name="gender" val="male" title="Мужчина" id="gender[1]" component={RadioProfile} />
            <Field name="gender" val="female" title="Женщина" id="gender[2]" component={RadioProfile} />
          </div>

          <hr/>

          <Field name="firstName" placeholder="Имя" component={InputProfile} />
          <Field name="lastName" placeholder="Фамилия" component={InputProfile} />

          <p className="base-parag">Дата рождения</p>
          <Field name="birthday" placeholder="д/М/гггг" component={InputProfileBirthday} />

          <h3 className="h3">Контактные данные</h3>

          <Field name="country" options={['Россия', 'Украина']} component={SelectProfile} />
          <Field name="city" options={['Москва', 'Одесса']} component={SelectProfile} />

          <Field name="phone" type="tel" placeholder="+7 ХХХ ХХХ ХХ ХХ" component={InputProfile} />
          <Field disabled name="email" type="tel" placeholder="Почта" defaultValue="anna@gmail.com" component={InputProfile} />

          <Field name="timezone" options={['Часовой пояс Минкс+1', 'Часовой пояс Москва+3']} component={SelectProfile} />

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
            {sports.map((val, index) => (
              <label key={index}>
                <li name="sports" className="options__item" id={`sports[${index}]`} onClick={e => {
                  document.getElementById(`sports[${index}]`).className += ' is-active'
                  sports.map((v, i) => {
                    if (index !== i)
                      document.getElementById(`sports[${i}]`).className = "options__item"
                  })
                }}>
                  <Field component='input' type='radio' name="sports" style={{visibility: 'hidden', margin: -5}} value={val}/>
                  {val}
                </li>
                <span/>
              </label>
            ))}
          </ul>

          <p className="base-parag text-center">Занимался спортом раньше?</p>

          <ul className="options options--white mtb30">
            {sportsPast.map((val, index) => (
              <label key={index}>
                <li name="sports" className="options__item" id={`sportsPast[${index}]`} onClick={e => {
                  document.getElementById(`sportsPast[${index}]`).className += ' is-active'
                  sportsPast.map((v, i) => {
                    if (index !== i)
                      document.getElementById(`sportsPast[${i}]`).className = "options__item"
                  })
                }}>
                  <Field component='input' type='radio' name="sportsPast" style={{visibility: 'hidden', margin: -5}} value={val.val}/>
                  {val.text}
                </li>
                <span/>
              </label>
            ))}
          </ul>

          <div className="text-center">
            <Field name='insurance' val='Я любитель' title='Я любитель' id="insurance[1]" component={RadioProfile} />
            <Field name='insurance' val='Я профи' title='Я профи' id="insurance[2]" component={RadioProfile} />
          </div>

          <hr/>

          <p className="base-parag text-center ">Есть травмы или проблемные зоны?</p>

          <ul className="options options--white mtb30">
            {injuriesExist.map((val, index) => (
              <label key={index}>
                <li name="sports" className="options__item" id={`injuriesExist[${index}]`} onClick={e => {
                  document.getElementById(`injuriesExist[${index}]`).className += ' is-active'
                  injuriesExist.map((v, i) => {
                    if (index !== i)
                      document.getElementById(`injuriesExist[${i}]`).className = "options__item"
                  })
                }}>
                  <Field component='input' type='radio' name="injuriesExist" style={{visibility: 'hidden', margin: -5}} value={val.val}/>
                  {val.text}
                </li>
                <span/>
              </label>
            ))}
          </ul>

          <ul className="checkboxes">
            {injuriesList.map((val, index) => (
              <Field key={index} name={`injuries[${index}]`} title={val} id={`injuries[${index}]`} component={CheckboxProfile} onChange={e =>
                e.target.checked ? injuries.push(val) : injuries.splice(injuries.indexOf(val), 1)
              }/>
            ))}
          </ul>

          <hr/>

          <p className="base-parag text-center">А хронические заболевания?</p>

          <ul className="options options--white mtb30">
            {injuriesExist.map((val, index) => (
              <label key={index}>
                <li name="sports" className="options__item" id={`diseasesExist[${index}]`} onClick={e => {
                  document.getElementById(`diseasesExist[${index}]`).className += ' is-active'
                  injuriesExist.map((v, i) => {
                    if (index !== i)
                      document.getElementById(`diseasesExist[${i}]`).className = "options__item"
                  })
                }}>
                  <Field component='input' type='radio' name="diseasesExist" style={{visibility: 'hidden', margin: -5}} value={val.val}/>
                  {val.text}
                </li>
                <span/>
              </label>
            ))}
          </ul>

          <ul className="checkboxes mb20">
            {diseasesList.map((val, index) => (
              <Field key={index} name={`diseases[${index}]`} title={val} id={`diseases[${index}]`} component={CheckboxProfile} onChange={e =>
                e.target.checked ? diseases.push(val) : diseases.splice(diseases.indexOf(val), 1)
              }/>
            ))}
          </ul>

          <Field name="diseasesAnother" placeholder="Другое" component={InputProfile} />

          <hr/>

          <p className="base-parag text-center">Какое у тебя давление?</p>

          <ul className="options options--white mtb30">
            {pressure.map((val, index) => (
              <label key={index}>
                <li name="pressure" className="options__item" id={`pressure[${index}]`} onClick={e => {
                  document.getElementById(`pressure[${index}]`).className += ' is-active'
                  pressure.map((v, i) => {
                    if (index !== i)
                      document.getElementById(`pressure[${i}]`).className = "options__item"
                  })
                }}>
                  <Field component='input' type='radio' name="pressure" style={{visibility: 'hidden', margin: -5}} value={val}/>
                  {val}
                </li>
                <span/>
              </label>
            ))}
          </ul>

          <p className="base-parag text-center">Что со вредными привычками?</p>

          <ul className="options options--white mtb30">
            {injuriesExist.map((val, index) => (
              <label key={index}>
                <li name="sports" className="options__item" id={`badHannitsExist[${index}]`} onClick={e => {
                  document.getElementById(`badHannitsExist[${index}]`).className += ' is-active'
                  injuriesExist.map((v, i) => {
                    if (index !== i)
                      document.getElementById(`badHannitsExist[${i}]`).className = "options__item"
                  })
                }}>
                  <Field component='input' type='radio' name="badHannitsExist" style={{visibility: 'hidden', margin: -5}} value={val.val}/>
                  {val.text}
                </li>
                <span/>
              </label>
            ))}
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
            <div className="btn btn--primary">Отправить анкету</div>
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
                  <img src="/tmp/banner-2.png" alt=""/>
                </div>
                <p className="banner-ls__desc">В твой выходной день только сегодня TezTour дарит -10% на тур</p>
              </a>
            </li>
            <li className="banner-ls__item">
              <a href="#">
                <div className="banner-ls__img">
                  <img src="/tmp/banner-1.png" alt=""/>
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

  data.injuries = injuries
  data.diseases = diseases

  console.log(data)

  switch (true) {
    case !data.firstName:
      errors.firstName = 'Имя должно быть заполнено'
      break
    case data.firstName.length < 3:
      errors.firstName = 'Имя должно быть длиннее 3 символов'
      break
    case data.firstName.length > 20:
      errors.firstName = 'Имя должно быть короче 20 символов'
      break
    case !/^[A-Za-z0-9А-Яа-я]{3,20}$/.test(data.firstName):
      errors.firstName = 'Имя может содержать только буквы английского/русского алфавитов и цифры'
      break
  }

  switch (true) {
    case !data.lastName:
      errors.lastName = 'Фамилия должна быть заполнена'
      break
    case data.lastName.length < 3:
      errors.lastName = 'Фамилия должна быть длиннее 3 символов'
      break
    case data.lastName.length > 20:
      errors.lastName = 'Фамилия должна быть короче 20 символов'
      break
    case !/^[A-Za-z0-9А-Яа-я]{3,20}$/.test(data.lastName):
      errors.lastName = 'Фамилия может содержать только буквы английского/русского алфавитов и цифры'
      break
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

  switch (true) {
    case !data.phone:
      errors.phone = 'Поле телефона должно быть заполнено'
      break
    case data.phone.length < 6:
      errors.phone = 'Поле телефона должно быть длиннее 3 символов'
      break
    case data.phone.length > 20:
      errors.phone = 'Поле телефона должно быть короче 20 символов'
      break
    case !/^[+0-9]{3,20}$/.test(data.phone):
      errors.phone = 'Поле телефона может содержать только цифры и знак +'
      break
  }

  switch (true) {
    case !data.email:
      errors.email = 'Email должен быть заполнен'
      break
    case !/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(data.email):
      errors.email = 'Email заполнен неправильно, проверьте его еще раз'
      break
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
