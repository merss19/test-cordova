import React from 'react'

const IMAGE_PATH = 'https://api.todayme.ru/'

export default ({
  title,
  front,
  back,
  left,
  right
}) => (
  <div className="pending-photos">
    <h3 className="pending-photos__title">
      {title}
    </h3>

    <div className="pending-photos__row">

      <div className="pending-photos__photo">
        <div className="pending-photos__photo-title">
          Спереди
        </div>
        <img
          className="pending-photos__photo-image"
          src={IMAGE_PATH + front}
          alt="Спереди"/>
      </div>
      <div className="pending-photos__photo">
        <div className="pending-photos__photo-title">
          Сзади
        </div>
        <img
          className="pending-photos__photo-image"
          src={IMAGE_PATH + back}
          alt="Сзади"/>
      </div>
      <div className="pending-photos__photo">
        <div className="pending-photos__photo-title">
          Слева
        </div>
        <img
          className="pending-photos__photo-image"
          src={IMAGE_PATH + left}
          alt="Слева"/>
      </div>
      <div className="pending-photos__photo">
        <div className="pending-photos__photo-title">
          Справа
        </div>
        <img
          className="pending-photos__photo-image"
          src={IMAGE_PATH + right}
          alt="Справа"/>
      </div>
    </div>
  </div>
)