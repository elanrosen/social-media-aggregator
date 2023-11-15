import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainFeed from './pages/MainFeed';
import Login from './pages/Login';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainFeed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
        {/* // Add other routes here */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
