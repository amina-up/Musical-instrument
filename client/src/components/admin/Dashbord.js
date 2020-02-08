import React, { Component } from "react";
import NavAdmin from "./NavAdmin";
import UsersTab from "./UsersTab";
import Modal from "./Modal";
import "./style.css";
import { Redirect, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { loadUser } from "../../actions/authentification";
import { getUsers } from "../../actions/user";
import { getPubs } from "../../actions/publication";

import Cards from "./Cards";
import "../Home/Navbar/NavMenu.css";
export class Dashbord extends Component {
  componentDidMount() {
    this.props.loadUser();
    this.props.getUsers();
    this.props.getPubs();
  }
  render() {
    if (!this.props.loading && !this.props.user) {
      return <Redirect to="/" />;
    }

    if (this.props.user) {
      if (this.props.user.role !== "Admin") return <Redirect to="/" />;
    }
    return this.props.loading ? (
      <img className="spiner" src="https://svgshare.com/i/EmH.svg" alt="" />
    ) : (
      <div>
        <NavAdmin />
        <Cards users={this.props.users} pubs={this.props.pubs} />
        <Switch>
          <Route
            exact
            path="/admin"
            render={() => <UsersTab users={this.props.users} />}
          />
          <Route
            exact
            path="/admin/pubs"
            render={() => <Modal pubs={this.props.pubs} />}
          />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.authReducer.user,
  loading:
    state.authReducer.loading ||
    state.pubReducer.loading ||
    state.userReducer.loading,

  users: state.userReducer.users,
  pubs: state.pubReducer.pubs
});

export default connect(
  mapStateToProps,
  {
    loadUser,
    getUsers,
    getPubs
  }
)(Dashbord);
