import React from 'react'
// const styles = {
//   p: {
//     display: 'block',
//     marginTop: '1em',
//     marginBottom: '1em',
//     marginLeft: '0',
//     marginRight: '0',
//   },
//   ul: {
//     lineHeight: '2em',
//     textDecoration: 'none',
//     textIndent: '5px',
//     listStylePosition: 'outside',
//     // listStyleImage: url(arrow.gif),
//     listStyleType: 'square',
//     padding: '6px',
//     margin: '2px',
//   }
// }

const TaskIntro = ({ text }) => (
  <div className="stage-box stage-box--big-padding" dangerouslySetInnerHTML={{__html: text}}></div>
)

export default TaskIntro
