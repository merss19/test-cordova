import React from 'react'
import {
  Entity,
  Editor,
  EditorState,
  convertFromRaw,
  CompositeDecorator
} from 'draft-js'
import {getCustomStyleMap} from 'draftjs-utils'

const customStyleMap = getCustomStyleMap()

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
        <a href='#' onClick={() => {
          console.log(url)
          window.open(url, '_blank');
          return false
        }}>
          {props.children}
        </a>
      )
    },
  },
])

const Image = (props) => {
  return <img src={props.src} style={{
    maxWidth: '100%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto' }}/>;
};

const Atomic = (props) => {
  const entity = Entity.get(props.block.getEntityAt(0));
  const {src} = entity.getData();
  const type = entity.getType();

  let media;
  if (type === 'IMAGE') {
    media = <Image src={src} />;
  }

  return media;
};

function mediaBlockRenderer(block) {
  if (block.getType() === 'atomic') {
    return {
      component: Atomic,
      editable: false,
    };
  }

  return null;
}

const TaskIntro = ({ text = '', json, scrollToTasks, isTasks }) => {
  const editorState = json ? EditorState.createWithContent(convertFromRaw(json), decorator) : EditorState.createEmpty()

  return (
    <div className="stage-box stage-box--big-padding">
      {isTasks &&
        // <a href='#' onClick={scrollToTasks}>
        //   К заданиям
        // </a>
        <div>
          <div className="btn btn--primary" style={{
            backgroundColor: '#1F447B',
          }} onClick={scrollToTasks}>
            К заданиям
          </div>
          <br/>
          <br/>
        </div>
      }
      <Editor
        readOnly={true}
        customStyleMap={customStyleMap}
        editorState={editorState}
        blockRendererFn={mediaBlockRenderer}/>
    </div>
  )
}

export default TaskIntro
