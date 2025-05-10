import React from 'react'
import UserButton from '../userButton/UserButton'
import './topBar.css'
import Image from '../Image/Image'
import { useNavigate } from 'react-router-dom'

const TopBar = () => {
   const navigate=useNavigate()
  const handleSubmit=(e)=>{
    e.preventDefault()
    navigate(`/search?search=${e.target[0].value}`)

  }
  return (
    <div className='topBar'>
        <form onSubmit={handleSubmit} className='search'>
            <Image path='/general/search.svg' alt='alt'/>
           <input type='text' placeholder='search'/>
        </form>
        <UserButton/>
    </div>
  )
}

export default TopBar