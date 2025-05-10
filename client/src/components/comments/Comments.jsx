import React, { useState } from 'react'
import './Comments.css'
import Image from '../Image/Image'
import EmojiPicker from 'emoji-picker-react'
import {useQuery, useQueryClient} from '@tanstack/react-query'
import apiRequest from '../../utilis/apiRequest';
import Comment from './comment'
import { useMutation } from '@tanstack/react-query'

const Comments = ({id}) => {

  const addComment=async(comment)=>{
    const res= await apiRequest.post('/comments',comment
      )
      return res.data;
  }

  const [open,setOpen]=useState(false)


  const[desc,setDesc]=useState('')

  const handleEmojiClick=(emoji)=>{
    setDesc((prev)=> prev+emoji.emoji)

    setOpen(false)
  }

const queryClient=useQueryClient() 
  const mutation = useMutation({
    mutationFn: addComment,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['comments',id]})
      setDesc('')
      setOpen(false)
    }
  })

  const {isPending,error,data}=useQuery({
    queryKey:['comments',id],
    queryFn:()=>apiRequest.get(`/comments/${id}`).then((res)=>res.data)
   })
   if(isPending) return 'loading...'
   if(error) return 'an error has occured'+error.message
   if(!data) return 'user not found'

   const handleSubmit= async(e)=>{
    e.preventDefault()
   mutation.mutate({
    description:desc,
    pin:id,
   })
    
   }



  return (
    <div className='comments'>
    <div className='commentList'>

    <span className='commentCount'>{data.length===0 ? "no comments" : data.length + "comments" }</span>
   {/*comment*/}

   {data.map((comment)=>(
   <Comment key={comment._id} comment={comment}/>
   ))}
   
    </div>


    <form className='commentForm' onSubmit={handleSubmit}>
     <input type='text' placeholder='add a comment' onChange={(e)=>setDesc(e.target.value)} value={desc}/>
     <div className='emoji'>
      <div onClick={()=>setOpen((prev)=>!prev)}>😊</div>
     {open && <div className='emojiPicker'><EmojiPicker onEmojiClick={handleEmojiClick}/></div>}
     </div>
    </form>
    </div>
  )
}

export default Comments