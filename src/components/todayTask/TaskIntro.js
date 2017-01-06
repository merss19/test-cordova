import React from 'react'
import {
  Editor,
  EditorState,
  convertFromRaw,
} from 'draft-js';

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

const TaskIntro = ({text = '', json}) => {
  const editorState = json ? EditorState.createWithContent(convertFromRaw(json)) : EditorState.createEmpty()

  return (
    <div className="stage-box stage-box--big-padding">
      <Editor
        readOnly={true}
        editorState={editorState}/>
    </div>
  )
}

export default TaskIntro
