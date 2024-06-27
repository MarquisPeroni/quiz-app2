import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import QuizList from './pages/QuizList';
import Quiz from './pages/Quiz';
import axios from 'axios';
import PrivateRoute from './components/PrivateRoute';
import { useDispatch } from 'react-redux';
import { LOGIN } from './redux/actions';
import Results from './pages/Results';
import Profile from './pages/Profile';
import './App.css';

function App() {
  const dispatch = useDispatch();

  // Check for stored user in localStorage on app mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch({ type: LOGIN, payload: JSON.parse(storedUser) });
    }
  }, [dispatch]);
    axios.defaults.withCredentials = true;
    axios.defaults.withXSRFToken = true;
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quizzes" element={<PrivateRoute element={QuizList} />} />
          <Route path="/quiz/:id" element={<PrivateRoute element={Quiz} />} />
          <Route path="/results" element={<PrivateRoute element={Results} />} />
          <Route path="/profile" element={<PrivateRoute element={Profile} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;