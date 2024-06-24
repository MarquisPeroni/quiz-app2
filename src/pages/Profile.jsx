import React, { useEffect, useState } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Profile = () => {
  const [results, setResults] = useState([]);
  const user = useSelector(state => state.user);

  // Fetch user results on component mount
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
    <Container className="mt-5">
      <h2>Profile</h2>
      <h3>Results for {user.name}</h3>
      <ListGroup>
        {results.map(result => (
          <ListGroup.Item key={result.id}>
            <strong>Quiz:</strong> {result.quiz.title} - <strong>Score:</strong> {result.score}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Profile;
