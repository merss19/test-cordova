import React, { Component } from 'react'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { api } from '../config.js'
import cookie from 'react-cookie'
import Menu from '../components/todayTask/Menu'
import CalendarList from '../components/todayTask/CalendarList'
import Header from '../stories/Header'
import {
  Entity,
  Editor,
  EditorState,
  convertFromRaw,
  CompositeDecorator
} from 'draft-js'

let photoBeforeFront
let photoBeforeBack
let photoBeforeLeft
let photoBeforeRight
let photoAfterFront
let photoAfterBack
let photoAfterLeft
let photoAfterRight

let photoBeforeFrontUrl
let photoBeforeBackUrl
let photoBeforeLeftUrl
let photoBeforeRightUrl
let photoAfterFrontUrl
let photoAfterBackUrl
let photoAfterLeftUrl
let photoAfterRightUrl

let photoBeforeVideoUrl
let photoAfterVideoUrl

const decorator = new CompositeDecorator([
  {
    strategy: (contentBlock, callback) => {
      contentBlock.findEntityRanges(
        (character) => {
          const entityKey = character.getEntity()
          return (
            entityKey !== null &&
            Entity.get(entityKey).getType() === 'LINK'
          )
        },
        callback
      )
    },
    component: (props) => {
      const {url} = Entity.get(props.entityKey).getData()
      return (
        <a href={url}>
          {props.children}
        </a>
      )
    },
  },
])

const Image = (props) => {
  return <img src={props.src} style={{maxWidth: '100%'}} />;
};

const Atomic = (props) => {
  const entity = Entity.get(props.block.getEntityAt(0));
  const {src} = entity.getData();
  const type = entity.getType();

  let media;
  if (type === 'IMAGE') {
    media = <Image src={src} />;
  }

  return media;
};

function mediaBlockRenderer(block) {
  if (block.getType() === 'atomic') {
    return {
      component: Atomic,
      editable: false,
    };
  }

  return null;
}

