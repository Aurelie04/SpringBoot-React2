import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Login from './components/Login';
import UserManagement from './components/UserManagement';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleRegistrationSuccess = () => {
    setLoggedIn(true);
    setUserName(userName);
  };

  const handleLoginSuccess = (username) => {
    setLoggedIn(true);
    setUserName(username);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserName('');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login onLoginSuccess={handleLoginSuccess} />} />
          <Route
            exact
            path="/"
            element={
              loggedIn ? (
                <div>
                  <h1>Welcome, {userName}! Login Successful</h1>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              ) : (
                <UserManagement onRegistrationSuccess={handleRegistrationSuccess} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
