import React from 'react'
import './editor.css'
import Layers from './Layers'
import Options from './Options'
import WorkSpace from './WorkSpace'

const Editor = ({previewImg}) => {
  return (
    <div className='editor'>
    <Layers previewImg={previewImg}/>
    
    <WorkSpace previewImg={previewImg}/>

    <Options previewImg={previewImg}/>
    </div>
  )
}

export default Editor