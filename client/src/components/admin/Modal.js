import React, { Component } from "react";
import { Table } from "reactstrap";
import NavPublication from "./NavPublication";
import { connect } from "react-redux";
import { deletePub } from "../../actions/publication";

export class Modal extends Component {
  state = {
    tittle: "",
    mark: ""
  };
  searchByName = name => {
    this.setState({ tittle: name, mark: "" });
  };
  searchByInstrument = marque => {
    console.log(marque);
    return marque
      ? marque
        ? this.setState({
            mark: marque,
            tittle: ""
          })
        : this.setState({ mark: marque, tittle: "" })
      : null;
  };
  render() {
    return (
      <>
        <NavPublication
          searchByInstrument={this.searchByInstrument}
          searchByName={this.searchByName}
        />
        <Table hover className="table-hover">
          <thead>
            <tr>
              <th>Image</th>
              <th>Nom d'instrument</th>
              <th>Publié par</th>
              <th>Marque d'instrument</th>
              <th>prix</th>
            </tr>
          </thead>
          <tbody>
            {this.props.pubs
              .filter(pub =>
                this.state.tittle
                  ? pub.title.toLowerCase() === this.state.tittle.toLowerCase()
                  : this.state.mark
                  ? pub.marque === this.state.mark
                  : this.state.mark
                  ? pub.marque === this.state.mark
                  : pub
              )
              .map(pub => (
                <tr key={pub._id}>
                  <td>
                    <img width="100px" src={pub.image} alt=".." />
                  </td>
                  <td>{pub.title}</td>
                  <td>{pub.user.name}</td>
                  <td>{pub.marque}</td>
                  <td>{pub.price}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={() => this.props.deletePub(pub._id)}
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
  { deletePub }
)(Modal);
