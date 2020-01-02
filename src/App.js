import React, { useState } from 'react';
import './App.css';
import Routes from './Components/Routes'
import Nav from './Components/Nav'
import AuthContext from './Components/AuthContext';

function App() {
  const loggedIn = useState(false);

  return (
    <AuthContext.Provider value={loggedIn}>
      <div className="App">
        <Nav />
        <Routes />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
