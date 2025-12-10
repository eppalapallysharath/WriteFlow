import React, { useContext, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button"
import axios from "axios"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../context/auth';
import { baseurl } from '../constants/constants';

export const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { setAuth} =  useContext(authContext)
  
  const signup = async() =>{
    try {
      setLoading(true)
      const res = await axios.post(baseurl+"/api/auth/register",{name:name, email:email, password:password})
      if(res.status===200){
        toast.success(res.data.message)
        setAuth({isLogin: true, user:res.data.user, token:res.data.token})
        setLoading(false)
        navigate("/")
      }
      console.log(res.data)
    } catch (error) {
      if(error.status ===400){
        toast.error(error.response.data.error)
      }else{
        toast.error(error.message)
      }
      setLoading(false)
      
    }

  }
  return (
    <Form>
       <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="enter name" onChange={(e)=>setName(e.target.value)} value={name} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="enter email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="enter password"  onChange={(e)=>setPassword(e.target.value)} value={password} />
      </Form.Group>
      <Form.Group>
      <Button variant='dark' size='sm' className='mx-5' onClick={signup} disabled={loading}>Signup</Button>
      </Form.Group>
    </Form>
  )
}
