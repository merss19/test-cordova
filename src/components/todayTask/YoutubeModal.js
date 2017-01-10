import React, { Component } from 'react'
//import Modal from 'boron/FadeModal'
import Modal from 'react-modal';


const contentStyle = {
	overlay : {
	position          : 'fixed',
	top               : 0,
	left              : 0,
	right             : 0,
	bottom            : 0,
	cursor            :'pointer',
	zIndex            :'9999',
	height            :'100%',
	overflow          :'hidden',
	backgroundColor   :'rgb(55, 58, 71)',
	animationFillMode :'forwards',
	animationDuration :'0.3s',
	animationName     :'anim_31483991342307',
	animationTimingFunction: 'ease-out'

	},
	content : {
	position                   : 'absolute',
	WebkitOverflowScrolling    : 'touch',
	outline                    : 'none',
	transform                  :'translate3d(-50%, -50%, 0px)',
	top                        : '45%',
	left                       : '50%',
	border                     : 'none',
	background                 : 'transparent',
	padding                    : '0',
	bottom                     :'0',
	rigth                      :'0',
	width                      :'100%',
	maxWidth                   :'794px',
	minWidth                   :'320px',
	height                     :'auto',
	overflow                   :'hidden'
	}
}

class YoutubeModal extends Component {

	constructor() {
		super();

		this.state = {
			modalIsOpen: false
		};
	}

	openModal(e) {
		e.preventDefault()
		this.setState({modalIsOpen: true});
	}

	closeModal() {
		this.setState({modalIsOpen: false});
	}


  render() {
    const { exercise, ind} = this.props
    return (
      <div>
        <p className="num-list__description">
          <span>{exercise.count}</span>
          <div className='divider'/>
          <a href="#" className="video-pupupg" onClick={this.openModal.bind(this)}>
	          {this.props.children}
          </a>
        </p>
        <Modal isOpen={this.state.modalIsOpen}
               style={contentStyle}
               onRequestClose={this.closeModal.bind(this)}
               contentLabel={exercise.description}>
          <iframe width="100%" height="100%" src={exercise.video} frameBorder="0" allowFullScreen></iframe>
        </Modal>
      </div>
    )
  }
}

export default YoutubeModal
