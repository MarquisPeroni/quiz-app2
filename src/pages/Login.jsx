import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LOGIN } from '../redux/actions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle user login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axios.get('/sanctum/csrf-cookie');
      const response = await axios.post('/login', { email, password });
      const user = response.data.user;

      if (user) {
        dispatch({ type: LOGIN, payload: user });
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
      } else {
        setError('Login failed: no user data received');
      }
    } catch (error) {
      setError('Login failed');
      console.error('Error response:', error.response);
    }
  };

  return (
    <Container>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
