import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarComponent = () => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand as={Link} to="/">Quiz App</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link as={Link} to="/">Home</Nav.Link>
      <Nav.Link as={Link} to="/quiz">Quiz</Nav.Link>
      <Nav.Link as={Link} to="/register">Register</Nav.Link>
    </Nav>
  </Navbar>
);

export default NavbarComponent;
