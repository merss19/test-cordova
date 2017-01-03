import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

let localMinutes = 1
let localSeconds = 0
let refreshTimer

const getSecondDigit = digits => {
  return ('' + digits)[1] ? digits : '0' + digits
}

class Timer extends Component {
  render() {
    const { timer, startTimer } = this.props
    const { minutes, seconds } = timer
    return (
      <div>
        <div className="timer">
          <input ref="timerMin" type="text" className="timer__min" value={getSecondDigit(minutes)} onChange={()=>{}}/>
          <input ref="timerSec" type="text" className="timer__sec" value={getSecondDigit(seconds)} onChange={()=>{}}/>
        </div>

        <div className="text-center mb30">
          <button className="btn btn--secondary" onClick={e => {
            e.preventDefault()
            localMinutes = 1
            localSeconds = 0
            clearInterval(refreshTimer)
            refreshTimer = setInterval(() => {
              if (localMinutes > 0 || localSeconds > 0) {
                if (localSeconds === 0 && localMinutes > 0) {
                  localMinutes -= 1
                  localSeconds = 59
                } else {
                  localSeconds -= 1
                }

                startTimer({ minutes: localMinutes, seconds: localSeconds })
              }
            }, 1000)
          }}>
            Начать
          </button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startTimer: bindActionCreators(({minutes, seconds}) => ({
      type: 'START_TIMER',
      timer: { minutes, seconds }
    }), dispatch)
})

const mapStateToProps = state => {
  return { timer: state.timer }
}

Timer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer)

export default Timer
