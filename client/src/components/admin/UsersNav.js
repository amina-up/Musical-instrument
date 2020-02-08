import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
  Input,
  Button
} from "reactstrap";
import "./style.css";

export class UsersNav extends Component {
  state = {
    isOpen: false,
    name: "",
    role: ""
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
          <NavbarBrand href="/admin" style={{ fontWeight: "bold" }}>
            Liste des Utilisateurs
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} className="droprole" />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <UncontrolledDropdown nav inNavbar className="ml-5">
                <DropdownToggle nav caret style={{ fontWeight: "bold" }}>
                  {this.state.role ? this.state.role : "Role"}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem
                    onClick={() => {
                      this.props.searchByRole("");
                      this.setState({ role: "Tous" });
                    }}
                  >
                    Roles
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      this.props.searchByRole("Vendeur");
                      this.setState({ role: "Vendeur" });
                    }}
                    className="droprole"
                  >
                    Vendeurs
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      this.props.searchByRole("Client");
                      this.setState({ role: "Client" });
                    }}
                    className="droprole"
                  >
                    Clients
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <InputGroup className="w-25">
              <Input
                placeholder="Chercher par nom"
                name="name"
                onChange={e => this.changeHandler(e)}
              />
              <InputGroupAddon addonType="append">
                <Button
                  style={{ backgroundColor: "black" }}
                  onClick={() => {
                    this.props.searchByName(this.state.name);
                    this.setState({ role: "" });
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

export default UsersNav;
