import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  InputGroup,
  InputGroupAddon,
  Input,
  Button
} from "reactstrap";

export class NavPublication extends Component {
  state = {
    isOpen: false,
    title: "",
    marque: ""
  };
  removeDuplicates = (myArr, prop) => {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  };
  changeHandler = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };
  toggle = () => this.setState({ isOpen: !this.state.isOpen });
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/admin/pubs" style={{ fontWeight: "bold" }}>
            Liste des Publications
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <InputGroup className="w-25">
              <Input
                placeholder="Nom d'instrument"
                name="title"
                onChange={e => this.changeHandler(e)}
              />
              <InputGroupAddon addonType="append">
                <Button
                  style={{ backgroundColor: "black" }}
                  onClick={() => {
                    this.props.searchByName(this.state.title);
                  }}
                >
                  <i class="fas fa-search"></i>
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavPublication;
