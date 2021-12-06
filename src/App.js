import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navigation from "./Navigation";
import Home from "./Home";
import Teams from "./Teams";
import Team from "./Team";
import Player from "./Player";
import VoteBracket from "./VoteBracket";
import Bracket from "./Bracket";

import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Navigation />
        <div className="container">
          <Switch>
            <Route path="/vote/:id" component={Bracket} />
            <Route path="/vote" component={VoteBracket} />
            <Route path="/teams/:id/:player" component={Player} />
            <Route path="/teams/:id" component={Team} />
            <Route path="/teams" component={Teams} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
        <ToastContainer />
      </Router>
    );
  }
}

