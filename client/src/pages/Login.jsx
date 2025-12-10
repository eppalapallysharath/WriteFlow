import React, { useState, useContext } from 'react'
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button"
import axios from 'axios';
import { toast } from 'react-toastify';
import { authContext } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../constants/constants';

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const {setAuth} = useContext(authContext)
  const navigate = useNavigate()
  const login = async() =>{
    try {
      setLoading(true)
        const res = await axios.post(baseurl +"/api/auth/login", {email:email,password:password})
        console.log(res)
        if(res.status === 200){
          toast.success(res.data.message)
          setAuth({isLogin:true, user:res.data.user, token:res.data.token})
          setLoading(false)
          navigate("/")
        }
    } catch (error) {
      if(error.status === 400){
        toast.error(error.response.data.error)
      }else{
        toast.error(error.message)
      }
      setLoading(false)
      console.log(error)
    }
  } 
  return (
     <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="enter email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="enter password"  onChange={(e)=>setPassword(e.target.value)} value={password} />
      </Form.Group>
      <Form.Group>
      <Button variant='dark' size='sm' className='mx-5' onClick={login} disabled={loading}>Login</Button>
      </Form.Group>
    </Form>
  )
}
