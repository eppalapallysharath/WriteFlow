import React, { useEffect, useState } from "react";
import { baseurl } from "../../constants/constants";
import axios from "axios";
import Card from "react-bootstrap/Card"
import { useNavigate } from "react-router-dom";
export const PublicBlogs = () => {
  const [data, setData] = useState([])
  const navigate =  useNavigate()
  const fetchAllBlogs = () => {
    axios
      .get(`${baseurl}/api/public/posts`)
      .then((res) => {setData(res.data); console.log(res.data)})
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAllBlogs()
  }, []);
  return <div>
    <h4>BLOGS</h4>
    {data.length > 0 ? data.map(blog=> <Card key={blog.id} className="my-2" onClick={()=>{navigate("/blog/"+blog.id)}}>
      <Card.Title>{blog.title}</Card.Title>
      <Card.Text>By {blog.author.name}</Card.Text>
    </Card>) :<h5>Loading....</h5>}
  </div>;
};
