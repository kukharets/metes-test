import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AdminPanel from "./AdminPanel";
import Home from "./Home";
import AppBarHeader from "./components/AppBar";

export default function Routes({ firebase, userData,setUserData, selectedSet, setSelectedSet, getSetRequest }) {
  console.error("routes", firebase);

  return (
    <Router>
      <AppBarHeader getSetRequest={getSetRequest} selectedSet={selectedSet} setUserData={setUserData} userData={userData} />
      <Switch>
        <Route path="/admin-x">
          <AdminPanel selectedSet={selectedSet}
                      setSelectedSet={setSelectedSet} setUserData={setUserData} userData={userData} firebase={firebase} />
        </Route>

        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
