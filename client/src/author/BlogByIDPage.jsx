import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseurl } from '../constants/constants';
import Card from "react-bootstrap/Card"

export const BlogByIDPage = () => {
  const {id} = useParams()
  const [data, setData] = useState({});

  const fetchBlog = () =>{
    axios.get(`${baseurl}/api/public/posts/${id}`)
    .then(res=>{console.log(res.data), setData(res.data)})
    .catch(err => console.log(err))
  }

  useEffect(()=>{
    fetchBlog()
  },[])

  console.log(id)
  return (
    <div>
      {Object.keys(data).length> 0 ? <Card>
        <Card.Header>
          <Card.Title><span>{data.title.toUpperCase()} </span> <span className='ms-5'>By {data.author.name}</span></Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>{data.content}</Card.Text>
        </Card.Body>
      </Card>:<h2>loading...</h2>}
    </div>
  )
}
