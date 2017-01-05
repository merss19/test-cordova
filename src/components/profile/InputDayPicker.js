import React, { Component } from 'react';
import moment from 'moment';
import DayPicker, { DateUtils } from 'react-day-picker';
import { connect } from 'react-redux'

import 'react-day-picker/lib/style.css';

const currentYear = (new Date()).getFullYear();
const fromMonth = new Date(currentYear - 67, 0, 1, 0, 0);
const toMonth = new Date(currentYear - 15, 11, 31, 23, 59);

const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май',
  'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь',
  'Декабрь'];

const WEEKDAYS_LONG = ['Понедельник', 'Вторник', 'Среда',
  'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

const WEEKDAYS_SHORT = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const overlayStyle = {
  position: 'absolute',
  background: 'white',
  boxShadow: '0 2px 5px rgba(0, 0, 0, .15)',
  zIndex: 100
};

function YearMonthForm({ date, localeUtils, onChange }) {
  const months = MONTHS

  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <div className="DayPicker-Caption">
      <select name="month" onChange={ handleChange } value={ date.getMonth() }>
        { months.map((month, i) =>
          <option key={ i } value={ i }>
            { month }
          </option>)
        }
      </select>
      <select name="year" onChange={ handleChange } value={ date.getFullYear() }>
        { years.map((year, i) =>
          <option key={ i } value={ year }>
            { year }
          </option>)
        }
      </select>
    </div>
  );
}

class InputDayPicker extends Component {

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleContainerMouseDown = this.handleContainerMouseDown.bind(this);
  }

  state = {
    showOverlay: false,
    value: '',
    selectedDay: null,
    initialMonth: fromMonth,
  };

  componentWillUnmount() {
    clearTimeout(this.clickTimeout);
  }

  input = null;
  daypicker = null;
  clickedInside = false;
  clickTimeout = null;

  handleContainerMouseDown() {
    this.clickedInside = true;
    // The input's onBlur method is called from a queue right after onMouseDown event.
    // setTimeout adds another callback in the queue, but is called later than onBlur event
    this.clickTimeout = setTimeout(() => {
      this.clickedInside = false;
    }, 0);
  }

  handleInputFocus() {
    this.setState({
      showOverlay: true,
    });
  }

  handleInputBlur() {
    const showOverlay = this.clickedInside;

    this.setState({
      showOverlay,
    });

    // Force input's focus if blur event was caused by clicking on the calendar
    if (showOverlay) {
      this.input.focus();
    }
  }

  handleInputChange(e) {
    const { value } = e.target;
    const momentDay = moment(value, 'L', true);
    if (momentDay.isValid()) {
      this.setState({
        selectedDay: momentDay.toDate(),
        value,
      }, () => {
        this.daypicker.showMonth(this.state.selectedDay);
      });
    } else {
      this.setState({ value, selectedDay: null });
    }
  }


  handleDayClick(e, day) {
    this.setState({
      value: moment(day).format('L'),
      selectedDay: day,
      showOverlay: false,
    });
    this.input.blur();
    this.props.dispatch({ type: 'BIRTHDAY', birthday: moment(day).format('DD.MM.YYYY') })
  }

  render() {
    const { input, name, placeholder, meta: { touched, error }, birthday } = this.props
    return (
      <div onMouseDown={ this.handleContainerMouseDown }>
        <div className="input input--box">
          <input
            {...input}
            className="input__field"
            name={name}
            type="text"
            ref={ (el) => { this.input = el; } }
            placeholder={placeholder}
            value={birthday}
            onChange={ this.handleInputChange }
            onFocus={ this.handleInputFocus }
            onBlur={ this.handleInputBlur }
          />
        </div>
        {touched && error && <span>{error}</span>}
        { this.state.showOverlay &&
          <div style={ { position: 'relative' } }>
            <div style={ overlayStyle }>
              <div className="YearNavigation">
                <DayPicker
                  ref={ (el) => { this.daypicker = el; } }
                  locale="ru"
                  months={ MONTHS }
                  weekdaysLong={ WEEKDAYS_LONG }
                  weekdaysShort={ WEEKDAYS_SHORT }
                  onDayClick={ this.handleDayClick }
                  selectedDays={ day => DateUtils.isSameDay(this.state.selectedDay, day) }
                  initialMonth={ this.state.initialMonth }
                  fromMonth={ fromMonth }
                  toMonth={ toMonth }
                  captionElement={
                    <YearMonthForm onChange={ initialMonth => this.setState({ initialMonth }) } />
                  }
                />
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { birthday } = state
  return {
    birthday
  }
}

InputDayPicker = connect(
  mapStateToProps
)(InputDayPicker)

export default InputDayPicker