class Photos extends Component {
  componentDidMount() {
    const { dispatch, selectedPhotos } = this.props
    dispatch(actions.fetchPhotosIfNeeded(selectedPhotos))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedPhotos !== this.props.selectedPhotos) {
      const { dispatch, selectedPhotos } = nextProps
      dispatch(actions.fetchPhotosIfNeeded(selectedPhotos))
    }
  }

  render() {
    const { photos, isFetching, dispatch } = this.props
    console.log('<====)==0')
    console.log(photos)
    const isEmpty = !photos || !photos.data || !photos.data[0]
    const url = 'https://api.todayme.ru'
    console.log(url)
    console.log(isEmpty)
    if (!isEmpty) {
      const p = photos.data[0]
      photoBeforeFrontUrl = p.photoBeforeFrontUrl ? url + p.photoBeforeFrontUrl : ''
      photoBeforeBackUrl = p.photoBeforeBackUrl ? url + p.photoBeforeBackUrl : ''
      photoBeforeLeftUrl = p.photoBeforeLeftUrl ? url + p.photoBeforeLeftUrl : ''
      photoBeforeRightUrl = p.photoBeforeRightUrl ? url + p.photoBeforeRightUrl : ''
      photoAfterFrontUrl = p.photoAfterFrontUrl ? url + p.photoAfterFrontUrl : ''
      photoAfterBackUrl = p.photoAfterBackUrl ? url + p.photoAfterBackUrl : ''
      photoAfterLeftUrl = p.photoAfterLeftUrl ? url + p.photoAfterLeftUrl : ''
      photoAfterRightUrl = p.photoAfterRightUrl ? url + p.photoAfterRightUrl : ''

      photoBeforeVideoUrl = p.photoBeforeVideoUrl ? url + p.photoBeforeVideoUrl : ''
      photoAfterVideoUrl = p.photoAfterVideoUrl ? url + p.photoAfterVideoUrl : ''
    }

    const json = {
        "entityMap": {
            "0": {
                "type": "LINK",
                "mutability": "MUTABLE",
                "data": {
                    "href": "https://docs.google.com/document/d/12QGxuq0Xvgat1iFu5St41xYgKXHvx93ZR_ePDG2hczY/edit",
                    "url": "https://docs.google.com/document/d/12QGxuq0Xvgat1iFu5St41xYgKXHvx93ZR_ePDG2hczY/edit"
                }
            }
        },
        "blocks": [{
            "key": "6ujfq",
            "text": "Привет, смельчак! \nПоздравляем тебя с первым шагом на пути к твоему новому телу, а, возможно, и новой жизни. Изменения, они, знаешь ли, притягивают друг друга. За маленькими подтягиваются побольше, потом еще больше. Не успеешь оглянуться, как окажешься в совсем других реалиях. Это практически как с походом в магазин, собираешься за хлебом, в итоге покупаешь машину.  Впрочем, нам с тобой до этого еще далеко. Давай решать проблемы по мере их поступления. Хотя, нет, знаешь, слово «проблемы» нам не нравится. Задачи! У нас есть задачи. И первостепенная из них – это ФОТО И ВИДЕО ДО начала наших тренировок. \nОСНОВА ОСНОВ, АРХИВАЖНАЯ И АРХИНУЖНАЯ ВЕЩЬ. MUST HAVE\n\nСейчас мы подробно расскажем тебе, как сделать правильные ФОТО, а в самом конце нашей инструкции будет описание, КАК СДЕЛАТЬ ВИДЕО.   Если они не будут соответствовать описанным ниже требованиям или ты сделаешь, но не загрузишь их в Личный кабинет, увы, и, ах, призов ждать не стоит. То есть ты, конечно, сможешь остаться в нашей чудесной компании, выполнять все упражнения, советы по питанию и прочее, но без материальной мотивации, исключительно для здоровья. Так что, если твоя любимая фраза «Главное не победа, а участие», можешь дальше не читать. А если ничто человеческое тебе не чуждо и ты уже положил глаз на один из наших призов, читай внимательно и не говори потом, что мы что-то не так тебе объяснили. МЫ ПОСТАРАЛИСЬ НАПИСАТЬ ДЛЯ ТЕБЯ МАКСИМАЛЬНО ПОДРОБНУЮ И ПОНЯТНУЮ ИНСТРУКЦИЮ.   Раз мы определили, что у нас есть задача, давай обозначим, что нам нужно для ее решения:",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [{
                "offset": 567,
                "length": 15,
                "style": "BOLD"
            }, {
                "offset": 609,
                "length": 53,
                "style": "BOLD"
            }, {
                "offset": 798,
                "length": 149,
                "style": "BOLD"
            }, {
                "offset": 1303,
                "length": 17,
                "style": "BOLD"
            }, {
                "offset": 1480,
                "length": 17,
                "style": "BOLD"
            }, {
                "offset": 1520,
                "length": 24,
                "style": "BOLD"
            }],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "9dflu",
            "text": "Ты; ",
            "type": "unordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "2c7v0",
            "text": "Купальник или комплект нижнего белья, если ты девушка, или плавки/боксеры, если ты парень;",
            "type": "unordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "chnu8",
            "text": "Лист А4;",
            "type": "unordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "bq6v4",
            "text": "Смартфон, телефон с камерой или фотоаппарат; ",
            "type": "unordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "aiajj",
            "text": "Доступ в интернет, чтобы ты мог отправить все это нам на проверку;",
            "type": "unordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "ckpsn",
            "text": "Внимательность, чтобы сделать все правильно;",
            "type": "unordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "b6kuf",
            "text": "В итоге у нас должно получиться ЧЕТЫРЕ ФОТОГРАФИИ ТЕБЯ ЛЮБИМОГО С РАЗНЫХ РАКУРСОВ:",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [{
                "offset": 32,
                "length": 49,
                "style": "BOLD"
            }],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "2cab8",
            "text": "СПЕРЕДИ;",
            "type": "unordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [{
                "offset": 0,
                "length": 8,
                "style": "BOLD"
            }],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "am5p0",
            "text": "СЗАДИ;",
            "type": "unordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [{
                "offset": 0,
                "length": 6,
                "style": "BOLD"
            }],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "6bdjl",
            "text": "С ПРАВОГО БОКА;",
            "type": "unordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [{
                "offset": 0,
                "length": 15,
                "style": "BOLD"
            }],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "fc11n",
            "text": "С ЛЕВОГО БОКА.",
            "type": "unordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [{
                "offset": 0,
                "length": 14,
                "style": "BOLD"
            }],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "53pbo",
            "text": "Тренеры – главные законодатели нашего марафона. Именно они будут оценивать качество присланных тобой фотографий. \nЕЩЕ РАЗ! ОЧЕНЬ ВАЖНО СДЕЛАТЬ ВСЕ КАК НА ФОТОГРАФИЯХ!\nТеперь обо всем поподробнее. \nЭКИПИРОВКАДевушкиНа тебе должен быть надет раздельный купальник или комплект непрозрачного нижнего белья темного цвета (идеально – черного) без рюш, гипюра, страз и прочих украшений. \n\nВерх купальника не должен быть вызывающим и не должен быть типа «топик», низ не должен быть стрингами.  Одежда должна дать нам максимально объективную картину твоей физической формы. Поэтому никакого корректирующего белья, шорт, и прочего быть не должно.\n\nТы можешь быть босиком, либо в обуви на плоской подошве.\nПарни Обычные плавки или боксеры темной расцветки. Никаких шорт. фото мужских плавок и боксеров с зеленой галочкойфото в шортах с красной галочкой\nЗАПОМНИ!В начале и в конце проекта одежда, в которой ты фотографируешься, должна быть одна и та же. ФОТО ДО И ФОТО ПОСЛЕ ТЫ ДЕЛАЕШЬ В ОДНОМ И ТОМ ЖЕ КОМПЛЕКТЕ БЕЛЬЯ. Это важно. Ведь мы должны видеть твой результат. Смена одежды может сделать картину необъективной.  \nТО, ЧТО ТЫ ДЕРЖИШЬ В РУКАХВ руках у тебя должен быть белый лист А4. На нем ты пишешь дату, когда делаешь фото, и название нашего марафона ЯСЕГОДНЯ. Нам неважно, напишешь ты эту фразу рукой или напечатаешь на компьютере. Главное, чтобы надпись была читабельна и не содержала каких-либо других слов, цифр и символов. У тебя должно получиться вот так:Нужно фото белого листа А4, на котором написано 01.01.2017 ЯСЕГОДНЯ\nКАК ТЫ БУДЕШЬ ЭТО ДЕЛАТЬТы был внимателен до этого момента? Молодец! Но теперь тебе нужно стать еще внимательнее. Сейчас мы продемонстрируем, как делать фото каждого ракурса.\nСПЕРЕДИФото пример с тренером",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [{
                "offset": 114,
                "length": 52,
                "style": "BOLD"
            }, {
                "offset": 197,
                "length": 10,
                "style": "BOLD"
            }, {
                "offset": 207,
                "length": 7,
                "style": "UNDERLINE"
            }, {
                "offset": 695,
                "length": 6,
                "style": "UNDERLINE"
            }],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "1o67j",
            "text": "Ноги на ширине плеч. Для ориентира, это примерно, как узкая сторона твоего листа А4.",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "n111",
            "text": "Ноги прямые, носки смотрят в объектив, никаких согнутых или полусогнутых колен. ",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "ah8um",
            "text": "У тебя в руках лист А4, его ты держишь так, чтобы лицо было закрыто, а локти направлены в разные стороны. Локти не должны закрывать грудь, не должны быть опущены. Идеально – параллельно полу. ",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "4e8mb",
            "text": "СЗАДИФото пример с тренером",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "7uumg",
            "text": "Ноги на ширине плеч. Аналогично фото спереди.",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "684uv",
            "text": "Руки опущены и чуть разведены в стороны. ",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "6qsbp",
            "text": "Одной рукой ты держишь лист А4. ",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "4a143",
            "text": "Если у тебя длинные волосы, собери их в хвост.",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "2dj3u",
            "text": "Ноги прямые, никаких согнутых или полусогнутых колен. ",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "3aafu",
            "text": "С ПРАВОГО БОКАФото пример с тренером",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "epjib",
            "text": "Повернись к объективу правым плечом.",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "83b1m",
            "text": "Ноги все так же – на ширине плеч.",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "a4b6d",
            "text": "В правой руке держишь свой лист А4 так, чтобы он закрывал лицо (смотри пример на фото).",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "1o2gg",
            "text": "Левая рука располагается свободно вдоль туловища.",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "a124i",
            "text": "С этого ракурса мы не должны видеть твою левую руку и левую ногу. ",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "bp14k",
            "text": "С ЛЕВОГО БОКАФото пример с тренером",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "fv5o4",
            "text": "Повернись к объективу левым плечом.",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "65lj7",
            "text": "Ноги все так же – на ширине плеч.",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "2nu0q",
            "text": "В левой руке держишь свой лист А4 так, чтобы он закрывал лицо (смотри пример на фото).",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "867vv",
            "text": "Правая рука располагается свободно вдоль туловища.",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "9h4d7",
            "text": "С этого ракурса мы не должны видеть твою правую руку и правую ногу. ",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "bak90",
            "text": "Мы уже дали тебе много полезной информации и инструкций по применению. Но этого недостаточно. ВОТ ЕЩЕ КОЕ-ЧТО, ЧТО ТЕБЕ НУЖНО ПОМНИТЬ.  \nСТОЙ ПРЯМОЧто это значит? Это значит, что ты не горбишься, не сутулишься, не сгибаешь колени, не наклоняешь голову, не встаешь на мыски.\n",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "fkh25",
            "text": "РАССЛАБЬСЯЭто касается всех частей твоего тела: Живот – не напрягай и не выпячивай.Спина – не сутулься, не выгибайся.Ягодицы – не сжимай их и не отклячивай. Руки – мышцы рук в спокойном состоянии. Не торопись. Тренировки еще не начались. Пример фото, типа такого\nНЕ РЕЖЬТы должен полностью попадать в кадр. Помещаться в него от и до. От макушки до хвоста, так сказать. Никаких обрезанных рук, ног и головы быть не должно. А если оставишь сверху и снизу кадра еще немного место, вообще будешь большим молодцом. \nНЕ СТРЕЛЯЙ ГЛАЗАМИДержи голову прямо. Не надо наклонять ее в бок, смотреть по сторонам и считать ворон. Ты сосредоточен, держишь голову прямо, смотришь перед собой. ПАРА ТЕХНИЧЕСКИХ МОМЕНТОВЛадно, на самом деле, четыре ☺",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "aeaot",
            "text": "КАК НАВЕСТИ ПРИЦЕЛ",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "anruq",
            "text": "Повторим еще раз, ТЫ ДОЛЖЕН БЫТЬ НА ФОТО В ПОЛНЫЙ РОСТ. Поэтому расстояние от объектива не так принципиально, главное, чтобы все уместилось. Камера должна быть примерно на уровне груди. Если тебя будут фотографировать сверху, ты получишься с огромной головой и короткими ножками, если снизу – будешь великаном. Оба варианта снизят качество фото и, соответственно, исказят объективность твоей формы на старте проекта. ИХ МЫ НЕ ПРИМЕМ.  Постарайся запомнить все обстоятельства этой съемки. В конце марафона тебе нужно будет создать максимально приближенные условия для ФОТО ПОСЛЕ.  Пример фото неправильный и правильный ракурс, типа таких\n",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "bh61a",
            "text": "ОБСТАНОВКА ",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "4lv5m",
            "text": "Ты можешь сделать фото в хорошо освещенном помещении на светлом фоне. Постарайся, чтобы помимо тебя, в кадре больше никого и ничего не было. Максимум один предмет интерьера. Идеально – пустая светлая стена. Пример фото с плохим освещением, типа такого, и плохого фона, чтобы в кадре было много хлама или даже люди",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "7t2v8",
            "text": "ОДИНОКИЙ ВОЛК",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "9nsol",
            "text": "Идеально, если ты попросишь кого-то из друзей или близких сфотографировать тебя. Но, если ты живешь один, или просто не особо общительный ☺ выход тоже есть. Прогресс снабдил большинство гаджетов функцией «ТАЙМЕР» или «УПРАВЛЕНИЕ ГОЛОСОМ». Поэтому все что тебе нужно, это закрепить аппарата с камерой на каком-то предмете на нужной высоте (это высота на уровне твоей груди, мы писали об этом выше) и дать машине команду. МЫ НЕ ПРИНИМАЕМ СЕЛФИ. Надеемся, прочитав весь предыдущий текст, ты понимаешь почему.  Фото пример как можно соорудить такую конструкцию\n",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "4u4bb",
            "text": "ЦЕНИТЕЛЯМ ПРЕКРАСНОГО",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "d62ds",
            "text": "Мы не будем принимать фото, сделанные в профессиональных фотостудиях, прошедшие ретушь и корректировку. Ты на них, конечно, будешь красивый, но у нас на проекте не те цели. Согласен?Все фото в рамках марафона должны быть сделаны одним устройством. Мы будем безумно рады, если за время ЯСЕГОДНЯ ты сменишь 5 Айфон на 7, но вот использование нового смартфона для ФОТО ПОСЛЕ  не одобрим. ИСПОЛЬЗУЙ ОДИН АППАРАТ ДЛЯ ФОТО ДО И ПОСЛЕ.\n",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "9dlqa",
            "text": "#ДЛЯСАМЫХУМНЫХ",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "e5pjk",
            "text": "Давай договоримся сразу, ты не будешь пытаться нас обмануть, подловить,  проверить нашу внимательность, мы расценим это как твое добровольное желание отказаться от призов.  \nБЫСТРЕНЬКО Не затягивай с фотографиями. Мы ждем их до 14.01.2017, это значит, что ровно в 00:00 14.01.2017 мы перестанем их принимать. Еще момент. Мы не злобные, так что У ТЕБЯ БУДЕТ ТРИ ПОПЫТКИ ПОНРАВИТЬСЯ НАМ. Если с первым вариантом фото будут какие-то косяки, наши тренеры напишут тебе об этом и попросят исправить недочеты.  КАК ЗАГРУЗИТЬ ФОТО В КАБИНЕТДальше нужна пошаговая инструкция со скринами, как загрузить фото в личный кабинет\nВИДЕОКак мы писали в самом начале, тебе нужно еще записать короткое видео. Это позволит нам оценить твою форму на момент начала тренировок максимально объективно, что в свою очередь поможет нашим тренерам и диетологам дать тебе правильные советы.Итак, как делать ВИДЕО:\n",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "7g3s8",
            "text": "Стоишь прямо лицом к камере. Ноги на ширине плеч (требования как для ФОТО). Стоишь так  2 секунды. ",
            "type": "unordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "1crfi",
            "text": "Поворачиваешься по часовой стрелке левым боком к камере, стоишь 2 секунды.",
            "type": "unordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "3upd1",
            "text": "Поворачиваешься спиной к камере и снова стоишь 2 секунды.   ",
            "type": "unordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "ee75r",
            "text": "Далее снова по часовой стрелке поворачиваешься к камере уже правым боком и снова стоишь 2 секунды. ",
            "type": "unordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "egfi6",
            "text": "Возвращаешься в исходное положение, лицом к камере. ",
            "type": "unordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "9q6cj",
            "text": "Стоп. ",
            "type": "unordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "ffrbt",
            "text": "После того, как видео записано, тебе нужно выложить его на Youtube (как это сделать, можешь почитать здесь), скопировать ссылку и вставить ее в отчет в личном кабинете на нашем сайте, туда же, куда ты загрузил фото.  \n",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [{
                "offset": 101,
                "length": 5,
                "style": "UNDERLINE"
            }],
            "entityRanges": [{
                "offset": 101,
                "length": 5,
                "key": 0
            }],
            "data": {}
        }]
    }

    const editorState = json ? EditorState.createWithContent(convertFromRaw(json), decorator) : EditorState.createEmpty()

    return (
      <div className="layout">

        <Header closeMobMenu={() => {}} isTask={true}/>

        <div className="layout__inner">
          <div className="grid">
            <div className="1/4--desk grid__cell layout__menu">
              <div className="grid layout__menu-inner">
                <Menu/>
                {/* <CalendarList calendar={[{
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
                }]}/> */}
              </div>
            </div>
            <div className="3/4--desk 1/1--pocket grid__cell layout__content">

              <div className="stage-box stage-box--small-padding">

                <h1 className="h1">Фото ДО:</h1>

                <hr/>

                <Editor
                  readOnly={true}
                  editorState={editorState}
                  blockRendererFn={mediaBlockRenderer}/>

                <ul className="upload-gallery">
                  <li ref="liBeforeFront" className={ photoBeforeFrontUrl ? 'upload-gallery__item upload-gallery__item--uploaded' : "upload-gallery__item" }>
                    <span className="upload-gallery__item-inner">
                      <input ref="inputBeforeFront" type="file" accept="image/*" className="upload-file__input" onChange={input => {
                        const { target } = input
                        if (target.files && target.files[0]) {
                          var reader = new FileReader()

                          reader.onload = e => {
                            this.refs.liBeforeFront.className='upload-gallery__item upload-gallery__item--uploaded'
                            this.refs.beforeFront.src = e.target.result

                            const content = reader.result.replace(/data:image\/\w+;base64,/, '')
                            const name = target.files[0].name
                            const payload = {
                              authToken: cookie.load('token'),
                              data: {
                                name,
                                content
                              }
                            }

                            const headers = {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            }

                            return fetch(`${api}/data/file-upload`, {
                                headers,
                                method: 'POST',
                                body: JSON.stringify(payload)
                              })
                              .then(response => response.json())
                              .then(json => {
                                console.log(json)
                                photoBeforeFront = json.data.uid
                                photoBeforeFrontUrl = `${api}/files/${json.data.uid}.${json.data.extension}`.replace(/api\//, '')
                              })
                          }

                          reader.readAsDataURL(target.files[0])
                        }
                      }}/>
                      <span className="upload-gallery__ico">
                        <svg className="svg-icon ico-gallery">
                          <use xlinkHref="#ico-gallery"></use>
                        </svg>
                      </span>
                      <span className="upload-gallery__title">Спереди</span>
                      <span className="upload-gallery__img_wrap">
                        <img ref='beforeFront' className="upload-gallery__img" src={photoBeforeFrontUrl} alt=""/>
                      </span>
                    </span>
                    <a href="#" onClick={e => {
                      e.preventDefault()
                      this.refs.inputBeforeFront.click()
                    }}>
                      Загрузить
                    </a>
                  </li>
                  <li ref="liBeforeBack" className={ photoBeforeBackUrl ? 'upload-gallery__item upload-gallery__item--uploaded' : "upload-gallery__item" }>
                    <span className="upload-gallery__item-inner">
                      <input ref="inputBeforeBack" type="file" accept="image/*" className="upload-file__input" onChange={input => {
                        const { target } = input
                        if (target.files && target.files[0]) {
                          var reader = new FileReader()

                          reader.onload = e => {
                            this.refs.liBeforeBack.className='upload-gallery__item upload-gallery__item--uploaded'
                            this.refs.beforeBack.src = e.target.result

                            const content = reader.result.replace(/data:image\/\w+;base64,/, '')
                            const name = target.files[0].name
                            const payload = {
                              authToken: cookie.load('token'),
                              data: {
                                name,
                                content
                              }
                            }

                            const headers = {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            }

                            return fetch(`${api}/data/file-upload`, {
                                headers,
                                method: 'POST',
                                body: JSON.stringify(payload)
                              })
                              .then(response => response.json())
                              .then(json => {
                                photoBeforeBack = json.data.uid
                                photoBeforeBackUrl = `${api}/files/${json.data.uid}.${json.data.extension}`.replace(/api\//, '')
                              })
                          }

                          reader.readAsDataURL(target.files[0])
                        }
                      }}/>
                      <span className="upload-gallery__ico">
                        <svg className="svg-icon ico-gallery">
                          <use xlinkHref="#ico-gallery"></use>
                        </svg>
                      </span>
                      <span className="upload-gallery__title">Сзади</span>
                      <span className="upload-gallery__img_wrap">
                        <img ref='beforeBack' className="upload-gallery__img" src={photoBeforeBackUrl} alt=""/>
                      </span>
                    </span>
                    <a href="#" onClick={e => {
                      e.preventDefault()
                      this.refs.inputBeforeBack.click()
                    }}>
                      Загрузить
                    </a>
                  </li>
                  <li ref="liBeforeLeft" className={ photoBeforeLeftUrl ? 'upload-gallery__item upload-gallery__item--uploaded' : "upload-gallery__item" }>
                    <span className="upload-gallery__item-inner">
                      <input ref="inputBeforeLeft" type="file" accept="image/*" className="upload-file__input" onChange={input => {
                        const { target } = input
                        if (target.files && target.files[0]) {
                          var reader = new FileReader()

                          reader.onload = e => {
                            this.refs.liBeforeLeft.className='upload-gallery__item upload-gallery__item--uploaded'
                            this.refs.beforeLeft.src = e.target.result

                            const content = reader.result.replace(/data:image\/\w+;base64,/, '')
                            const name = target.files[0].name
                            const payload = {
                              authToken: cookie.load('token'),
                              data: {
                                name,
                                content
                              }
                            }

                            const headers = {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            }

                            return fetch(`${api}/data/file-upload`, {
                                headers,
                                method: 'POST',
                                body: JSON.stringify(payload)
                              })
                              .then(response => response.json())
                              .then(json => {
                                photoBeforeLeft = json.data.uid
                                photoBeforeLeftUrl = `${api}/files/${json.data.uid}.${json.data.extension}`.replace(/api\//, '')
                              })
                          }

                          reader.readAsDataURL(target.files[0])
                        }
                      }}/>
                      <span className="upload-gallery__ico">
                        <svg className="svg-icon ico-gallery">
                          <use xlinkHref="#ico-gallery"></use>
                        </svg>
                      </span>
                      <span className="upload-gallery__title">Слева</span>
                      <span className="upload-gallery__img_wrap">
                        <img ref='beforeLeft' className="upload-gallery__img" src={photoBeforeLeftUrl} alt=""/>
                      </span>
                    </span>
                    <a href="#" onClick={e => {
                      e.preventDefault()
                      this.refs.inputBeforeLeft.click()
                    }}>
                      Загрузить
                    </a>
                  </li>

                  <li ref="liBeforeRight" className={ photoBeforeRightUrl ? 'upload-gallery__item upload-gallery__item--uploaded' : "upload-gallery__item" }>
                    <span className="upload-gallery__item-inner">
                      <input ref="inputBeforeRight" type="file" accept="image/*" className="upload-file__input" onChange={input => {
                        const { target } = input
                        if (target.files && target.files[0]) {
                          var reader = new FileReader()

                          reader.onload = e => {
                            this.refs.liBeforeRight.className='upload-gallery__item upload-gallery__item--uploaded'
                            this.refs.beforeRight.src = e.target.result

                            const content = reader.result.replace(/data:image\/\w+;base64,/, '')
                            const name = target.files[0].name
                            const payload = {
                              authToken: cookie.load('token'),
                              data: {
                                name,
                                content
                              }
                            }

                            const headers = {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            }

                            return fetch(`${api}/data/file-upload`, {
                                headers,
                                method: 'POST',
                                body: JSON.stringify(payload)
                              })
                              .then(response => response.json())
                              .then(json => {
                                photoBeforeRight = json.data.uid
                                photoBeforeRightUrl = `${api}/files/${json.data.uid}.${json.data.extension}`.replace(/api\//, '')
                              })
                          }

                          reader.readAsDataURL(target.files[0])
                        }
                      }}/>
                      <span className="upload-gallery__ico">
                        <svg className="svg-icon ico-gallery">
                          <use xlinkHref="#ico-gallery"></use>
                        </svg>
                      </span>
                      <span className="upload-gallery__title">Справа</span>
                      <span className="upload-gallery__img_wrap">
                        <img ref='beforeRight' className="upload-gallery__img" src={photoBeforeRightUrl} alt=""/>
                      </span>
                    </span>
                    <a href="#" onClick={e => {
                      e.preventDefault()
                      this.refs.inputBeforeRight.click()
                    }}>
                      Загрузить
                    </a>
                  </li>
                </ul>

                <br/>

                <div className="input input--box">
                  <input ref="videoBefore" type="text" className="input__field" placeholder="http://youtube.com"/>
                  {/* <div className="btn btn--secondary">Прикрепить файл</div> */}
                </div>

                <div className="btn btn--primary" onClick={() => {
                  console.log(photoBeforeFrontUrl)
                  const payload = {
                    authToken: cookie.load('token'),
                    data: {
                      program: cookie.load('userProgram') ? cookie.load('userProgram') : 1,
                      photoBeforeFront,
                      photoBeforeBack,
                      photoBeforeLeft,
                      photoBeforeRight,
                      photoAfterFront,
                      photoAfterBack,
                      photoAfterLeft,
                      photoAfterRight,
                      photoBeforeFrontUrl,
                      photoBeforeBackUrl,
                      photoBeforeLeftUrl,
                      photoBeforeRightUrl,
                      photoAfterFrontUrl,
                      photoAfterBackUrl,
                      photoAfterLeftUrl,
                      photoAfterRightUrl,
                      photoBeforeVideoUrl,
                      photoAfterVideoUrl
                    }
                  }

                  let url = `${api}/user/userPhoto-update`

                  if (isEmpty)
                    url = `${api}/user/userPhoto-create`

                  console.log(payload)

                  return fetch(url, {
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(payload)
                  })
                  .then(response => response.json())
                  .then(json => {
                    console.log(json)
                  })
                }}>
                  Отправить на проверку
                </div>

                <hr/>

                {/* <p className="base-parag">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat blanditiis quo porro nesciunt consequuntur est dolore accusamus commodi dolorem. Vel nobis architecto perspiciatis eligendi libero odit nisi iure natus, repellendus laboriosam voluptates excepturi magni vero, dolorum reiciendis. Iusto, excepturi tenetur, quisquam unde voluptatibus adipisci iure, impedit modi ipsa consequatur iste.</p>

                <p className="base-parag">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat blanditiis quo porro nesciunt consequuntur est dolore accusamus commodi dolorem. Vel nobis architecto perspiciatis eligendi libero odit nisi iure natus, repellendus laboriosam voluptates excepturi magni vero, dolorum reiciendis. Iusto, excepturi tenetur, quisquam unde voluptatibus adipisci iure, impedit modi ipsa consequatur iste.</p>

                <ul className="upload-gallery">
                  {/* {before.map(gallery => {

                  })}
                  <li ref="liAfterFront" className={ photoAfterFrontUrl ? 'upload-gallery__item upload-gallery__item--uploaded' : "upload-gallery__item" }>
                    <span className="upload-gallery__item-inner">
                      <input ref="inputAfterFront" type="file" accept="image/*" className="upload-file__input" onChange={input => {
                        const { target } = input
                        if (target.files && target.files[0]) {
                          var reader = new FileReader()

                          reader.onload = e => {
                            this.refs.liAfterFront.className='upload-gallery__item upload-gallery__item--uploaded'
                            this.refs.afterFront.src = e.target.result

                            const content = reader.result.replace(/data:image\/\w+;base64,/, '')
                            const name = target.files[0].name
                            const payload = {
                              authToken: cookie.load('token'),
                              data: {
                                name,
                                content
                              }
                            }

                            const headers = {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            }

                            return fetch(`${api}/data/file-upload`, {
                                headers,
                                method: 'POST',
                                body: JSON.stringify(payload)
                              })
                              .then(response => response.json())
                              .then(json => {
                                photoAfterFront = json.data.uid
                                photoAfterFrontUrl = `${api}/files/${json.data.uid}.${json.data.extension}`.replace(/api\//, '')
                              })
                          }

                          reader.readAsDataURL(target.files[0])
                        }
                      }}/>
                      <span className="upload-gallery__ico">
                        <svg className="svg-icon ico-gallery">
                          <use xlinkHref="#ico-gallery"></use>
                        </svg>
                      </span>
                      <span className="upload-gallery__title">Спереди</span>
                      <span className="upload-gallery__img_wrap">
                        <img ref='afterFront' className="upload-gallery__img" src={photoAfterFrontUrl} alt=""/>
                      </span>
                    </span>
                    <a href="#" onClick={e => {
                      e.preventDefault()
                      this.refs.inputAfterFront.click()
                    }}>
                      Загрузить
                    </a>
                  </li>
                  <li ref="liAfterBack" className={ photoAfterBackUrl ? 'upload-gallery__item upload-gallery__item--uploaded' : "upload-gallery__item" }>
                    <span className="upload-gallery__item-inner">
                      <input ref="inputAfterBack" type="file" accept="image/*" className="upload-file__input" onChange={input => {
                        const { target } = input
                        if (target.files && target.files[0]) {
                          var reader = new FileReader()

                          reader.onload = e => {
                            this.refs.liAfterBack.className='upload-gallery__item upload-gallery__item--uploaded'
                            this.refs.afterBack.src = e.target.result
                            const content = reader.result.replace(/data:image\/\w+;base64,/, '')
                            const name = target.files[0].name
                            const payload = {
                              authToken: cookie.load('token'),
                              data: {
                                name,
                                content
                              }
                            }

                            const headers = {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            }

                            return fetch(`${api}/data/file-upload`, {
                                headers,
                                method: 'POST',
                                body: JSON.stringify(payload)
                              })
                              .then(response => response.json())
                              .then(json => {
                                photoAfterBack = json.data.uid
                                photoAfterBackUrl = `${api}/files/${json.data.uid}.${json.data.extension}`.replace(/api\//, '')
                              })
                          }

                          reader.readAsDataURL(target.files[0])
                        }
                      }}/>
                      <span className="upload-gallery__ico">
                        <svg className="svg-icon ico-gallery">
                          <use xlinkHref="#ico-gallery"></use>
                        </svg>
                      </span>
                      <span className="upload-gallery__title">Сзади</span>
                      <span className="upload-gallery__img_wrap">
                        <img ref='afterBack' className="upload-gallery__img" src={photoAfterBackUrl} alt=""/>
                      </span>
                    </span>
                    <a href="#" onClick={e => {
                      e.preventDefault()
                      this.refs.inputAfterBack.click()
                    }}>
                      Загрузить
                    </a>
                  </li>
                  <li ref="liAfterLeft" className={ photoAfterLeftUrl ? 'upload-gallery__item upload-gallery__item--uploaded' : "upload-gallery__item" }>
                    <span className="upload-gallery__item-inner">
                      <input ref="inputAfterLeft" type="file" accept="image/*" className="upload-file__input" onChange={input => {
                        const { target } = input
                        if (target.files && target.files[0]) {
                          var reader = new FileReader()

                          reader.onload = e => {
                            this.refs.liAfterLeft.className='upload-gallery__item upload-gallery__item--uploaded'
                            this.refs.afterLeft.src = e.target.result

                            const content = reader.result.replace(/data:image\/\w+;base64,/, '')
                            const name = target.files[0].name
                            const payload = {
                              authToken: cookie.load('token'),
                              data: {
                                name,
                                content
                              }
                            }

                            const headers = {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            }

                            return fetch(`${api}/data/file-upload`, {
                                headers,
                                method: 'POST',
                                body: JSON.stringify(payload)
                              })
                              .then(response => response.json())
                              .then(json => {
                                photoAfterLeft = json.data.uid
                                photoAfterLeftUrl = `${api}/files/${json.data.uid}.${json.data.extension}`.replace(/api\//, '')
                              })
                          }

                          reader.readAsDataURL(target.files[0])
                        }
                      }}/>
                      <span className="upload-gallery__ico">
                        <svg className="svg-icon ico-gallery">
                          <use xlinkHref="#ico-gallery"></use>
                        </svg>
                      </span>
                      <span className="upload-gallery__title">Слева</span>
                      <span className="upload-gallery__img_wrap">
                        <img ref='afterLeft' className="upload-gallery__img" src={photoAfterLeftUrl} alt=""/>
                      </span>
                    </span>
                    <a href="#" onClick={e => {
                      e.preventDefault()
                      this.refs.inputAfterLeft.click()
                    }}>
                      Загрузить
                    </a>
                  </li>

                  <li ref="liAfterRight" className={ photoAfterRightUrl ? 'upload-gallery__item upload-gallery__item--uploaded' : "upload-gallery__item" }>
                    <span className="upload-gallery__item-inner">
                      <input ref="inputAfterRight" type="file" accept="image/*" className="upload-file__input" onChange={input => {
                        const { target } = input
                        if (target.files && target.files[0]) {
                          var reader = new FileReader()

                          reader.onload = e => {
                            this.refs.liAfterRight.className='upload-gallery__item upload-gallery__item--uploaded'
                            this.refs.afterRight.src = e.target.result

                            const content = reader.result.replace(/data:image\/\w+;base64,/, '')
                            const name = target.files[0].name
                            const payload = {
                              authToken: cookie.load('token'),
                              data: {
                                name,
                                content
                              }
                            }

                            const headers = {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            }

                            return fetch(`${api}/data/file-upload`, {
                                headers,
                                method: 'POST',
                                body: JSON.stringify(payload)
                              })
                              .then(response => response.json())
                              .then(json => {
                                photoAfterRight = json.data.uid
                                photoAfterRightUrl = `${api}/files/${json.data.uid}.${json.data.extension}`.replace(/api\//, '')
                              })
                          }

                          reader.readAsDataURL(target.files[0])
                        }
                      }}/>
                      <span className="upload-gallery__ico">
                        <svg className="svg-icon ico-gallery">
                          <use xlinkHref="#ico-gallery"></use>
                        </svg>
                      </span>
                      <span className="upload-gallery__title">Справа</span>
                      <span className="upload-gallery__img_wrap">
                        <img ref='afterRight' className="upload-gallery__img" src={photoAfterRightUrl} alt=""/>
                      </span>
                    </span>
                    <a href="#" onClick={e => {
                      e.preventDefault()
                      this.refs.inputAfterRight.click()
                    }}>
                      Загрузить
                    </a>
                  </li>
                </ul>

                <br/>

                <div className="input input--box">
                  <input ref="videoAfter" type="text" className="input__field" placeholder="http://youtube.com"/>
                </div>

                <div className="btn btn--primary" onClick={() => {
                  console.log(photoBeforeFrontUrl)
                  const payload = {
                    authToken: cookie.load('token'),
                    data: {
                      program: cookie.load('userProgram') ? cookie.load('userProgram') : 1,
                      photoBeforeFront,
                      photoBeforeBack,
                      photoBeforeLeft,
                      photoBeforeRight,
                      photoAfterFront,
                      photoAfterBack,
                      photoAfterLeft,
                      photoAfterRight,
                      photoBeforeFrontUrl,
                      photoBeforeBackUrl,
                      photoBeforeLeftUrl,
                      photoBeforeRightUrl,
                      photoAfterFrontUrl,
                      photoAfterBackUrl,
                      photoAfterLeftUrl,
                      photoAfterRightUrl,
                      photoBeforeVideoUrl,
                      photoAfterVideoUrl
                    }
                  }

                  let url = `${api}/user/userPhoto-update`

                  if (isEmpty)
                    url = `${api}/user/userPhoto-create`

                  console.log(payload)

                  return fetch(url, {
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(payload)
                  })
                  .then(response => response.json())
                  .then(json => {
                    console.log(json)
                  })
                }}>
                  Отправить на проверку
                </div>

                <hr/>

                <p className="base-parag">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat blanditiis quo porro nesciunt consequuntur est dolore accusamus commodi dolorem. Vel nobis architecto perspiciatis eligendi libero odit nisi iure natus, repellendus laboriosam voluptates excepturi magni vero, dolorum reiciendis. Iusto, excepturi tenetur, quisquam unde voluptatibus adipisci iure, impedit modi ipsa consequatur iste.</p>

                <p className="base-parag">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat blanditiis quo porro nesciunt consequuntur est dolore accusamus commodi dolorem. Vel nobis architecto perspiciatis eligendi libero odit nisi iure natus, repellendus laboriosam voluptates excepturi magni vero, dolorum reiciendis. Iusto, excepturi tenetur, quisquam unde voluptatibus adipisci iure, impedit modi ipsa consequatur iste.</p> */}

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
}

const mapStateToProps = state => {
  const { selectedPhotos, recivedPhotos, userToken } = state

  const {
    isFetching,
    photos
  } = recivedPhotos[selectedPhotos] || {
    isFetching: true,
    photos: {}
  }

  return {
    selectedPhotos,
    isFetching,
    photos,
    token: userToken.token
  }
}

Photos = connect(
  mapStateToProps
)(Photos)

export default Photos
