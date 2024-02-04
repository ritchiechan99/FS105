import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import '../styles/Navbar.css';
import { Link } from "react-router-dom";
import fcmlogo from '../images/logo/fcmlogo.jpeg';
import { FaShoppingCart } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';


const CustomNavbar = () => {
  const [expanded, setExpanded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const checkLoggedIn = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken); // Debug: Log the decoded token
        setUsername(decodedToken.username);
      } catch (error) {
        console.error("Token decoding error:", error);
        // Handle token decoding error
      }
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <div className="text-white position-fixed w-100 mt-0 fw-semibold custom-navbar-zindex">
      <Navbar expanded={expanded} expand="lg" className="navbar navbar-text-white" variant="light">
        <Container>
          <a href="/"> <img src={fcmlogo} alt="" className="nasmer me-5 custom-navbar-icon"  /> </a>
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            onClick={() => setExpanded(expanded ? false : "expanded")}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="aboutus" className="custom-navbar-text">About Us</Nav.Link>
              <Nav.Link href="contactus" className="custom-navbar-text">Contact Us</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown" className="custom-navbar-text">
                <NavDropdown.Item className="text-dark" href="/cats">Cats</NavDropdown.Item>
                <NavDropdown.Item className="text-dark" href="/dogs">Dogs</NavDropdown.Item>
                <NavDropdown.Item className="text-dark" href="/birds">Birds</NavDropdown.Item>
                <NavDropdown.Item className="text-dark" href="/fishes">Fishes</NavDropdown.Item>
                <NavDropdown.Item className="text-dark" href="/petaccessories">Accessories</NavDropdown.Item>
                <NavDropdown.Item className="text-dark" href="/petfoods">Pet Foods</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/HomePage" className="custom-navbar-text">Home Page</Nav.Link>
            </Nav>
            <div className="d-flex align-items-center">
              {isLoggedIn ? (
                <div className="fw-bold custom-navbar-login">{username}</div>
              ) : (
                <Link to="/Login">
                  <Button className="btn btn-light fw-bold custom-navbar-login">Login</Button>
                </Link>
              )}
              <Link to="/Cart">
                <Button variant="light" className="btn btn-light fw-bold custom-navbar-login ms-4">
                  <FaShoppingCart />
                </Button>
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
