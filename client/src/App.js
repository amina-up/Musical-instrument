import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashbord from "./components/admin/Dashbord";
import Home from "./components/Home/Home";
import { loadUser } from "./actions/authentification";
import { connect } from "react-redux";
import { BackTop } from "antd";

export class App extends Component {
  componentDidMount() {
    this.props.loadUser();
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route path="/admin" component={Dashbord} />
          <Route path="/" component={Home} />
        </Switch>
        <BackTop />
      </Router>
    );
  }
}

export default connect(
  null,
  { loadUser }
)(App);
