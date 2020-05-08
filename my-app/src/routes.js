import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminPanel from "./AdminPanel";
import Home from "./Home";
import AppBarHeader from "./components/AppBar";

export default function Routes({
  userLoading,
  firebase,
  userData,
  setUserData,
  selectedSet,
  setSelectedSet,
  getSetRequest
}) {
  return (
    <Router>
      <AppBarHeader
        getSetRequest={getSetRequest}
        selectedSet={selectedSet}
        setUserData={setUserData}
        userData={userData}
      />
      <Switch>
        <Route path="/admin-x">
          <AdminPanel
            userLoading={userLoading}
            selectedSet={selectedSet}
            setSelectedSet={setSelectedSet}
            setUserData={setUserData}
            userData={userData}
            firebase={firebase}
          />
        </Route>
        <Route exact path="/">
          <Home selectedSet={selectedSet} />
        </Route>
      </Switch>
    </Router>
  );
}
