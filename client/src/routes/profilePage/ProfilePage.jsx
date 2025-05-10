import React, { useState } from 'react'
import './profilePage.css'
import Gallery from "../../components/gallery/gallery";

import Image from '../../components/Image/Image'
import Boards from '../../components/Boards/Boards';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import apiRequest from '../../utilis/apiRequest'
import FollowButton from './FollowButton';

const ProfilePage = () => {

  const [type,setType]=useState('saved')

  const {username}=useParams()
  const {isPending,error,data}=useQuery({
    queryKey:['profile',username],
    queryFn:()=>apiRequest.get(`/users/${username}`).then((res)=>res.data)
   })
   if(isPending) return 'loading...'
   if(error) return 'an error has occured'+error.message
   if(!data) return 'user not found'
  return (
    <div className='profilePage'>
      <Image path={ data.img||'/general/noAvatar.png'} className='profileImg' w={100} h={100}/> 
      <h1 className='profileName'>{data.displayName}</h1>
      <span className='profileName'>{data.username}</span>
      <div className='followCounts'>{data.followerCount} followers . {data.followingCount} following </div>
      <div className='profileInteractions'>
     <Image path='/general/share.svg' alt='alt'/>
     <div className='profileButtons'>
       <button>Message</button>
       <FollowButton isFollowing={data.isFollowing}
        username={data.username}
       />
     </div>
     <Image path='/general/more.svg'/>
      </div>
      <div className='profileOptions'>
     <span onClick={()=>setType("created")}  className={type==="created"?"active":""}>created</span>
     <span   onClick={()=>setType("saved")} className={type==="saved"?"active":""}>Saved</span>
      </div>
      {type==='created'?<Gallery userId={data._id} />:<Boards userId={data._id}/>}
    </div>
  )
}

export default ProfilePage