import React, { useState } from 'react';
import './UserButton.css';
import Image from '../Image/Image';
import apiRequest from '../../utilis/apiRequest';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../utilis/authStore';

const UserButton = () => {
  //Temp
  const [open, setOpen] = useState(false);

  const navigate=useNavigate()

  const{currentUser,removeCurrentUser}=useAuthStore()
  
  
  //const currentUser = true;

  const handleLogout= async(req,res)=>{
    try {
      await apiRequest.post('/users/auth/logout',{})
      removeCurrentUser()

      navigate('/auth')
    } catch (error) {
      console.log(error)
    }
  }

 

  return currentUser ? (
    <div className='userButton'>
      <Image path= {currentUser.img ||'/general/noAvatar.png'} alt='' />
      <div className='' onClick={() => setOpen((prev) => !prev)} >
      <Image
        
        path='/general/arrow.svg' 
        alt='' 
        className='arrow' 
      />

      </div>
      { open && (
        <div className='userOptions'>
          <Link to={`/profile/${currentUser.username}`} className='userOption' >Profile</Link>
          <div className='userOption'>Settings</div>
          <div className='userOption' onClick={handleLogout}>Logout</div>
        </div>
      )}
    </div>  
  ) : (  
    <Link to='/auth' className='loginLink'>
      Login/Signup
    </Link>
  );
};

export default UserButton;
