import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import NavbarComponent from './components/Navbar';
import QuizList from './pages/QuizList';
import Quiz from './pages/Quiz';
import axios from 'axios';
import PrivateRoute from './components/PrivateRoute';

function App() {
  axios.defaults.withCredentials = true;
    axios.defaults.withXSRFToken = true;
  return (
    <Router>
      <div>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quizzes" element={<PrivateRoute element={QuizList} />} />
          <Route path="/quiz/:id" element={<PrivateRoute element={Quiz} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
