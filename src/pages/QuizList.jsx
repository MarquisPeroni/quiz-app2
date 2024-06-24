import React, { useEffect, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  // Fetch quiz list on component mount
  useEffect(() => {
    axios.get('/api/quizzes').then(response => {
      setQuizzes(response.data);
    });
  }, []);

  return (
    <Container className="mt-5">
      <h2>Available Quizzes</h2>
      {quizzes.map(quiz => (
        <Card key={quiz.id} className="mb-3">
          <Card.Body>
            <Card.Title>{quiz.title}</Card.Title>
            <Card.Text>{quiz.description}</Card.Text>
            <Button variant="primary" as={Link} to={`/quiz/${quiz.id}`}>
              Start Quiz
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default QuizList;
