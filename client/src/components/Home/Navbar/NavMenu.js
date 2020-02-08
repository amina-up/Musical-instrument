import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../../actions/authentification";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "./NavMenu.css";
class NavMenu extends Component {
  state = {
    isOpen: false
  };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });
  render() {
    return this.props.loading ? (
      <img className="spiner" src="https://svgshare.com/i/EmH.svg" alt="" />
    ) : (
      <Navbar className="home-nav shadow-sm  " expand="md">
        <NavbarBrand className="d-flex align-items-center">
          <img
            src="https://previews.123rf.com/images/butenkow/butenkow1711/butenkow171100727/90745568-vector-logotipo-de-la-m%C3%BAsica.jpg"
            alt="..."
            className="logo-image"
          />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle}>
          <i className="fas fa-bars fa-3x" style={{ color: "white" }}></i>
        </NavbarToggler>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink
                tag={Link}
                to="/"
                className="mr-3 text-decoration-none home-nav"
              >
                Acceuil
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={Link}
                to="/pubs"
                className="mr-3 text-decoration-none home-nav"
              >
                Liste des instruments
              </NavLink>
            </NavItem>
          </Nav>
          <Nav navbar>
            {!this.props.user ? (
              <>
                <NavItem>
                  <NavLink
                    tag={Link}
                    to="/login"
                    className="mr-3 text-decoration-none home-nav"
                  >
                    <span> Se connecter</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={Link}
                    to="/register"
                    className="mr-3 text-decoration-none home-nav"
                  >
                    <span>Créer un compte</span>
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <UncontrolledDropdown>
                <DropdownToggle className="bg-transparent border-0" caret>
                  {/* <i
                    className="fa fa-fw fa-user fa-3x"
                    style={{ color: "white" }}
                  ></i> */}
                  <i className="fas fa-user-tag fa-3x ml-2"></i>
                </DropdownToggle>
                <DropdownMenu>
                  {this.props.user.role === "Vendeur" && (
                    <DropdownItem
                      tag={Link}
                      to="/MyPublication"
                      className=" text-decoration-none hover-text"
                    >
                      <i className="fas fa-guitar mr-1"></i>

                      <span>Mes publications</span>
                    </DropdownItem>
                  )}
                  {this.props.user.role === "Admin" && (
                    <DropdownItem
                      tag={Link}
                      to="/admin"
                      className=" text-decoration-none"
                    >
                      Dashboard
                    </DropdownItem>
                  )}
                  <DropdownItem
                    tag={Link}
                    to="/"
                    className=" text-decoration-none hover-text "
                    onClick={this.props.logout}
                  >
                    <i class="fas fa-lock mr-2"></i>

                    <span>Log out</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user,
  loading: state.authReducer.loading
});
export default connect(
  mapStateToProps,
  { logout }
)(NavMenu);
