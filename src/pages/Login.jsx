import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { LOGIN } from '../redux/actions';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Login.css';
import loginImage from '../assets/loginbit.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className="login-container">
      <img src={loginImage} className="login-background" alt="Login" />
      <div className="login-form-container">
        <h2 className="mb-4 text-light">Sign In</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-4" controlId="formEmail">
            <Form.Label className="text-fluo-green">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="fluo-input"
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formPassword">
            <Form.Label className="text-fluo-pink">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="fluo-input"
            />
          </Form.Group>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Button variant="primary" type="submit" className="fluo-button mb-2">
            Sign in
          </Button>
          <Button variant="secondary" as={Link} to="/register" className="fluo-button-alt-green">
            or register
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
