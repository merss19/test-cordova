import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import InputModal from '../componentKit/InputModal'
import ConditionItem from './ConditionItem'

export const conditions = [
	{
		id:1,
		class:'ico-your-condition-1',
		title:'отлично',
		filter:'good'
	},
	{
		id:2,
		class:'ico-your-condition-2',
		title:'так себе',
		filter:'middle'
	},
	{
		id:3,
		class:'ico-your-condition-3',
		title:'не очень',
		filter:'bad'
	}
]
// class SendReportModal extends Component {
//
// let condition1 = true
// let condition2 = false
// let condition3 = false

class SendReportModal extends Component {
//   render() {
//     const { error, handleSubmit, onSubmit } = this.props
//     return (
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <h3 className="h1">Отчет тренеру</h3>
//         <hr/>
//         <p className="sub-title">Напиши сообщение тренеру о том, что тренировка отработана! Если ты и правда все сделал :)</p>
//         <Field name="report" placeholder="Выполнено, сделал, справился..." component={InputModal} />
//         <p className="text-center">Как ты себя чувствовал во время выполнения заданий?</p>
//         <ul className="your-condition">
//           <li ref='condition1' className="your-condition__item your-condition__item--active" onClick={() => {
//             this.refs.condition1.className = "your-condition__item your-condition__item--active"
//             this.refs.condition2.className = "your-condition__item"
//             this.refs.condition3.className = "your-condition__item"
//           }}>
//             <span className="your-condition__ico">
//               <svg className="svg-icon ico-your-condition-1">
//                 <use xlinkHref="#ico-your-condition-1"></use>
//               </svg>
//             </span>
//             <p className="your-condition__title">отлично</p>
//           </li>
//           <li ref='condition2' className="your-condition__item" onClick={() => {
//             this.refs.condition1.className = "your-condition__item"
//             this.refs.condition2.className = "your-condition__item your-condition__item--active"
//             this.refs.condition3.className = "your-condition__item"
//           }}>
//             <span className="your-condition__ico">
//               <svg className="svg-icon ico-your-condition-2">
//                 <use xlinkHref="#ico-your-condition-2"></use>
//               </svg>
//             </span>
//             <p className="your-condition__title">так себе</p>
//           </li>
//           <li ref='condition3' className="your-condition__item" onClick={() => {
//             this.refs.condition1.className = "your-condition__item"
//             this.refs.condition2.className = "your-condition__item"
//             this.refs.condition3.className = "your-condition__item your-condition__item--active"
//           }}>
//             <span className="your-condition__ico">
//               <svg className="svg-icon ico-your-condition-3">
//                 <use xlinkHref="#ico-your-condition-3"></use>
//               </svg>
//             </span>
//             <p className="your-condition__title">не очень</p>
//           </li>
//         </ul>
//
//         {/*
//           <p className="text-center mb30">Прикрепите файл или вставьте ссылку с видео выполнения заданий</p>
//
//           <Field name="video" placeholder="http://youtube.com" component={InputModal} />
//           {error && <div className="text-center"><strong>{error}</strong></div>}
//         */}
//
//         <hr/>
//
//         <div className="text-center">
//           <button type='submit' className="btn btn--primary js-fill-report-2">
//             Отправить отчет
//           </button>
//           {/* <div className='divider'/>
//           <button className="btn btn--primary js-fill-report-2" onClick={e => {
//             e.preventDefault()
//             this.hide()
//           }}>
//             Закрыть
//           </button> */}
//         </div>
//       </form>
//     )
//   }
// }
	constructor(props) {
		super(props);
		this.state = {
			selected: ''
		}
	}


	onChangeCondition(filter){

		this.setState({
			selected:filter
		})
	}

	render() {
		const { error, handleSubmit, onSubmit } = this.props
		const condition = conditions.map((item) => {
			return (
			<label key={item.id}>
				<Field name="health"
				       component={ConditionItem}
				       item={item} type="radio"
				       selected={this.state.selected}
				       onChangeCondition={this.onChangeCondition.bind(this)}
				       value={item.filter}/>
			</label>

			)
		})
		return (
			<form onSubmit={handleSubmit(onSubmit)}>
				<h3 className="h1">Отчет тренеру</h3>
				<hr/>
				<p className="sub-title">Напиши сообщение тренеру о том, что тренировка отработана! Если ты и правда все
					сделал :)</p>
				<Field name="report" placeholder="Выполнено, сделал, справился..." component={InputModal}/>
				<p className="text-center">Как ты себя чувствовал во время выполнения заданий?</p>
				<ul className="your-condition">
					{condition}
				</ul>

				<p className="text-center mb30">Прикрепите файл или вставьте ссылку с видео выполнения заданий</p>

				 <Field name="video" placeholder="http://youtube.com" component={InputModal} />
				 {error && <div className="text-center"><strong>{error}</strong></div>}

				<hr/>

				<div className="text-center">
					<button type='submit' className="btn btn--primary js-fill-report-2">
						Отправить отчет
					</button>
				</div>
			</form>
		)
	}
}
const validate = data => {
  const errors = {}

  // if (!data.report)
  //   errors.report = 'Поле текста не должно быть пустым'
  //
  // if (!data.video)
  //   errors.video = 'Ссылка на видео должна быть заполнена'

  return errors
}

export default reduxForm({
  form: 'sendReportValidation',
  validate
})(SendReportModal)
