import React, { useEffect, useState } from "react";
import "./App.css";
import firebase from "firebase";
import Router from "./routes";
import "./firebase";
import AppBarHeader from "./components/AppBar";

function App() {
  const [userData, setUserData] = useState({});
  const [selectedSet, setSelectedSet] = React.useState({});
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.error("!!!");
        setUserData({ isAdmin: true });
      }
    });
  }, []);

  const getSetRequest = async (uuid) => {
    await firebase
      .firestore()
      .collection("sets")
      .doc(uuid)
      .get()
      .then(res => {
        setSelectedSet(res.data());
      });
  };

  return (
    <div className="App">
      <Router
        getSetRequest={getSetRequest}
        selectedSet={selectedSet}
        setSelectedSet={setSelectedSet}
        setUserData={setUserData}
        userData={userData}
        firebase={firebase}
      />
    </div>
  );
}

export default App;
