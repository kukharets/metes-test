import React, { useEffect, useState } from "react";
import "./App.css";
import firebase from "firebase";
import Router from "./routes";
import "./firebase";
import AppBarHeader from "./components/AppBar";

function App() {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.error("!!!");
        setUserData({ isAdmin: true });
      }
    });
  }, []);

  return (
    <div className="App">
      <Router
        setUserData={setUserData}
        userData={userData}
        firebase={firebase}
      />
    </div>
  );
}

export default App;
