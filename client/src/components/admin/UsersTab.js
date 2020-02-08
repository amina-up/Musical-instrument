import React, { Component } from "react";
import { Table } from "reactstrap";
import UsersNav from "./UsersNav";
import { connect } from "react-redux";
import { deleteUser } from "../../actions/user";
import "./style.css";

export class UsersTab extends Component {
  state = {
    Name: "",
    Role: ""
  };
  searchByName = name => {
    this.setState({ Name: name, Role: "" });
  };
  searchByRole = role => {
    this.setState({ Role: role, Name: "" });
  };

  render() {
    return (
      <>
        <UsersNav
          searchByName={this.searchByName}
          searchByRole={this.searchByRole}
        />
        <Table hover className="table-hover ">
          <thead>
            <tr>
              <th></th>
              <th scope="col">Nom</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Numéro de téléphone</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.props.users
              .filter(user => user.role !== "Admin")
              .filter(user => {
                return this.state.Name
                  ? user.name.toLowerCase() === this.state.Name.toLowerCase()
                  : this.state.Role
                  ? user.role === this.state.Role
                  : user;
              })
              .map(user => (
                <tr key={user._id} className="droprole">
                  <td>
                    <i class="fa fa-user" aria-hidden="true"></i>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={() => this.props.deleteUser(user._id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </>
    );
  }
}

export default connect(
  null,
  { deleteUser }
)(UsersTab);
