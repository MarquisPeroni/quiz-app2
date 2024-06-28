import React, { useEffect, useState } from 'react';
import { Container, Button, Form, ProgressBar } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavbarComponent from '../components/Navbar';
import Footer from '../components/Footer';
import backgroundImage from '../assets/irithilbit.png';
import '../css/Quiz.css';

const Quiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [timer, setTimer] = useState(30); // 30 seconds Timer

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

  // Fetch quiz data on component mount
  useEffect(() => {
    axios.get(`/api/quizzes/${id}`)
      .then(response => {
        console.log('Quiz data:', response.data);  // log 
        if (Array.isArray(response.data.questions)) {
          const questionsWithShuffledAnswers = response.data.questions.map(question => {
            return {
              ...question,
              answers: shuffleArray([...question.answers])  // Shuffle Questions
            };
          });
          const randomQuestions = getRandomQuestions(questionsWithShuffledAnswers);
          setQuestions(randomQuestions);  // Shuffle Answers
        } else {
          console.error('Questions is not an array:', response.data.questions);
        }
        setQuiz(response.data);
      })
      .catch(error => {
        console.error('Error fetching quiz data:', error);
      });
  }, [id]);

    // Timer logic
  // useEffect(() => {
  //   if (timer === 0) {
  //     handleNextQuestion();
  //   }
  //   const interval = setInterval(() => {
  //     setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [timer]); 
  // DA LASCIARE QUA

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
      <div className="quiz-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <NavbarComponent />
        <Container className="quiz-container text-center p-5 mb-4 rounded-3">
          <h2 className="text-yellow bordered-text mb-4">Thank you for completing the quiz!</h2>
          <h3 className="text-yellow bordered-text">Your score is: {score}</h3>
        </Container>
        <Footer quote="Let this journey be the mark of your courage, just as mine was." />
      </div>
    );
  }

  if (!quiz || !Array.isArray(questions) || questions.length === 0) {
    return (
      <div className="quiz-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <NavbarComponent />
        <Container className="quiz-container text-center p-5 mb-4 rounded-3">
          <h2 className="text-yellow bordered-text">Loading quiz...</h2>
        </Container>
        <Footer quote="Let this journey be the mark of your courage, just as mine was." />
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <NavbarComponent />
      <Container className="quiz-container text-center p-5 mb-4 rounded-3">
        <h2 className="text-yellow bordered-text mb-4">{quiz.title.replace(' Quiz', '')}</h2>
        <Form onSubmit={handleNextQuestion}>
          {currentQuestion && (
            <div key={currentQuestion.id} className="mb-4">
              <h4 className="text-yellow bordered-text mb-3">{currentQuestion.question_text}</h4>
              {currentQuestion.answers.map(answer => (
                <Form.Check
                  key={answer.id}
                  type="radio"
                  label={answer.answer_text}
                  name={`question-${currentQuestion.id}`}
                  value={answer.id}
                  onChange={handleChange}
                  className="text-yellow"
                />
              ))}
              <ProgressBar now={(timer / 30) * 100} label={`${timer}s`} className="mt-3" />
            </div>
          )}
          <Button variant="primary" type="submit" className="mt-3">
            {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
          </Button>
        </Form>
      </Container>
      <Footer quote="Let this journey be the mark of your courage, just as mine was." />
    </div>
  );
};

export default Quiz;
