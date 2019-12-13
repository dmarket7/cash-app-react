import React from 'react';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import Routes from './Components/Routes'
import Nav from './Components/Nav'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
