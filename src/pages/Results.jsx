import React, { useEffect, useState } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const Results = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get('/api/results')
      .then(response => {
        setResults(response.data);
      })
      .catch(error => {
        console.error('Error fetching results:', error);
      });
  }, []);

  return (
    <Container className="mt-5">
      <h2>All Quiz Results</h2>
      <ListGroup>
        {results.map(result => (
          <ListGroup.Item key={result.id}>
            <strong>User:</strong> {result.user.name} - <strong>Quiz:</strong> {result.quiz.title} - <strong>Score:</strong> {result.score}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Results;
