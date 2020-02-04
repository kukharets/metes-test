import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import SignInScreen from "./Admin";
import Home from "./Home";


export default function Routes({firebase}) {
    console.error("routes", firebase);
    return (
        <Router>
                <Switch>
                    <Route path="/admin-x">
                        <SignInScreen firebase={firebase}/>
                    </Route>

                    <Route exact path="/">
                        <Home />
                    </Route>
                </Switch>
        </Router>
    );
}