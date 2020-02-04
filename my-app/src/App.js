import React from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import Router from "./routes";
import "./firebase";
function App() {
  return (
    <div className="App">
      <Router firebase={firebase}/>
    </div>
  );
}

export default App;
