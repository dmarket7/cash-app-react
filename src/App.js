import React, { useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import Routes from './Components/Routes'
import Nav from './Components/Nav'
import AuthContext from './Components/AuthContext';
import UserContext from './Components/UserContext';

function App() {
  const loggedIn = useState(false);
  const username = useState("");

  return (
    <AuthContext.Provider value={loggedIn}>
      <UserContext.Provider value={username}>
        <BrowserRouter>
          <div className="App">
            <Nav />
            <Routes />
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
