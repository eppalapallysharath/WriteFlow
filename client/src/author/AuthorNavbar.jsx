import { useContext } from "react"
import Button from "react-bootstrap/esm/Button"
import { Outlet, useNavigate, NavLink } from "react-router-dom"
import { authContext } from "../context/auth"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../assets/images/default.png"

export const AuthorNavbar = () => {
  const {setAuth} = useContext(authContext)
  const navigate = useNavigate()
  const logout = () =>{
      setAuth({isLogin:false, user:{}, token:null})
      navigate("/")
  }
  return (<>
   <Navbar expand="lg" bg='dark' data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#" >
            <img src={logo} width="120px" height="80px" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            navbarScroll
          >
            <NavLink to="/" >Home</NavLink>
            <NavLink to="/writeblog" >Write Blogs</NavLink>
            <NavLink to="/myblogs" >My Blogs</NavLink>
          </Nav>
          <Button onClick={logout}>Logout</Button>  
        </Navbar.Collapse>
      </Container>
    </Navbar>
  <Outlet/>
  </>
  )
}
