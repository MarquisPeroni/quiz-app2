import React, { useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN } from '../redux/actions';

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch({ type: LOGIN, payload: JSON.parse(storedUser) });
    }
  }, [dispatch]);

  return (
    <Container className="mt-5">
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Welcome to the Quiz App</h1>
          <p className="fs-4">
            This is a simple quiz application. Please login or register to start playing.
          </p>
          {!user ? (
            <>
              <Button variant="primary" as={Link} to="/login" className="me-2">
                Login
              </Button>
              <Button variant="secondary" as={Link} to="/register">
                Register
              </Button>
            </>
          ) : (
            <p className="fs-4">You are logged in as {user.name}.</p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Home;
