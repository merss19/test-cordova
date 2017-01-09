import React, { Component } from 'react'
import Menu from './todayTask/Menu'
import CalendarList from './todayTask/CalendarList'
import { browserHistory } from 'react-router'
import Header from '../stories/Header'
import cookie from 'react-cookie'
import {
  Entity,
  Editor,
  EditorState,
  convertFromRaw,
  CompositeDecorator
} from 'draft-js'
import {getCustomStyleMap} from 'draftjs-utils'

let contentStyle = {
  width: '754px',
  height: '423px'
}

const customStyleMap = getCustomStyleMap()

const offset = { left: '-45px' }

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
  return <img src={props.src} style={{
    maxWidth: '100%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto' }}/>;
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

class Faq extends Component {
  componentDidMount() {
    window.location.hash = window.decodeURIComponent(window.location.hash);
    const scrollToAnchor = () => {
      const hashParts = window.location.hash.split('#');
      if (hashParts.length > 2) {
        const hash = hashParts.slice(-1)[0];
        document.querySelector(`#${hash}`).scrollIntoView();
      }
    };
    scrollToAnchor();
    window.onhashchange = scrollToAnchor;
  }

  render () {
    console.log(this.props)
    const { location: hash } = this.props
    const json = {
        "entityMap": {
            "0": {
                "type": "LINK",
                "mutability": "MUTABLE",
                "data": {
                    "href": "http://www.google.com",
                    "url": "http://www.google.com/"
                }
            },
            "1": {
                "type": "IMAGE",
                "mutability": "MUTABLE",
                "data": {
                    "src": "http://i.imgur.com/plAglup.png",
                    "height": "auto",
                    "width": "100%"
                }
            },
            "2": {
                "type": "LINK",
                "mutability": "MUTABLE",
                "data": {
                    "href": "http://www.youtube.ru",
                    "url": "http://www.youtube.ru/"
                }
            },
            "3": {
                "type": "IMAGE",
                "mutability": "MUTABLE",
                "data": {
                    "src": "http://i.imgur.com/X3FLmgJ.png",
                    "height": "auto",
                    "width": "100%"
                }
            },
            "4": {
                "type": "IMAGE",
                "mutability": "MUTABLE",
                "data": {
                    "src": "http://i.imgur.com/uJEUPGa.png",
                    "height": "auto",
                    "width": "100%"
                }
            },
            "5": {
                "type": "IMAGE",
                "mutability": "MUTABLE",
                "data": {
                    "src": "http://i.imgur.com/m7ryfKy.png",
                    "height": "auto",
                    "width": "100%"
                }
            },
            "6": {
                "type": "IMAGE",
                "mutability": "MUTABLE",
                "data": {
                    "src": "http://i.imgur.com/mCJh0xy.png",
                    "height": "auto",
                    "width": "100%"
                }
            },
            "7": {
                "type": "IMAGE",
                "mutability": "MUTABLE",
                "data": {
                    "src": "http://i.imgur.com/VRzblS2.png",
                    "height": "auto",
                    "width": "100%"
                }
            },
            "8": {
                "type": "IMAGE",
                "mutability": "MUTABLE",
                "data": {
                    "src": "http://i.imgur.com/YcrvqXj.png",
                    "height": "auto",
                    "width": "100%"
                }
            },
            "9": {
                "type": "LINK",
                "mutability": "MUTABLE",
                "data": {
                    "href": "https://support.google.com/youtube/answer/1388383",
                    "url": "https://support.google.com/youtube/answer/1388383"
                }
            },
            "10": {
                "type": "LINK",
                "mutability": "MUTABLE",
                "data": {
                    "href": "https://support.google.com/youtube/answer/57407?co=GENIE.Platform%3DAndroid&oco=1",
                    "url": "https://support.google.com/youtube/answer/57407?co=GENIE.Platform%3DAndroid&oco=1"
                }
            },
            "11": {
                "type": "LINK",
                "mutability": "MUTABLE",
                "data": {
                    "href": "https://support.google.com/youtube/answer/1388383",
                    "url": "https://support.google.com/youtube/answer/1388383"
                }
            },
            "12": {
                "type": "LINK",
                "mutability": "MUTABLE",
                "data": {
                    "href": "https://support.google.com/youtube/answer/1388383",
                    "url": "https://support.google.com/youtube/answer/1388383"
                }
            },
            "13": {
                "type": "LINK",
                "mutability": "MUTABLE",
                "data": {
                    "href": "https://support.google.com/youtube/answer/57407?co=GENIE.Platform%3DiOS&oco=1",
                    "url": "https://support.google.com/youtube/answer/57407?co=GENIE.Platform%3DiOS&oco=1"
                }
            }
        },
        "blocks": [{
            "key": "2qb92",
            "text": "Если у тебя еще нет своего Youtube-канала, тебе нужно его создать, для этого тебе понадобится почта на Gmail. Если ее у тебя тоже нет, придется создать и ее. Итак, заходим на сайт www.google.com и нажимаем кнопку “Создать акаунт” и следуешь дальнейшим инструкциям компьютера:",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [{
                "offset": 180,
                "length": 14,
                "style": "UNDERLINE"
            }],
            "entityRanges": [{
                "offset": 180,
                "length": 14,
                "key": 0
            }],
            "data": {}
        }, {
            "key": "bk0sl",
            "text": "",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "4nfev",
            "text": " ",
            "type": "atomic",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [{
                "offset": 0,
                "length": 1,
                "key": 1
            }],
            "data": {}
        }, {
            "key": "cijjo",
            "text": "",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "7ra67",
            "text": "После того, как у тебя появилась почта, используй ее данные для входа в Youtube.Заходишь на сайт www.youtube.ru и нажимаешь кнопку “Войти” в правой верхней части экрана: ",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [{
                "offset": 97,
                "length": 14,
                "style": "UNDERLINE"
            }],
            "entityRanges": [{
                "offset": 97,
                "length": 14,
                "key": 2
            }],
            "data": {}
        }, {
            "key": "9qhj9",
            "text": "",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "c7n3r",
            "text": " ",
            "type": "atomic",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [{
                "offset": 0,
                "length": 1,
                "key": 3
            }],
            "data": {}
        }, {
            "key": "9iq2f",
            "text": "\nУра! Мы вошли в Youtube и теперь можем приступить непосредственно к добавлению отчетного видео. Для этого нажимаем кнопку Добавить видео в правом верхнем углу экрана:\n",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "8m5b2",
            "text": " ",
            "type": "atomic",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [{
                "offset": 0,
                "length": 1,
                "key": 4
            }],
            "data": {}
        }, {
            "key": "ftfv2",
            "text": "",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "a8ol9",
            "text": "Попадаем сюда:",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "20ndi",
            "text": "",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "9jf1o",
            "text": " ",
            "type": "atomic",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [{
                "offset": 0,
                "length": 1,
                "key": 5
            }],
            "data": {}
        }, {
            "key": "d94ht",
            "text": "",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "5fff6",
            "text": "Обрати внимание! В выпадающем окне тебе обязательно нужно будет сменить режим доступа на “Доступ по ссылке”. Это позволит тебе скрыть видео от посторонних глаз, то есть, его смогут посмотреть только те, кому ты направишь ссылку на видео, в том числе и наши тренеры, которые будут оценивать качество выполнения отчетного задания.  Наводишь курсор на картинку, она становится красной, нажимаешь на нее левой кнопкой мыши - открывается диалоговое окно, в котором ты ищешь нужный файл на своем компьютере и добавляешь его.",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [{
                "offset": 17,
                "length": 91,
                "style": "BOLD"
            }],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "7pjue",
            "text": "",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "2nr98",
            "text": " ",
            "type": "atomic",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [{
                "offset": 0,
                "length": 1,
                "key": 6
            }],
            "data": {}
        }, {
            "key": "3u28i",
            "text": "",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "8ko4a",
            "text": "После того, как загрузка видео завершена, экран будет выглядеть так:",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "27fg6",
            "text": "",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "9mctp",
            "text": " ",
            "type": "atomic",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [{
                "offset": 0,
                "length": 1,
                "key": 7
            }],
            "data": {}
        }, {
            "key": "cuphv",
            "text": "",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "8ru9c",
            "text": "Если на первом экране ты не поменял режим доступа, можешь сделать это здесь. В примере в правой части экрана поле обведено красным.В левой части экрана ты увидишь ссылку на твое видео, именно ее тебе и нужно скопировать и вставить в отчет в личном кабинете на нашем сайте. ",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "1iho8",
            "text": "",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "30cj9",
            "text": " ",
            "type": "atomic",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [{
                "offset": 0,
                "length": 1,
                "key": 8
            }],
            "data": {}
        }, {
            "key": "1ojis",
            "text": "\nТы также можешь добавлять видео со своего смартфона. Вот как это сделать: ",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "1vm8i",
            "text": "",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "71re4",
            "text": "Android",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [{
                "offset": 0,
                "length": 7,
                "style": "BOLD"
            }, {
                "offset": 0,
                "length": 7,
                "style": "UNDERLINE"
            }],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "47b07",
            "text": "Вы можете снять видео и сразу же загрузить его на YouTube. Вот как это сделать в приложении YouTube для Android:",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "7l617",
            "text": "Войдите в аккаунт YouTube и выберите нужный канал.  ",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "angtv",
            "text": "На вкладке \"Главная\" или \"Аккаунт\" нажмите на значок камеры .",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [{
                "offset": 46,
                "length": 13,
                "style": "BOLD"
            }],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "476mq",
            "text": "Снимите видео или выберите уже снятое.",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "4gv16",
            "text": "Чтобы начать запись, нажмите на значок камеры. ",
            "type": "unordered-list-item",
            "depth": 1,
            "inlineStyleRanges": [{
                "offset": 6,
                "length": 13,
                "style": "BOLD"
            }],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "8pvb5",
            "text": "Чтобы добавить отснятый ролик, выберите его в списке.",
            "type": "unordered-list-item",
            "depth": 1,
            "inlineStyleRanges": [{
                "offset": 15,
                "length": 14,
                "style": "BOLD"
            }],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "a8ip9",
            "text": "Если нужно, примените эффекты. ",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [{
                "offset": 12,
                "length": 17,
                "key": 9
            }],
            "data": {}
        }, {
            "key": "5tbcq",
            "text": "Укажите заголовок с описанием и установите параметры доступа.",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "2mss4",
            "text": "Нажмите на значок загрузки .",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "5qd8",
            "text": "Совет. Чтобы изменить тип подключения при загрузке видео откройте Меню  > Настройки > Общие > Загрузки, выберите \"Загружать только через Wi-Fi\".Инструкция взята с сайта Youtube.",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [{
                "offset": 66,
                "length": 4,
                "style": "BOLD"
            }, {
                "offset": 74,
                "length": 9,
                "style": "BOLD"
            }, {
                "offset": 86,
                "length": 5,
                "style": "BOLD"
            }, {
                "offset": 94,
                "length": 8,
                "style": "BOLD"
            }, {
                "offset": 169,
                "length": 7,
                "style": "UNDERLINE"
            }],
            "entityRanges": [{
                "offset": 169,
                "length": 7,
                "key": 10
            }],
            "data": {}
        }, {
            "key": "fc0g6",
            "text": "\nIOS",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [{
                "offset": 1,
                "length": 3,
                "style": "BOLD"
            }, {
                "offset": 1,
                "length": 3,
                "style": "UNDERLINE"
            }],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "9idlt",
            "text": "Вы можете снять видео и сразу же загрузить его на YouTube. Вот как это сделать в приложении YouTube для iOS: ",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "88mv6",
            "text": "Войдите в аккаунт YouTube и выберите нужный канал.  ",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "bked1",
            "text": "Коснитесь значок камеры. Он есть на любой вкладке приложения.",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [{
                "offset": 10,
                "length": 13,
                "style": "BOLD"
            }],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "c0o39",
            "text": "Снимите видео или выберите уже снятое.",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "bimnn",
            "text": "Чтобы начать запись, нажмите на значок камеры. ",
            "type": "unordered-list-item",
            "depth": 1,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "dvun2",
            "text": "Чтобы добавить отснятый ролик, выберите его в списке.",
            "type": "unordered-list-item",
            "depth": 1,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "1sefk",
            "text": "Если нужно, примените эффекты. Затем нажмите Далее. ",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [{
                "offset": 22,
                "length": 7,
                "key": 11
            }],
            "data": {}
        }, {
            "key": "66eda",
            "text": "Укажите заголовок с описанием и установите параметры доступа.",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "5rht5",
            "text": "Нажмите Добавить.",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "1bghd",
            "text": "Вы также можете изменить тип подключения при загрузке видео. Для этого:",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "adtic",
            "text": "Нажмите на значок аккаунта .",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "u1p8",
            "text": "Выберите Настройки.",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "c476c",
            "text": "Перейдите в раздел \"Загрузки\".",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "dot16",
            "text": "Если эти инструкции не помогли, возможно, у вас обновление ещё не вступило в силу. Вот что делать в этом случае.",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "bke3h",
            "text": "Войдите в аккаунт YouTube и выберите нужный канал.  ",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "5cc6k",
            "text": "На вкладке \"Главная\" или \"Аккаунт\" нажмите на значок камеры.",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [{
                "offset": 46,
                "length": 13,
                "style": "BOLD"
            }],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "6t9od",
            "text": "Снимите видео или выберите уже снятое.",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "4hskb",
            "text": "Чтобы начать запись, нажмите на значок камеры. ",
            "type": "unordered-list-item",
            "depth": 1,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "bqgri",
            "text": "Чтобы добавить отснятый ролик, выберите его в списке.",
            "type": "unordered-list-item",
            "depth": 1,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "fnt18",
            "text": "Если нужно, примените эффекты. Затем нажмите Далее. ",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [{
                "offset": 22,
                "length": 7,
                "key": 12
            }],
            "data": {}
        }, {
            "key": "bnmla",
            "text": "Укажите заголовок с описанием и установите параметры доступа.",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "239sp",
            "text": "Нажмите Добавить.",
            "type": "ordered-list-item",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }, {
            "key": "clfsi",
            "text": "Инструкция взята с сайта Youtube. \n",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [{
                "offset": 25,
                "length": 7,
                "style": "UNDERLINE"
            }],
            "entityRanges": [{
                "offset": 25,
                "length": 7,
                "key": 13
            }],
            "data": {}
        }]
    }

    const editorState = json ? EditorState.createWithContent(convertFromRaw(json), decorator) : EditorState.createEmpty()
    return (
      <div className="layout">
        <Header isTask={true}/>
        <div className="layout__inner">
          <div className="grid">
            <div className="1/4--desk grid__cell layout__menu">
              <div className="grid layout__menu-inner">
                <Menu fullName={cookie.load('fullName')}/>
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

              <div className="stage-box stage-box--no-padding">

                <h1 className="h1">Ответы/Вопросы</h1>

                <ul className="accordion accordion--faq">
                  <li id='payment' className="accordion__item accordion__item--active">
                    <div className="accordion__header">
                      <h4 className="h3 accordion__header-title">Оплата и получение услуги</h4>
                    </div>
                    <div className="accordion__content">
                      <ul className="num-list">
                        <li className="num-list__item">
                          <span className="num-list__number">1</span>
                          <h6 className="num-list__title">Я оплатил подписку, как мне пригласить друга со скидкой?</h6>
                          <p className="num-list__description">
                            После регистрации вы получаете промокод для приглашения друзей
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">2</span>
                          <h6 className="num-list__title">Я начал тренироваться, но по личной причине не могу больше заниматься. Как мне вернуть деньги?</h6>
                          <p className="num-list__description">Если вы начали заниматься, но не можете продолжать, то деньги не возвращаются. Организатор предоставляет вам доступ к кабинету и тренировкам - это интелектуальная собственность Организатора, которую вы приобретаете в пользование.</p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">3</span>
                          <h6 className="num-list__title">Я начал тренироваться, но хочу прервать процесс на неделю - приболел. Как мне это сделать?</h6>
                          <p className="num-list__description">Все тренировки будут доступны вам вне зависимости от вашего состояния. Если вы хотите продолжить состязание за призы, то за "Х" рублей, вы можете оплатить временный иммунитет, сроком на "Х"</p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">4</span>
                          <h6 className="num-list__title">Когда стартует проект?</h6>
                          <p className="num-list__description">
                            О начале каждого старта мы объявляем на основном сайте проекта www.todayme.ru. Вы можете подписаться на наши обновления, чтобы узнать дату очередного старта.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">5</span>
                          <h6 className="num-list__title">А будет тест-драйв?</h6>
                          <p className="num-list__description">
                            Нет.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">6</span>
                          <h6 className="num-list__title">За что могут отчислить с проекта?</h6>
                          <p className="num-list__description">
                            Невыполнение простых и понятных правил поведения в проекте;
                          </p>
                          <p className="num-list__description">
                            Некорректное поведение в проекте (например, реклама собственных товаров и услуг участникам проекта, оскорбления);
                          </p>
                          <p className="num-list__description">
                            Невыполнение еженедельного задания «на вылет» (выполнение в неустановленные сроки, отсутствие отчета, неправильное техническое исполнение задания, самый слабый результат среди участников);
                          </p>
                          <p className="num-list__description">
                            Бестактность. Мы максимально понятно и подробно даем все инструкции. Но всегда находятся участники, для которых правила созданы, чтобы их нарушать. Надеемся, что это не про тебя))
                          </p>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li id='reports' className="accordion__item">
                    <div className="accordion__header">
                      <h4 className="h3 accordion__header-title">Отчеты в рамках тренировчного процесса</h4>
                    </div>
                    <div className="accordion__content">
                      <ul className="num-list">
                        <li className="num-list__item">
                          <span className="num-list__number">1</span>
                          <h6 className="num-list__title">Нужно ли будет постоянно снимать свои занятия на видео?</h6>
                          <p className="num-list__description">
                            Постоянно снимать свои занятия на видео не нужно. Такая форма отчётности используется только 1 раз в неделю для заданий «на вылет».
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">2</span>
                          <h6 className="num-list__title">У меня сломалась камера в смартфоне, обязательно ли мне отправлять записи на подтверждение тренировок?</h6>
                          <p className="num-list__description">
                            Да, обязательно. Можете воспользоваться смартфоном друга/родственника или записать видео на цифровой фотоаппарат, и после загрузить видео на Youtube или VK.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">3</span>
                          <h6 className="num-list__title">Влияет ли качество записи на то, какую оценку мне поставят?</h6>
                          <p className="num-list__description">
                            Главное, чтобы было четко видно, как вы выполняете упражнения. Есть общие советы по съемке, которые передадут тренеры, можно следовать им.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">4</span>
                          <h6 className="num-list__title">Достаточно ли одного дубля? Могут ли меня заставить что-то переделывтаь?</h6>
                          <p className="num-list__description">
                            Тренеры могут попросить переделать видео-отчет, если на записи блик/артефакты, которые мешают увидеть процесс выполнения упражнения.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">5</span>
                          <h6 className="num-list__title">Можно ли пропустить 1 еженедельный отчет?</h6>
                          <p className="num-list__description">
                            Нет, нельзя.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">6</span>
                          <h6 className="num-list__title">Как лучше всего отправить видео?</h6>
                          <p className="num-list__description">
                            Выложить в ВК или Youtube своего аккаунта и дать ссылку - так точно все получится.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">7</span>
                          <h6 className="num-list__title">Что делать, если я не могу каждый день выполнять задания?</h6>
                          <p className="num-list__description">
                            В игре есть еженедельное задание «на вылет», которое обязательно для выполнения (если ты, конечно, хочешь дойти до конца). Обычно оно выдается по пятницам в 21:00, и у тебя есть 27 часов для его выполнения. Остальные задания не обязательны для выполнения. Но, если ты пришел в игру не только за «движухой», но и фигурой, мы бы советовали тебе их выполнять.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">8</span>
                          <h6 className="num-list__title">А если разница в часовых поясах, как мне тренироваться?</h6>
                          <p className="num-list__description">
                            Так же как и остальным. Времени предостаточно.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">9</span>
                          <h6 className="num-list__title">А мои задания на вылет все увидят?</h6>
                          <p className="num-list__description">
                            Нет. Только наши тренеры. Так что можешь не стесняться.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li id='proccess' className="accordion__item">
                    <div className="accordion__header">
                      <h4 className="h3 accordion__header-title">Вопросы про тренировочный процесс</h4>
                    </div>
                    <div className="accordion__content">
                      <ul className="num-list">
                        <li className="num-list__item">
                          <span className="num-list__number">1</span>
                          <h6 className="num-list__title">Как мне задать вопрос диетологу/врачу проекта?</h6>
                          <p className="num-list__description">
                            Напишите свой вопрос нам.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">2</span>
                          <h6 className="num-list__title">Как часто можно будет общаться с врачами проекта?</h6>
                          <p className="num-list__description">
                            Как появятся вопросы - сразу пишите нам.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">3</span>
                          <h6 className="num-list__title">Могу ли я задать вопросы по упражнениям? Кто на них ответит?</h6>
                          <p className="num-list__description">
                            Да, конечно. Ответят наши тренеры.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">4</span>
                          <h6 className="num-list__title">Можно ли пообщаться с тренерами проекта?</h6>
                          <p className="num-list__description">
                            Да, пишите нам вопросы.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">5</span>
                          <h6 className="num-list__title">Если у меня что-то болит, кому писать? Нужно ли обращаться к врачу?</h6>
                          <p className="num-list__description">
                            Вы всегда можете написать вопрос нам, также не забывайте про возможность получить уникальную страховку от АльфаСтрахования. Если что-то произойдет в ходе тренировочного процесса, то страховка покроет медицинские расходы*
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">6</span>
                          <h6 className="num-list__title">Что если мне тяжело дается упражнение? Его делать через боль?</h6>
                          <p className="num-list__description">
                            Мы не рекомендуем делать какие-либо упражнения ""через боль"", но спорт - это всегда нагрузка. Попробуйте делать разминку перед упражнениями, чтобы прогреть мышцы. Также, мы рекомендуем в ходе Сезона воздержаться от частого употребления алкоголя и не заниматься сразу после еды.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">7</span>
                          <h6 className="num-list__title">Что если я не могу сделать упражнения? Можно ли продолжать заниматься?</h6>
                          <p className="num-list__description">
                            Продолжать заниматься можно, но чтобы претендовать на подарок и состязаться за него, вам нужно выполнять все упражнения, которые стоят в недельном отчете.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">8</span>
                          <h6 className="num-list__title">Кто пишет програму тренировок?</h6>
                          <p className="num-list__description">
                            Программу тренировок пишут тренеры Ксения и Стас вместе с командой врачей клини АльфаЗдрав и СМ-Клиника.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">9</span>
                          <h6 className="num-list__title">Кто автор советов по питанию?</h6>
                          <p className="num-list__description">
                            Наши диетологи
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number" style={offset}>10</span>
                          <h6 className="num-list__title">Если я не буду менять свой обычный режим питания, будут ли тренировки эффективными?</h6>
                          <p className="num-list__description">
                            То что вы начали регулярно заниматься физическими нагрузками - уже большой шаг вперед, но мы не знаем какой рацион питания был у вас ранее. По этому, советуем следовать советам наших диетологов, чтобы добиться наилучших результатов.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number" style={offset}>11</span>
                          <h6 className="num-list__title">Что если я не согласен с тренером?</h6>
                          <p className="num-list__description">
                            Вы всегда можете написать письмо в технчиескую поддержку, ваша жалоба будет рассмотрена.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number" style={offset}>12</span>
                          <h6 className="num-list__title">Кто проверяет мои видео - у этих людей есть спортивная подготовка?</h6>
                          <p className="num-list__description">
                            Все ваши видео отсматривают наши тренеры.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number" style={offset}>13</span>
                          <h6 className="num-list__title">Возможно ли участие в проекте при полной занятости?</h6>
                          <p className="num-list__description">
                            Все задания расчитаны на выполнение дома и не займут более 30-40 минут.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number" style={offset}>14</span>
                          <h6 className="num-list__title">Можно ли принимать участие в марафоне при Грудном Вскармливании?</h6>
                          <p className="num-list__description">
                            Можно, только если вы проконсультировались со своим врачом и он согласовал ваше участие в марафоне.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number" style={offset}>15</span>
                          <h6 className="num-list__title">Что если у меня критические дни/ограничения по здоровью и т.д.?</h6>
                          <p className="num-list__description">
                            Решение о начале тренировок и о нагрузках на собственное тело вы принимаете самостоятельно. Мы предоставляем задания, если вы не можете их выполнять - это ваше личное решение.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li id='tech' className="accordion__item">
                    <div className="accordion__header">
                      <h4 className="h3 accordion__header-title">Вопросы про технологию</h4>
                    </div>
                    <div className="accordion__content">
                      <ul className="num-list">
                        <li className="num-list__item">
                          <span className="num-list__number">1</span>
                          <h6 className="num-list__title">Обязательно ли подключение к Интернет для получения тренировок?</h6>
                          <p className="num-list__description">
                            Да.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">2</span>
                          <h6 className="num-list__title">Могу ли я из-за того, что у меня сломался телефон/ноутбук или пропал интернет, вернуть свои деньги?</h6>
                          <p className="num-list__description">
                            Нет.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">3</span>
                          <h6 className="num-list__title">По каким телефонам/почте писать в службу поддержки?</h6>
                          <p className="num-list__description">
                            8 800 707 02 53; you@todayme.ru
                          </p>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li id='gifts' className="accordion__item">
                    <div className="accordion__header">
                      <h4 className="h3 accordion__header-title">Вопросы про модераторов и подарки</h4>
                    </div>
                    <div className="accordion__content">
                      <ul className="num-list">
                        <li className="num-list__item">
                          <span className="num-list__number">1</span>
                          <h6 className="num-list__title">Есть ли регламент скорости ответа?</h6>
                          <p className="num-list__description">
                            60 минут, если вопрос не касается специфических аспектов медицинского характера. В случае, если вопрос узкоспециален, время ответа может быть увеличено.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">2</span>
                          <h6 className="num-list__title">Можно ли задавать вопросы тренерам каждый день?</h6>
                          <p className="num-list__description">
                            Да, вы можете писать вопросы каждый день, но им нужно время на ответ.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">3</span>
                          <h6 className="num-list__title">А можно взять приз деньгами?</h6>
                          <p className="num-list__description">
                            Нет.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">4</span>
                          <h6 className="num-list__title">Как я могу забрать свой приз?</h6>
                          <p className="num-list__description">
                            Для получения Супер-приза необходимо обратиться в офис партнера, например, Tez Tour. Подробности будут отдельно сообщены победителям. Остальные призы могут быть отправлены вам по почте.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li id='other' className="accordion__item">
                    <div className="accordion__header">
                      <h4 className="h3 accordion__header-title">Дополнительно</h4>
                    </div>
                    <div className="accordion__content">
                      <ul className="num-list">
                        <li className="num-list__item">
                          <span className="num-list__number">1</span>
                          <h6 className="num-list__title">Я уже видел(а) подобные проекты, чем ваш лучше? (чем отличается от других?)</h6>
                          <p className="num-list__description">
                            Наши спортивные программы разработаны с учетом вашей физической подготовки; меню и рекомендации по питанию разработаны ведущими специалистами по диетологии клиник АльфаЗдрав и СМ Клиника, на протяжении всего проекта вы можете получить консультацию врачей пяти специализаций. У каждого участника наших программ есть возможность оформить полис ДМС в компании  АльфаСтрахование.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">2</span>
                          <h6 className="num-list__title">Нужен ли будет какой-то дополнительный инвентарь для выполнения упражнений? </h6>
                          <p className="num-list__description">
                            Нет, инвентарь не обязателен, в этом прелесть наших тренировок.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">3</span>
                          <h6 className="num-list__title">Я вегетарианец, сыроед и т.д., подойдет ли мне ваша программа питания? </h6>
                          <p className="num-list__description">
                            Наша программа питания основывается на общепринятых нормативах по каллорийности пищи, если вы сыроед или вегитарианец, то, вероятно, имеете свое жесткое видение на употребляемую пищу. Для достижения результатов мы можем только СОВЕТОВАТЬ что вам есть, решение принимаете вы сами.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">4</span>
                          <h6 className="num-list__title">Через сколько по времени будут заметны изменения в моем теле? </h6>
                          <p className="num-list__description">
                            Изменения в теле будут заметны на второй неделе, если вы следуете советам по питанию и придерживаетесь плана тренировок. Если вы продолжите есть бургеры и не будете заниматься, то размеры останутся прежними, простите, это не мы, это бургеры.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">5</span>
                          <h6 className="num-list__title">Как проходит голосование и определяется победитель?</h6>
                          <p className="num-list__description">
                            У нас нет голосования, у нас всех участники получают призы, а главный приз рызыгрывается через генератор случайных чисел. Таким образом, ВСЕ участники получат подарки. Мы считаем, что каждый дошедший до конца достоин поощрения.
                          </p>
                        </li>
                        <li className="num-list__item">
                          <span className="num-list__number">6</span>
                          <h6 className="num-list__title">Если у меня нет страниц в соц. сетях и канала на Youtube, я могу участвовать в проекте?</h6>
                          <p className="num-list__description">
                            Youtube нужен для еженедельных отчетов. В социальные сети выкладывать отчеты не нужно. Вам нужен только Youtube-канал. Для участия в проекте, вам придется его завести. В этом вам поможет наша инструкция.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li id='youtube' className={ hash.hash === '#youtube' ? "accordion__item accordion__item--active" : "accordion__item"}>
                    <div className="accordion__header">
                      <h4 className="h3 accordion__header-title">Как выложить видео в Youtube</h4>
                    </div>
                    <div className="accordion__content">
                      <Editor
                        readOnly={true}
                        customStyleMap={customStyleMap}
                        editorState={editorState}
                        blockRendererFn={mediaBlockRenderer}/>

