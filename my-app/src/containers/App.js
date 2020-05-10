import React, { useEffect, useState } from "react";
import "../styles/App.css";
import firebase from "../config/firebase";
import Router from "./routes";

function App() {
  const [userData, setUserData] = useState({});
  const [selectedSet, setSelectedSet] = useState({});
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUserLoading(false);
      if (user) {
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
        userLoading={userLoading}
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
