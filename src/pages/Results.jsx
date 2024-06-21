import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';

const Results = () => {
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchResults(currentPage);
  }, [currentPage]);

  const fetchResults = (page) => {
    axios.get(`/api/results?page=${page}`)
      .then(response => {
        setResults(response.data.data);
        setCurrentPage(response.data.current_page);
        setTotalPages(response.data.last_page);
      })
      .catch(error => {
        console.error('Error fetching results:', error);
      });
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

  // Raggruppa i risultati per titolo del quiz
  const groupedResults = results.reduce((acc, result) => {
    const quizTitle = result.quiz.title;
    if (!acc[quizTitle]) {
      acc[quizTitle] = [];
    }
    acc[quizTitle].push(result);
    return acc;
  }, {});

  return (
    <Container className="mt-5">
      <h2>All Quiz Results</h2>
      {Object.keys(groupedResults).map(quizTitle => (
        <div key={quizTitle} className="mb-4">
          <h3>{quizTitle}</h3>
          <ListGroup>
            {groupedResults[quizTitle].map(result => (
              <ListGroup.Item key={result.id}>
                <strong>User:</strong> {result.user.name} - <strong>Score:</strong> {result.score}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      ))}
      <div className="d-flex justify-content-between mt-3">
        <Button variant="primary" disabled={currentPage === 1} onClick={handlePreviousPage}>
          Previous
        </Button>
        <Button variant="primary" disabled={currentPage === totalPages} onClick={handleNextPage}>
          Next
        </Button>
      </div>
    </Container>
  );
};

export default Results;
