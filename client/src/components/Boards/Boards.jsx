import React from 'react'
import './Boards.css'
import Image from "../Image/Image";
import { useQuery } from '@tanstack/react-query';
import apiRequest from '../../utilis/apiRequest';
import {format} from 'timeago.js'
import { Link } from 'react-router-dom';
const Boards = ({userId}) => {


  const {isPending,error,data}=useQuery({
    queryKey:['boards',userId],
    queryFn:()=>apiRequest.get(`/boards/${userId}`).then((res)=>res.data)
   })
   if(isPending) return 'loading...'
   if(error) return 'an error has occured'+error.message
   if(!data) return 'user not found'
  return (
    <div className='collections'>
   {/*collections*/}
   {data.map((board)=>(
    <Link to={`/search?boardId=${board._id}`} className='collection' key={board._id}>
   <Image src= {board.firstPin.media}  alt="alt"  />
   <div className=' collectionInfo'>
    <h1>{board.title}</h1>
    <span>{board.pinCount}Pins.{format(board.createdAt)}</span>
   </div>


   </Link>

   )

   )}
    

    </div>
  )
}

export default Boards