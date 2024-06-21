import React, { useEffect, useState } from 'react';
import { Container, Button, Form, ProgressBar } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Quiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);  // Inizializza come array vuoto
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [timer, setTimer] = useState(30); // Timer di 30 secondi

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const getRandomQuestions = (questions) => {
    const multipleChoiceQuestions = questions.filter(q => q.answers.length > 2);
    const trueFalseQuestions = questions.filter(q => q.answers.length === 2);

    const shuffledMultipleChoice = shuffleArray(multipleChoiceQuestions).slice(0, 8);
    const shuffledTrueFalse = shuffleArray(trueFalseQuestions).slice(0, 2);

    return shuffleArray([...shuffledMultipleChoice, ...shuffledTrueFalse]);
  };

  useEffect(() => {
    axios.get(`/api/quizzes/${id}`)
      .then(response => {
        console.log('Quiz data:', response.data);  // Aggiungi questo console.log per verificare i dati ricevuti
        if (Array.isArray(response.data.questions)) {
          const questionsWithShuffledAnswers = response.data.questions.map(question => {
            return {
              ...question,
              answers: shuffleArray([...question.answers])  // Mescola le risposte
            };
          });
          const randomQuestions = getRandomQuestions(questionsWithShuffledAnswers);
          setQuestions(randomQuestions);  // Mescola le domande
        } else {
          console.error('Questions is not an array:', response.data.questions);
        }
        setQuiz(response.data);
      })
      .catch(error => {
        console.error('Error fetching quiz data:', error);
      });
  }, [id]);

  useEffect(() => {
    if (timer === 0) {
      handleNextQuestion();
    }
    const interval = setInterval(() => {
      setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e) => {
    setAnswers({
      ...answers,
      [questions[currentQuestionIndex].id]: e.target.value
    });
  };

  const handleNextQuestion = (e) => {
    e && e.preventDefault();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(30); // Reset timer
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const formattedAnswers = Object.entries(answers).map(([question_id, answer_id]) => ({
      question_id: parseInt(question_id, 10),
      answer_id: parseInt(answer_id, 10),
    }));

    axios.post('/api/results', {
      quiz_id: id,
      answers: formattedAnswers,
    })
      .then(response => {
        setSubmitted(true);
        setScore(response.data.score);  // Assume the server returns the score
      })
      .catch(error => {
        console.error('Error submitting quiz:', error);
      });
  };

  if (submitted) {
    return (
      <Container className="mt-5">
        <h2>Thank you for completing the quiz!</h2>
        <h3>Your score is: {score}</h3>
      </Container>
    );
  }

  if (!quiz || !Array.isArray(questions) || questions.length === 0) {
    return (
      <Container className="mt-5">
        <h2>Loading quiz...</h2>
      </Container>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Container className="mt-5">
      <h2>{quiz.title}</h2>
      <Form onSubmit={handleNextQuestion}>
        {currentQuestion && (
          <div key={currentQuestion.id}>
            <h4>{currentQuestion.question_text}</h4>
            {currentQuestion.answers.map(answer => (
              <Form.Check
                key={answer.id}
                type="radio"
                label={answer.answer_text}
                name={`question-${currentQuestion.id}`}
                value={answer.id}
                onChange={handleChange}
              />
            ))}
            <ProgressBar now={(timer / 30) * 100} label={`${timer}s`} className="mt-3" />
          </div>
        )}
        <Button variant="primary" type="submit">
          {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
        </Button>
      </Form>
    </Container>
  );
};

export default Quiz;
