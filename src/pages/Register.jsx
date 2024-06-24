import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../redux/actions/index';
import { Form, Button, Container } from 'react-bootstrap';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState('');

  const updateInputValue = (ev) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [ev.target.name]: ev.target.value,
    }));
  };

  // Handle user registration
  const submitRegister = async (ev) => {
    ev.preventDefault();
    setError(''); // Reset error state

    try {
      await axios.get('/sanctum/csrf-cookie');
      const response = await axios.post('/register', formData);
      console.log('Registration response:', response); // log
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
      console.error('Error response:', error); // log
    }
  };

  return (
    <Container>
      <h2>Register</h2>
      <Form onSubmit={submitRegister} noValidate>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            onChange={updateInputValue}
            value={formData.name}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={updateInputValue}
            value={formData.email}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={updateInputValue}
            value={formData.password}
          />
        </Form.Group>
        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="password_confirmation"
            onChange={updateInputValue}
            value={formData.password_confirmation}
          />
        </Form.Group>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
