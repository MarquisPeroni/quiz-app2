import React, { useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT, LOGIN } from '../redux/actions';
import axios from 'axios';
import '../css/Navbar.css'; 

const NavbarComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  console.log('Navbar user state:', user);

  // Check for stored user in localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch({ type: LOGIN, payload: JSON.parse(storedUser) });
    }
  }, [dispatch]);

  // Handle user logout
  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      dispatch({ type: LOGOUT });
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <Navbar className="custom-navbar" variant="dark">
      <Navbar.Brand as={Link} to="/">Homepage</Navbar.Brand>
      <Nav className="mr-auto">
        {user && (
          <>
            <Nav.Link as={Link} to="/quizzes">Quizzes</Nav.Link>
            <Nav.Link as={Link} to="/results">Results</Nav.Link>
          </>
        )}
      </Nav>
      <Nav>
        {!user ? (
          <>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
          </>
        ) : (
          <NavDropdown title={user.name} id="user-dropdown">
            <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
