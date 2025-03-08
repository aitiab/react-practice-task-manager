import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './LoginPage'
import './App.css'


const Dash = () => <h1>Welcome to dashboard</h1>;

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/dashboard' element={<Dash />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App
