import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Card, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import NavbarComponent from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/Results.css';
import backgroundImage from '../assets/templebit.jpg';
import { MemoryBowArrow } from '../components/MemoryBowArrow';

const Results = () => {
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchResults(currentPage);
  }, [currentPage]);

  const fetchResults = async (page) => {
    try {
      const response = await axios.get(`/api/results?page=${page}`);
      const data = response.data;
      setResults(prevResults => [...prevResults, ...data.data]);
      setTotalPages(data.last_page);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
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

  const formatScore = (score) => {
    const scoreParts = score.split('/');
    return (
      <span className="formatted-score">
        <span className="text-yellow-orange">{scoreParts[0]}</span>/<span className="text-light">{scoreParts[1]}</span>
      </span>
    );
  };

  const cleanTitle = (title) => title.replace(' Quiz', '');

  return (
    <div className="results-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <NavbarComponent />
      <div className="results-content-container">
        <Container className="results-scrollable text-center p-3 mb-4 mx-4 rounded-3">
          <h2 className="text-yellow-orange bordered-text mb-4">Results</h2>
          <ListGroup className="w-100">
            {results.map(result => (
              <Card key={result.id} className="mb-3 result-card w-100">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <Col className="text-light text-start px-2"><strong>{result.user.name}</strong></Col>
                  <Col className="text-light text-center px-2"><strong>{cleanTitle(result.quiz.title)}</strong></Col>
                  <Col className="text-yellow-orange text-end px-2"><strong>{formatScore(result.score.toString() + '/10')}</strong></Col>
                </Card.Body>
              </Card>
            ))}
          </ListGroup>
          <div className="d-flex justify-content-between mt-3">
            <Button variant="link" onClick={handlePreviousPage} disabled={currentPage === 1} className="arrow-button">
              <MemoryBowArrow className="arrow" style={{ transform: 'rotate(-90deg)' }} />
            </Button>
            <Button variant="link" onClick={handleNextPage} disabled={currentPage === totalPages} className="arrow-button">
              <MemoryBowArrow className="arrow" style={{ transform: 'rotate(90deg)' }} />
            </Button>
          </div>
        </Container>
      </div>
      <Footer quote="There's only room for one Boss and one Snake." />
    </div>
  );
};

export default Results;
