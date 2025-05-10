import React from 'react'

import './galleryItem.css'
import { Link } from 'react-router-dom'
import Image from '../Image/Image'


export  const GalleryItem = ({item}) => {

  const optimisedHeight=(372*item.height)/item.width
  return (
    <div className='galleryItem' style={{gridRowEnd :`span ${Math.ceil(item.height/100)}`}}>
        {/* <img src={item.media} alt='alt'/> */}

        <Image path={item.media} alt="alt" w={372} h={optimisedHeight}/>
       
        <Link to={`/pin/${item._id}`} className='overlay'></Link>
        <button className='saveButton'>Save</button>
        <div className='overlayIcons'>
          <button>
            <Image path='/general/share.svg'/>
          </button>
          <button>
            <Image path='/general/more.svg'/>
          </button>
        </div>
    </div>
  )
}