                      <br/>
                      <iframe width="100%" height="100%" src='https://www.youtube.com/embed/1iI0TxfzqxA' style={contentStyle} frameBorder="0" allowFullScreen></iframe>
                      <br/>
                      <br/>
                      <iframe width="100%" height="100%" src='https://www.youtube.com/embed/4OT7tspcmLc' style={contentStyle} frameBorder="0" allowFullScreen></iframe>

                    </div>
                  </li>

                </ul>
              </div>

            </div>
          </div>
        </div>

        <ul className="menu-mob-bottom">
          <li className="menu-mob-bottom__item">
            <a href="#" className="menu-mob-bottom__item-inner" onClick={
              () => browserHistory.push('/task')
            }>
              <span className="menu-mob-bottom__ico">
                <svg className="svg-icon ico-m-tasks">
                  <use xlinkHref="#ico-m-tasks"></use>
                </svg>
              </span>
              <span className="menu-mob-bottom__title">Задания</span>
            </a>
          </li>
          {/* <li className="menu-mob-bottom__item">
            <a href="#" className="menu-mob-bottom__item-inner" onClick={
              () => browserHistory.push('/reports')
            }>
              <span className="menu-mob-bottom__ico">
                <svg className="svg-icon ico-m-book">
                  <use xlinkHref="#ico-m-book"></use>
                </svg>
              </span>
              <span className="menu-mob-bottom__title">Зачетка</span>
            </a>
          </li>
          <li className="menu-mob-bottom__item">
            <a href="#" className="menu-mob-bottom__item-inner" onClick={
              () => browserHistory.push('/food')
            }>
              <span className="menu-mob-bottom__ico">
                <svg className="svg-icon ico-m-food">
                  <use xlinkHref="#ico-m-food"></use>
                </svg>
              </span>
              <span className="menu-mob-bottom__title">Питание</span>
            </a>
          </li> */}
          <li className="menu-mob-bottom__item">
            <a href="#" className="menu-mob-bottom__item-inner" onClick={
              () => browserHistory.push('/faq')
            }>
              <span className="menu-mob-bottom__ico">
                <svg className="svg-icon ico-m-faq">
                  <use xlinkHref="#ico-m-faq"></use>
                </svg>
              </span>
              <span className="menu-mob-bottom__title">ЧАВО</span>
            </a>
          </li>
          <li className="menu-mob-bottom__item">
            <a href="#" className="menu-mob-bottom__item-inner" onClick={
              () => browserHistory.push('/profile')
            }>
              <span className="menu-mob-bottom__ico">
                <svg className="svg-icon ico-m-faq">
                  <use xlinkHref="#ico-m-faq"></use>
                </svg>
              </span>
              <span className="menu-mob-bottom__title">Профиль</span>
            </a>
          </li>
          <li className="menu-mob-bottom__item">
            <a href="#" className="menu-mob-bottom__item-inner" onClick={
              () => browserHistory.push('/photos')
            }>
              <span className="menu-mob-bottom__ico">
                <svg className="svg-icon ico-m-faq">
                  <use xlinkHref="#ico-m-faq"></use>
                </svg>
              </span>
              <span className="menu-mob-bottom__title">Фото</span>
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
}

export default Faq
