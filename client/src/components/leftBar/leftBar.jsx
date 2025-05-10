import React from 'react'
import {Link} from "react-router-dom";
import './leftBar.css'
import Image from '../Image/Image';

const LeftBar = () => {
  return (
    <div className='leftBar'>
    <div className='menuIcons'>
    <Link to="/" className="menuIcon">
          <Image path="/general/logo.png" alt="" className="logo"/>
        </Link>
        <Link to="/" className="menuIcon">
          <Image path="/general/home.svg" alt="" />
        </Link>
        <Link to="/create" className="menuIcon">
          <Image path="/general/create.svg" alt="" />
        </Link>
        <Link to="/" className="menuIcon">
          <Image path="/general/updates.svg" alt="" />
        </Link>
        <Link to="/" className="menuIcon">
          <Image path="/general/messages.svg" alt="" />
        </Link>
    </div>
    </div>
  )
}

export default LeftBar