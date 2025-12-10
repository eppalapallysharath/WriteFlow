import { useContext } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { authContext } from "../context/auth"
import Button from "react-bootstrap/esm/Button"

export const AdminNavbar = () => {
    const {setAuth} = useContext(authContext)
  const navigate = useNavigate()
  const logout = () =>{
      setAuth({isLogin:false, user:{}, token:null})
      navigate("/")
  }
  return (<>
  <div>AdminNavbar</div>
    <Button onClick={logout}>Logout</Button>
    <Outlet/>
  </>
  )
}
