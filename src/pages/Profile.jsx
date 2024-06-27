import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Card } from 'react-bootstrap';
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

  return (
    <div className="profile-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <NavbarComponent />
      <div className="profile-content-container">
        <Container className="profile-scrollable text-center p-5 mb-4 mx-4 rounded-3">
          <h2 className="text-light bordered-text mb-4">Profile</h2>
          <h3 className="text-light bordered-text mb-4">Your results</h3>
          <ListGroup>
            {results.map(result => (
              <Card key={result.id} className="mb-3 quiz-card">
                <Card.Body>
                  <Card.Title className="text-light"> {result.quiz.title}</Card.Title>
                  <Card.Text className="text-light"> {result.score}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </ListGroup>
        </Container>
      </div>
      <Footer quote="I'm gonna be the very best." />
    </div>
  );
};

export default Profile;
