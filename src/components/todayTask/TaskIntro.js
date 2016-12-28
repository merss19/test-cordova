import React from 'react'

const TaskIntro = ({ text }) => (
  <div className="stage-box stage-box--big-padding" dangerouslySetInnerHTML={{__html: text}}></div>
)

export default TaskIntro
