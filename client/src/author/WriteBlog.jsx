import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import axios from "axios" 
import { baseurl } from '../constants/constants'
import { token } from '../constants/constants'
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom'
export const WriteBlog = () => {
  const [title, setTitle] = useState()
  const [content, setContent] = useState()
  const navigate = useNavigate()

  const createBlog = async() =>{
      try {
        const res = await axios.post(`${baseurl}/api/posts`, {title:title,content:content}, {headers:{Authorization:`Bearer ${token}`}})
        if(res.status ===200 ){
          toast.success(res.data.message)
          navigate("/myblogs")
        }
      } catch (error) {
        toast.error(error.message)
        console.log(error)
      }
  }
  return (
    <form>
      <p>Blog Title</p>
      <textarea rows={2} cols={60} onChange={(e)=>setTitle(e.target.value)}value={title}></textarea>
      <p>write blog content here</p>
      <textarea rows={10} cols={80} onChange={(e)=>setContent(e.target.value)}value={content}></textarea>
      <Button variant='dark' onClick={createBlog} >create blog </Button>
    </form>
  )
}
