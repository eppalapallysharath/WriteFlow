import { Outlet, NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../assets/images/default.png"

export const NavBar = () => {
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
            <NavLink to="/login" >Login</NavLink>
            <NavLink to="/signup" >Signup</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet/>
    </>
  )
}
