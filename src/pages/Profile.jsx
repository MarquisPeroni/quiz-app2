import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Card, Col } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import NavbarComponent from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/Profile.css';
import backgroundImage from '../assets/celebibit.jpg';

const Profile = () => {
  const [results, setResults] = useState([]);
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (user) {
      axios.get(`/api/users/${user.id}/results`)
        .then(response => {
          setResults(response.data);
        })
        .catch(error => {
          console.error('Error fetching user results:', error);
        });
    }
  }, [user]);

  const formatScore = (score) => {
    const scoreParts = score.split('/');
    return (
      <span className="formatted-score">
        <span className="text-forest-green">{scoreParts[0]}</span>/<span className="text-light">{scoreParts[1]}</span>
      </span>
    );
  };

  return (
    <div className="profile-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <NavbarComponent />
      <div className="profile-content-container mx-4">
        <Container className="profile-scrollable text-left p-5 mb-4 mx-4 rounded-3">
          <h2 className="text-light bordered-text mb-4">Profile</h2>
          <h3 className="text-forest-green bordered-text mb-4">Your Results</h3>
          <ListGroup className="w-100">
            {results.map(result => (
              <Card key={result.id} className="mb-3 quiz-card w-100">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <Col className="text-light"><strong>{result.quiz.title.replace(' Quiz', '')}</strong></Col>
                  <Col className="text-end"><strong>{formatScore(result.score.toString() + '/10')}</strong></Col>
                </Card.Body>
              </Card>
            ))}
          </ListGroup>
        </Container>
      </div>
      <Footer variant="dark" quote="I'm gonna be the very best." />
    </div>
  );
};

export default Profile;
