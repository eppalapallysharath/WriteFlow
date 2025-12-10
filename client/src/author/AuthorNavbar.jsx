import { useContext } from "react"
import Button from "react-bootstrap/esm/Button"
import { Outlet, useNavigate } from "react-router-dom"
import { authContext } from "../context/auth"

export const AuthorNavbar = () => {
  const {setAuth} = useContext(authContext)
  const navigate = useNavigate()
  const logout = () =>{
      setAuth({isLogin:false, user:{}, token:null})
      navigate("/")
  }
  return (<>
  <div>AuthorNavbar</div>
  <Button onClick={logout}>Logout</Button>
  <Outlet/>
  </>
  )
}
