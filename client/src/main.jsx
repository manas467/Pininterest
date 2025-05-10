import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from './routes/homepage/Homepage.jsx';
import CreatePage from './routes/createpage/CreatePage.jsx';
import PostPage from './routes/postPage/PostPage.jsx';
import AuthPage from './routes/authPage/AuthPage.jsx';
import ProfilePage from './routes/profilePage/ProfilePage.jsx';
import SearchPage from './routes/searchpage/searchPage.jsx';
import MainLayout from './routes/layouts/MainLayout.jsx';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}> 
  <StrictMode>
  <BrowserRouter>
    <Routes>
    <Route element={<MainLayout/>}>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/create' element={<CreatePage/>}/>
      <Route path='/pin/:id' element={<PostPage/>}/>
      <Route path='/search' element={<SearchPage/>}/>
      <Route path='/:username' element={<ProfilePage/>}/>
      </Route>
      <Route path='/auth' element={<AuthPage/>}/>
      
    </Routes>
    </BrowserRouter>,
  </StrictMode>
  </QueryClientProvider>
)
