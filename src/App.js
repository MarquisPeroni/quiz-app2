import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import QuizPage from './pages/QuizPage';
import Register from './pages/Register';
import Login from './pages/Login';
import NavbarComponent from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/quiz" element={<QuizPage />} /> */}
          <Route path="/register" element={<Register />} />
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;


