import React from 'react'
import Image from '../Image/Image'
import useEditorStore from '../../utilis/editorStore'
const Layers = () => {

  const {selectedLayer ,setSelectedLayer,addText,canvasOptions}=useEditorStore()
  const handleSelectedLayer=(layer)=>{
    setSelectedLayer(layer)

    if(layer==='text'){
      addText()
    }
  }

  return (
    <div className='layers'>
      <div className='layersTitle'>
        <h3>Layers</h3>
        <p>Select a layer to edit</p>
      </div>
      <div className={`layer ${selectedLayer === "text" ? "selected" : ""}`} onClick={()=>handleSelectedLayer('text')}>
        <div className='layerImage'>
          <Image path='/general/text.png' alt='' w={48} h={48}/>
          <span>add to text</span>
        </div>
      </div>

      <div className={`layer ${selectedLayer === "canvas" ? "selected" : ""}`} onClick={()=>handleSelectedLayer('canvas')}>
        <div className='layerImage' style={{backgroundColor: canvasOptions.backgroundColor}}>
         
          <span>Canvas</span>
        </div>
      </div>

    </div>
  )
}

export default Layers