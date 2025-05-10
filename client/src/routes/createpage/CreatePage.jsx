import React, { useEffect, useState,useRef} from 'react'
import './createPage.css'
import IKImage from '../../components/Image/Image'
import useAuthStore from '../../utilis/authStore'
import { useNavigate } from 'react-router-dom'
import Editor from '../../components/editor/Editor'
import useEditorStore from '../../utilis/editorStore'
import apiRequest from '../../utilis/apiRequest';
import { useMutation } from '@tanstack/react-query'
 


const addPost = async (post) => {
  const res = await apiRequest.post("/pins", post);
  return res.data;
};

const CreatePage = () => {

  const { currentUser } = useAuthStore()
  const navigate = useNavigate()
  const formRef=useRef()

  const{textOptions,canvasOptions}=useEditorStore()

  const [file, setFile] = useState(null)
  const [previewImg,setPreviewImg]=useState({
    url:'',
    width:0,
    height:0,

  })

  const [isEditing,setIsEditing]=useState(false)

  useEffect(() => {

    if (!currentUser) {
      navigate('/auth')
    }
  }, [navigate, currentUser])

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      const img = new Image();
      img.src = objectUrl; 
      img.onload = () => {
        setPreviewImg({
          url: objectUrl,
          width: img.width,
          height: img.height,
        });
      };
    }
  }, [file]);
  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: (data) => {
      resetStore();
      navigate(`/pin/${data._id}`);
    },
  });

  const handleSubmit= async()=>{
    if(isEditing){
      setIsEditing(false)
    } else{
      const formData=new FormData(formRef.current)
      formData.append('media',file)
      formData.append('textOptions', JSON.stringify(textOptions))
      formData.append('canvasOptions',  JSON.stringify(canvasOptions))
  
      
      mutation.mutate(formData);

    }

    
  }

  return (
    <div className='createPage'>
      <div className='createTop'>
        <h1> {isEditing? "design your pin":  ' Create Pin'}</h1>
        <button onClick={handleSubmit}>{isEditing?'Done':'Publish'}</button>
      </div>
     {isEditing? <Editor previewImg={previewImg}/>:(
      <div className='createBottom'>
        {previewImg.url? (<div className='preview'>
          <img src={previewImg.url} alt=''/>
         <div className='editIcon' onClick={()=>setIsEditing(true)}>
         <IKImage path='/general/edit.svg'/>
         </div>

        </div>) : (<> <label htmlFor='file' className='upload'>
          <div className='uploadTitle'>
            <IKImage path='/general/upload.svg' alt='alt' />
            <span>Choose a file</span>
          </div>
          <div className='uploadInfo'>
            we recommend using high quality .jpg files less than 200 mb
          </div>
        </label>
          <input type='file' id='file' hidden  onChange={e=>setFile(e.target.files[0])}/>

        </>)}



        <form className='createForm' ref={formRef}>
          <div className='createFormItem'>
            <label htmlFor='title'>Title</label>
            <input type='text' placeholder='add a text' name='title' id='title' />
          </div>

          <div className='createFormItem'>
            <label htmlFor='description'>description</label>
            <textarea rows={6} type='text' placeholder='add a detailed description' name='description' id='description' />
          </div>


          <div className='createFormItem'>
            <label htmlFor='link'>Link</label>
            <input type='text' placeholder='add a link' name='link' id='link' />
          </div>



          <div className='createFormItem'>
            <label htmlFor='board'>Board</label>
            <select name='board' id='board'>
              <option value=''>Choose a option</option>
              <option value="1">Board1</option>
              <option value="2">Board2</option>
              <option value="3">Board3</option>
            </select>
          </div>

          <div className='createFormItem'>
            <label htmlFor='tags'>tagged topics</label>
            <input type='text' placeholder=' add tags' name='tags' id='tags' />

            <small>Don&apos;t worry, people won&apos;t see your tags</small>

          </div>



        </form>
      </div>
      )}
    </div>
  )
}

export default CreatePage