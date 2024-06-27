import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import NavbarComponent from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/Results.css';
import backgroundImage from '../assets/templebit.jpg';

const Results = () => {
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [groupedResults, setGroupedResults] = useState({});

  useEffect(() => {
    fetchResults();
  }, [currentPage]);

  const fetchResults = () => {
    axios.get('/api/results')
      .then(response => {
        const allResults = response.data.data;
        const grouped = groupAndLimitResults(allResults);
        setResults(allResults);
        setGroupedResults(grouped);
        setTotalPages(Object.keys(grouped).length);
      })
      .catch(error => {
        console.error('Error fetching results:', error);
      });
  };

  const groupAndLimitResults = (allResults) => {
    const grouped = allResults.reduce((acc, result) => {
      const quizTitle = result.quiz.title;
      if (!acc[quizTitle]) {
        acc[quizTitle] = [];
      }
      if (acc[quizTitle].length < 20) {
        acc[quizTitle].push(result);
      }
      return acc;
    }, {});
    return grouped;
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderResultsForCurrentPage = () => {
    const quizTitles = Object.keys(groupedResults);
    if (quizTitles.length === 0) {
      return null;
    }
    const currentQuizTitle = quizTitles[currentPage - 1];
    return (
      <div key={currentQuizTitle} className="mb-4">
        <h3 className="text-light bordered-text">{currentQuizTitle}</h3>
        <ListGroup>
          {groupedResults[currentQuizTitle].map(result => (
            <Card key={result.id} className="mb-3 result-card">
              <Card.Body>
                <Row>
                  <Col><Card.Text className="text-light"><strong>User:</strong> {result.user.name}</Card.Text></Col>
                  <Col><Card.Text className="text-light"><strong>Score:</strong> {result.score}</Card.Text></Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </ListGroup>
      </div>
    );
  };

  return (
    <div className="results-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <NavbarComponent />
      <div className="results-content-container">
        <Container className="results-scrollable text-center p-5 mb-4 mx-4 rounded-3">
          <h2 className="text-light bordered-text mb-4">All Quiz Results</h2>
          {renderResultsForCurrentPage()}
          <div className="d-flex justify-content-between mt-3">
            <Button variant="dark" onClick={handlePreviousPage} disabled={currentPage === 1}>
              <span className="arrow">&larr;</span>
            </Button>
            <Button variant="dark" onClick={handleNextPage} disabled={currentPage === totalPages}>
              <span className="arrow">&rarr;</span>
            </Button>
          </div>
        </Container>
      </div>
      <Footer quote="There's only room for one Boss and one Snake." />
    </div>
  );
};

export default Results;
