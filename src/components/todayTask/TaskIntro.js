import React from 'react'
import {
  Entity,
  Editor,
  EditorState,
  convertFromRaw,
  CompositeDecorator
} from 'draft-js'

const decorator = new CompositeDecorator([
  {
    strategy: (contentBlock, callback) => {
      contentBlock.findEntityRanges(
        (character) => {
          const entityKey = character.getEntity()
          return (
            entityKey !== null &&
            Entity.get(entityKey).getType() === 'LINK'
          )
        },
        callback
      )
    },
    component: (props) => {
      const {url} = Entity.get(props.entityKey).getData()
      return (
        <a href={url}>
          {props.children}
        </a>
      )
    },
  },
])

const TaskIntro = ({text = '', json}) => {
  const editorState = json ? EditorState.createWithContent(convertFromRaw(json), decorator) : EditorState.createEmpty()

  return (
    <div className="stage-box stage-box--big-padding">
      <Editor
        readOnly={true}
        editorState={editorState}/>
    </div>
  )
}

export default TaskIntro
