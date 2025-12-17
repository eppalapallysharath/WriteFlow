import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseurl } from "../constants/constants";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export const PendingBlogsList = () => {
  const [data, setData] = useState([]);
  const { token } = JSON.parse(localStorage.getItem("auth"));
  const navigate = useNavigate()
  const fetchPendingBlogs = () => {
    axios
      .get(`${baseurl}/api/admin/posts/pending`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.group(res.data);
        setData(res.data);
      })
      .catch((err) => console.logI(err));
  };

  useEffect(() => {
    fetchPendingBlogs();
  }, []);
  return (
    <div>
      <h4>List of pending blogs</h4>
      <Table striped hover bordered>
        <thead>
          <th>Blog Title</th>
          <th>Author name</th>
          <th>Action</th>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((blog) => (
              <tr key={blog.id}>
                {" "}
                <td>{blog.title}</td> <td>{blog?.author?.name}</td>{" "}
                <td>
                  <Button variant="dark" onClick={()=>{navigate(`/admin/pending/blog/${blog.id}`, {state:blog} )}}>View</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>Loading...</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
