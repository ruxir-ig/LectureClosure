import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import QuizCreate from './pages/QuizCreate';
import Quiz from './pages/Quiz';
import Leaderboard from './pages/Leaderboard';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<QuizCreate />} />
            <Route path="/quiz/:id" element={<Quiz />} />
            <Route path="/leaderboard/:id" element={<Leaderboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
