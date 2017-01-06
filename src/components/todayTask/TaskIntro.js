import React from 'react'
import {
  Editor,
  EditorState,
  convertFromRaw,
} from 'draft-js';

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
