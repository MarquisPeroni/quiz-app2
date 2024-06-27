import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { LOGIN } from '../redux/actions';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Register.css'; 
import registerImage from '../assets/loginbit.jpg'; 

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateInputValue = (ev) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [ev.target.name]: ev.target.value,
    }));
  };

  const submitRegister = async (ev) => {
    ev.preventDefault();
    setError('');

    try {
      await axios.get('/sanctum/csrf-cookie');
      const response = await axios.post('/register', formData);
      const user = response.data.user;

      if (user) {
        dispatch({ type: LOGIN, payload: user });
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
      } else {
        setError('Registration failed: no user data received');
      }
    } catch (error) {
      setError('Registration failed');
      console.error('Error response:', error.response);
    }
  };

  return (
    <div className="register-container">
      <img src={registerImage} className="register-background" alt="Register" />
      <div className="register-form-container">
        <h2 className="mb-4 text-light">Register</h2>
        <Form onSubmit={submitRegister}>
          <Form.Group className="mb-4" controlId="formName">
            <Form.Label className="text-fluo-green">Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={updateInputValue}
              className="fluo-input"
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formEmail">
            <Form.Label className="text-fluo-pink">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={updateInputValue}
              className="fluo-input"
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formPassword">
            <Form.Label className="text-fluo-blue">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={updateInputValue}
              className="fluo-input"
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formConfirmPassword">
            <Form.Label className="text-fluo-green">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={updateInputValue}
              className="fluo-input"
            />
          </Form.Group>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Button variant="primary" type="submit" className="fluo-button mb-2">
            Register
          </Button>
          <Button variant="secondary" as={Link} to="/login" className="fluo-button-alt-green">
            or login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
