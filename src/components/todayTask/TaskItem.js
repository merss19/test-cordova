import React, { Component } from 'react'
import YoutubeModal from './YoutubeModal';
import { connect } from 'react-redux';
import { api } from '../../config.js'
import cookie from 'react-cookie'
import { taskDone } from '../../actions'




class TaskItem extends Component {

	constructor(props) {
		super();
		console.log('TaskItem')
		console.log(props)
		this.state = {
			isDone: props.task.isDone
		};
	}

	save(){
		console.log('save')
		console.log(this.state.isDone)

		if (this.state.isDone) {
			const {index} = this.props
			const task = document.getElementById(`task-${index}`)
			const taskTop = document.getElementById(`task-${index}`).offsetTop
			const taskHeight = document.getElementById(`task-${index}`).clientHeight

			console.log(document.getElementById(`task-${index}`))
			console.log(document.getElementById(`task-${index}`).offsetTop)
			console.log(document.getElementById(`task-${index}`).clientHeight)

			window.scrollTo(0, (taskTop + taskHeight))
		}

		this.regIsDone()
	}

	changeHandler() {
		console.log('changeHandlfgfger')
		console.log(this.state.isDone)
		this.setState({isDone: !this.state.isDone}, ()=>this.save())

	}



	regIsDone(){
		console.log('regIsDone')

		const {token, task} = this.props

		const payload = {
			authToken: token ? token : cookie.load('token'),
			data:{
				task: task.id,
				isDone:this.state.isDone,
				user: 1129
			}
		}

		console.log(payload)

		this.props.taskDone(payload)

/*		return fetch(`${api}/user/userTask-setState`, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(payload)
		})
				.then(response => response.json())
				.then(json => {
					console.log('res')
					console.log(json)
				})*/
	}



	render() {
		console.log('render')
		const { task, index} = this.props
		const checked = this.state.isDone ? 'checked' : ''
		const active = this.state.isDone ? 'task__item--complete' : ''
		console.log(checked)
		console.log(active)
		return (
				<div>
					<div className={"task__header " + active}>
						<div className="task__title">
	                  <span className="task__number">
	                    <span>{index + 1}</span>
	                  </span>
							<span className="task__name">{task.name}</span>
						</div>

						<div id={`btn${index}`} className="btn-taks">
	                  <span className="checkbox">
	                    <label className="checkbox__label" htmlFor={`task[${index}]`}>
		                    <span className="checkbox__title">Выполнил</span>
		                    <input className="checkbox__field checkbox__field--btn-taks"
		                           id={`task[${index}]`}
		                           checked={checked}
		                           onChange={this.changeHandler.bind(this)}
		                            type="checkbox"/>
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
						<p className="base-parag text-center">{task.description}</p>
						<ul className="num-list">
							{task.exercises.map((exercise, ind) => (
									<li key={ind} className="num-list__item">
										<span className="num-list__number">{ind + 1}</span>
										<YoutubeModal exercise={exercise}
										              ind={ind}>{exercise.description}
										</YoutubeModal>
									</li>
							))}
						</ul>
					</div>

				</div>
		)
	}
}

export default connect(null,{taskDone}
)(TaskItem)
