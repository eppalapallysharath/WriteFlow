import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { baseurl } from '../constants/constants'
import { toast } from 'react-toastify'

export const PendingBlog = () => {
    const {id }= useParams()
    const data = useLocation()
    const navigate = useNavigate()
    const {token} =JSON.parse(localStorage.getItem("auth"))
    const updatedBlogStatus = (blogId, status) =>{
        axios.put(`${baseurl}/api/admin/posts/${blogId}/status`, {status:status}, {headers:{Authorization: "Bearer " + token}})
        .then(res => {console.log(res.data); toast.success(`${res.data.message} ${res.data.status}` );  navigate("/admin/pendingBlogs")})
        .catch(err=> {console.log(err); toast.error(err.message)})
    }

  return (
    <Card className='m-3'>
        <Card.Header>
            <Card.Title ><span>{data?.state?.title.toUpperCase()}</span> <span><Button variant='dark' size='sm' onClick={()=>updatedBlogStatus(id, "APPROVED")}>APPROVE</Button><Button variant='danger'size='sm' onClick={()=>updatedBlogStatus(id, "REJECTED")}>Reject</Button></span></Card.Title>
        </Card.Header>
        <Card.Body>
            <Card.Text>{data?.state?.content}</Card.Text>
        </Card.Body>
        <Card.Footer>
            <Card.Text>Created by {data?.state?.author?.name.toUpperCase()}</Card.Text>
        </Card.Footer>
    </Card>
  )
}
