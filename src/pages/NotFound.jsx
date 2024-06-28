import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/NotFound.css'; 
import murlocbit from '../assets/murlocbit.jpg'; 

const NotFound = () => {
  return (
    <div className="notfound-page">
      <Container className="text-center notfound-container">
        <img src={murlocbit} alt="Murloc" className="murloc-image" />
        <h1 className="text-light">404</h1>
        <p className="text-light">Oops! The page you are looking for does not exist.</p>
        <Button variant="primary" as={Link} to="/">Go to Home</Button>
      </Container>
    </div>
  );
};

export default NotFound;
