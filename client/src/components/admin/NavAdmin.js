import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../Home/Navbar/NavMenu.css";
import { logout } from "../../actions/authentification";
const NavAdmin = props => {
  return (
    <Navbar light expand="md" className="home-nav shadow-sm  ">
      <NavbarBrand className="dashbord">
        {" "}
        <Link to="/">
          <img
            src="https://previews.123rf.com/images/butenkow/butenkow1711/butenkow171100727/90745568-vector-logotipo-de-la-m%C3%BAsica.jpg"
            alt="..."
            className="logo-image"
          />
        </Link>
      </NavbarBrand>
      <Nav className="ml-auto">
        <NavItem>
          <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
            <span className="mr-3 text-decoration-none home-nav nav-link">
              {" "}
              Acceuil
            </span>
          </Link>
        </NavItem>

        <NavItem className="mr-3 text-decoration-none home-nav nav-link">
          <span onClick={() => props.logout()} style={{ cursor: "pointer" }}>
            Déconnexion
          </span>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default connect(
  null,
  { logout }
)(NavAdmin);
