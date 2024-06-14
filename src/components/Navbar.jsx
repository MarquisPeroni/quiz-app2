import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../redux/actions';
import axios from 'axios';

const NavbarComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  console.log('User in Navbar:', user); // Log per verificare lo stato dell'utente

  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      dispatch({ type: LOGOUT });
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">Quiz App</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        {user && <Nav.Link as={Link} to="/quiz">Quiz</Nav.Link>}
      </Nav>
      <Nav>
        {!user ? (
          <>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
          </>
        ) : (
          <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
