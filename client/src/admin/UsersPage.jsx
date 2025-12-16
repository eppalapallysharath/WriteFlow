import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseurl } from '../constants/constants'
import Table from "react-bootstrap/Table"
import Button from 'react-bootstrap/Button'

export const UsersPage = () => {
  const [data, setData] = useState([])
  const getToken = JSON.parse(localStorage.getItem("auth"))
  function getAllUsers (){
    axios.get(`${baseurl}/api/admin/users`, {headers:{Authorization:"Bearer " + getToken.token  }})
    .then(res=> {console.log(res.data); setData(res.data)})
    .catch(err => console.log(err))
  }

  useEffect(()=>{
    getAllUsers()
  },[])

  const updateRole = (userID,role) =>{
    axios.put(`${baseurl}/api/admin/users/${userID}/role`, {role:role}, {headers:{Authorization:"Bearer " + getToken.token }})
    .then(res=>{console.log(res.data), getAllUsers()})
    .catch(err => console.log(err) )
  }
  return (
    <div>
      <h4>Users</h4>
      <Table striped bordered hover>
        <thead>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </thead>
        <tbody>
          {data.map(user => <tr key={user.id}> 
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}
                {user.role =="AUTHOR" ?  <Button onClick={()=>updateRole( user.id, "ADMIN")}>Admin</Button>:<Button onClick={()=>updateRole(user.id,"AUTHOR")}>Author</Button>}
              </td>
             </tr>)}
        </tbody>
      </Table>
    </div>
  )
}
