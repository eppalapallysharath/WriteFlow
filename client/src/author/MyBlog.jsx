import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseurl } from "../constants/constants";
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Badge from 'react-bootstrap/Badge';
import { toast } from "react-toastify";


export const MyBlog = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
   const {token} = JSON.parse(localStorage.getItem("auth"))
  function fetchMyblog() {
    setLoading(true)
    axios
      .get(baseurl + "/api/posts/" + id, {headers:{Authorization:"Bearer "+token}})
      .then((res) =>{setData(res.data); setLoading(false)})
      .catch((err) =>{ console.log(err); setLoading(false)});
  }

  useEffect(() => {
    fetchMyblog();
  }, []);

  function deleteMyblog(blogid){
    axios.delete(`${baseurl}/api/posts/${blogid}`, {headers:{Authorization: "Bearer "+ token}})
    .then((res)=>{toast.success(res.data.message); navigate("/myblogs")})
    .catch(err =>console.log(err))
  }

  return <div>
    <h5>My blog</h5>
    {
      loading ? <h4>Loading...</h4> : Object.keys(data).length ?    <Card>
        <Card.Header>
          <div>
          <Card.Title>{data.title} <sup> <Badge bg="secondary">{data.status}</Badge></sup> </Card.Title> 
          </div>
          <div>
                <Button variant="danger" ref={target} onClick={() => setShow(!show)}>
        Options
      </Button>
      </div>
      <Overlay target={target.current} show={show} placement="right">
        {({
          placement: _placement,
          arrowProps: _arrowProps,
          show: _show,
          popper: _popper,
          hasDoneInitialMeasure: _hasDoneInitialMeasure,
          ...props
        }) => (
          <div
            {...props}
            style={{
              position: 'absolute',
              backgroundColor: 'rgba(255, 100, 100, 0.85)',
              padding: '2px 10px',
              color: 'white',
              borderRadius: 3,
              ...props.style,
            }}
          >
            <p onClick={()=>navigate(`/editblog/${data.id}`, {state:data})}>Edit</p>
            <hr/>
            <p onClick={()=>deleteMyblog(data.id)}>Delete</p>
          </div> 
        )}
      </Overlay>

        </Card.Header>
        <Card.Body>
          <Card.Text>
            {data.content} 
          </Card.Text>
        </Card.Body> : <h4>No blog found</h4>
    </Card>: <h2>no blog found</h2> }
    
  </div>;
};
