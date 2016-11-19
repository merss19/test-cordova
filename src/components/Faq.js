import React, { PropTypes } from 'react'
import Menu from './todayTask/Menu'
import CalendarList from './todayTask/CalendarList'
import Header from '../stories/Header'

const Faq = () => (
  <div className="layout">
    <Header/>
    <div className="layout__inner">
      <div className="grid">
        <div className="1/4--desk grid__cell layout__menu">
          <div className="grid layout__menu-inner">
            <Menu/>
            <CalendarList calendar={[{
                number: '1',
                icon: 'ico-done',
                status: 'done',
                date: '12/12/17',
                admin: 'Миньон',
                completeText: 'Зачет принят',
                day: 'Пн'
              }, {
                number: '2',
                status: 'waiting',
                date: '12/12/17',
                admin: 'Миньон',
                completeText: 'Зачет принимается',
                day: 'Вт'
              }, {
                number: '3',
                icon: 'ico-cross',
                status: 'missed',
                date: '12/12/17',
                admin: 'Миньон',
                completeText: 'Зачет не сдан',
                day: 'Ср'
            }]}/>
          </div>
        </div>
        <div className="3/4--desk 1/1--pocket grid__cell layout__content">

          <div className="stage-box stage-box--no-padding">

            <h1 className="h1">Отчеты за все дни</h1>

            <ul className="accordion accordion--faq">
              <li className="accordion__item accordion__item--active">
                <div className="accordion__header">
                  <h4 className="h3 accordion__header-title">Правила игры</h4>
                </div>
                <div className="accordion__content">
                  <ul className="num-list">
                    <li className="num-list__item">
                      <span className="num-list__number">1</span>
                      <h6 className="num-list__title">Привычки</h6>
                      <p className="num-list__description">Чтобы измениться физически (да-да кубики пресса, подтянутая попка, вон отсюда лишние килограммы и наоборот, велкам нелишние) надо прежде всего изменить свои привычки. Про изменение вредных привычек мы с тобой очень серьезно, мать-перемать, поговорим позже (не сегодня, расслабься пока). Сейчас поговорим о приобретении полезных привычек. Они помогут тебе и в ходе проекта и за его рамками. И вообще важно,  чтобы они оставались с тобой в преть навсегда.</p>
                    </li>
                    <li className="num-list__item">
                      <span className="num-list__number">2</span>
                      <h6 className="num-list__title">Питание</h6>
                      <p className="num-list__description">Чтобы измениться физически важно питание.</p>
                    </li>
                    <li className="num-list__item">
                      <span className="num-list__number">3</span>
                      <h6 className="num-list__title">Меняемся физически</h6>
                      <p className="num-list__description">Чтобы измениться физически, важно меняться физически. Ага: "как перестать бояться и прыгнуть с парашютом? перестать бояться и прыгнуть с паращютом. Т.е. конечно нужно уделять внимание физической подготовке.</p>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="accordion__item">
                <div className="accordion__header">
                  <h4 className="h3 accordion__header-title">Как получить призы</h4>
                </div>
                <div className="accordion__content">
                  <p className="base-parag">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam itaque laborum praesentium repellat, maiores omnis totam adipisci quos amet dicta.</p>
                </div>
              </li>
              <li className="accordion__item">
                <div className="accordion__header">
                  <h4 className="h3 accordion__header-title">Как отправлять отчет</h4>
                </div>
                <div className="accordion__content">
                  <p className="base-parag">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, nihil qui, quo magni facilis cum? Animi maxime veniam veritatis molestias aspernatur distinctio dolor, accusantium, tempore consequatur sapiente voluptatibus voluptate doloribus explicabo. Obcaecati recusandae, dignissimos amet. Et officiis, voluptatum quaerat cum tenetur pariatur ipsum minus unde eaque? Doloribus omnis totam repudiandae minima accusantium, fugit atque soluta, quasi sunt porro. Adipisci neque suscipit ea tenetur magni quis ipsa exercitationem, error aut! Deserunt excepturi nisi necessitatibus placeat doloremque veniam aspernatur nemo quis! Et deleniti culpa laboriosam porro cum nobis veniam, ipsum nesciunt obcaecati molestias consequuntur est amet, corporis eum sed distinctio. Et, beatae!</p>
                </div>
              </li>
              <li className="accordion__item">
                <div className="accordion__header">
                  <h4 className="h3 accordion__header-title">Кто проверяет зачеты</h4>
                </div>
                <div className="accordion__content">
                  <p className="base-parag">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, dolorem, nobis. Omnis voluptatibus sapiente neque eveniet sunt laudantium eaque ullam dolorem nisi, vero cumque, aspernatur voluptatem laboriosam at, rem ad? Quis corporis perferendis ratione sed voluptate, nostrum in, molestiae corrupti?</p>
                </div>
              </li>
              <li className="accordion__item">
                <div className="accordion__header">
                  <h4 className="h3 accordion__header-title">Правила игры</h4>
                </div>
                <div className="accordion__content">
                  <ul className="num-list">
                    <li className="num-list__item">
                      <span className="num-list__number">1</span>
                      <h6 className="num-list__title">Привычки</h6>
                      <p className="num-list__description">Чтобы измениться физически (да-да кубики пресса, подтянутая попка, вон отсюда лишние килограммы и наоборот, велкам нелишние) надо прежде всего изменить свои привычки. Про изменение вредных привычек мы с тобой очень серьезно, мать-перемать, поговорим позже (не сегодня, расслабься пока). Сейчас поговорим о приобретении полезных привычек. Они помогут тебе и в ходе проекта и за его рамками. И вообще важно,  чтобы они оставались с тобой в преть навсегда.</p>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="accordion__item">
                <div className="accordion__header">
                  <h4 className="h3 accordion__header-title">Правила игры</h4>
                </div>
                <div className="accordion__content">
                  <ul className="num-list">
                    <li className="num-list__item">
                      <span className="num-list__number">1</span>
                      <h6 className="num-list__title">Привычки</h6>
                      <p className="num-list__description">Чтобы измениться физически (да-да кубики пресса, подтянутая попка, вон отсюда лишние килограммы и наоборот, велкам нелишние) надо прежде всего изменить свои привычки. Про изменение вредных привычек мы с тобой очень серьезно, мать-перемать, поговорим позже (не сегодня, расслабься пока). Сейчас поговорим о приобретении полезных привычек. Они помогут тебе и в ходе проекта и за его рамками. И вообще важно,  чтобы они оставались с тобой в преть навсегда.</p>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>

          </div>

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

export default Faq
