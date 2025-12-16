import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseurl } from '../constants/constants'
import Card from "react-bootstrap/Card"
import { useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
export const MyBlogs = () => {
  const [data, setData] = useState([])
  const {token} = JSON.parse(localStorage.getItem("auth"))
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate() 
  const fetchMyPosts = async() => {
    try {
      setLoading(true)
      const res = await axios.get(`${baseurl}/api/posts/my-posts`, {headers:{Authorization:`Bearer ${token}`}})
      setData(res.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchMyPosts()
  }, [])
  return (
    <div>
      <h3>My Blogs</h3>
      {loading ? <h4>loading....</h4>: data.map(blog => <Card key={blog.id} className='my-3 mx-2' onClick={()=>navigate("/myblog/"+blog.id)}>  
        <Card.Header>
          <Card.Text>{blog.title} <sup> <Badge>{blog.status}</Badge></sup></Card.Text> 
        </Card.Header>
        <Card.Body>
          <Card.Text style={{ width:"10rem" , whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{blog.content}</Card.Text>
        </Card.Body>
      </Card>) }
    </div>
  )
}
