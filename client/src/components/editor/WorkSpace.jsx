import React, { useEffect } from 'react'
import useEditorStore from '../../utilis/editorStore'
import Image from '../Image/Image'
import { useRef } from 'react'

const WorkSpace = ({previewImg}) => {
  const {textOptions,setTextOptions,canvasOptions,setCanvasOptions,setSelectedLayer}=useEditorStore()

  useEffect(()=>{
   if(canvasOptions.height===0){
    const canvasHeight=(375*previewImg.height)/previewImg.width

    setCanvasOptions({
      ...canvasOptions,
      height:canvasHeight,
      orientation:canvasHeight>375?"portrait":'landscape'
    })
   }
 },[previewImg,canvasOptions,setCanvasOptions])

 const itemRef=useRef(null)
 const ContainerRef=useRef(null)
 const dragging=useRef(false)

 const offset=useRef({x:0,y:0})

  const handleMouseMove=(e)=>{
     if(!dragging.current)return

     setTextOptions({
      ...textOptions,
      left:e.clientX-offset.current.x,
      top:e.clientY-offset.current.y,
     })
  }

  const handleMouseUp=(e)=>{
    dragging.current=false;
  }
  const handleMouseLeave=(e)=>{
    dragging.current=false;
  }
  const handleMousedown=(e)=>{
    setSelectedLayer('text')
    dragging.current=true;
     offset.current={
      x:e.clientX-textOptions.left,
      y:e.clientY-textOptions.top
     }
  }


  return (
    <div className='workspace'>
      <div className='canvas' style={{height:canvasOptions.height, backgroundColor:canvasOptions.backgroundColor}} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseLeave} ref={ContainerRef}>
        <img src={previewImg.url} alt=''/>
        {textOptions.text&&(
          <div className='text'  style={{
              left: textOptions.left,
              top: textOptions.top,
              fontSize: `${textOptions.fontSize}px`,
            }} onMouseDown={handleMousedown} ref={itemRef}>
          <input type='text' value={textOptions.text}  onChange={e=>setTextOptions({...textOptions,text:e.target.value})}  style={{
                color: textOptions.color,
              }}/>
          <div className='deleteTextButton' onClick={()=>setTextOptions({...textOptions,text:''})}>
            <Image path='/general/delete.svg'  alt='' />
          </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WorkSpace