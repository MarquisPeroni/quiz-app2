import React, { useEffect, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavbarComponent from '../components/Navbar';
import '../css/QuizList.css';
import backgroundImage from '../assets/forestbit.jpg';
import Footer from '../components/Footer';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios.get('/api/quizzes').then(response => {
      setQuizzes(response.data);
    });
  }, []);

  return (
    <div className="quizlist-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <NavbarComponent />
      <div className="quizlist-content-container">
        <Container className="quizlist-scrollable text-center p-5 mb-4 mx-4 rounded-3">
          <h2 className="text-light bordered-text mb-4">Available Quizzes</h2>
          {quizzes.map(quiz => (
            <Card key={quiz.id} className="mb-3 quiz-card">
              <Card.Body>
                <Card.Title className="text-light">{quiz.title}</Card.Title>
                <Card.Text className="text-light">{quiz.description}</Card.Text>
                <Button variant="dark" as={Link} to={`/quiz/${quiz.id}`}>
                  Start!
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Container>
      </div>
      <Footer quote="There's only room for one Boss and one Snake." />
    </div>
  );
};

export default QuizList;
