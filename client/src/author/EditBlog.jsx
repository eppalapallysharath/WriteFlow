import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { baseurl } from "../constants/constants";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

export const EditBlog = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [title, setTitle] = useState(state?.title);
  const [content, setContent] = useState(state?.content);
  const {token} = JSON.parse(localStorage.getItem("auth"))
  const navigate = useNavigate()
  function fetchMyblog() {
    axios
      .get(baseurl + "/api/posts/" + id, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (state === null) {
      fetchMyblog();
    }
  }, []);

  function save (){
    axios.put(`${baseurl}/api/posts/${id}`, {title:title, content:content}, {headers:{Authorization:`Bearer ${token}`}})
    .then(res=> {toast.success("Updated successfully"); navigate("/myblogs")})
    .catch(err =>{console.log(err); toast.error(err.message)})
  }

  return (
    <form>
      <h3>Edit blog</h3>
      <div>
        <p>Blog Title</p>
        <textarea
          rows={2}
          cols={60}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        ></textarea>
      </div>

      <div>
        <p>write blog content here</p>
        <textarea
          rows={10}
          cols={80}
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
      </div>

      <Button variant="dark" onClick={save}>Save blog </Button>
    </form>
  );
};
