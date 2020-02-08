import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";
import { register } from "../actions/authentification";

import {
  Col,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Button,
  Row
} from "reactstrap";
import AlertMsg from "./Alert";
import "./Register.css";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    role: "Vendeur",
    phone: "",
    validate: {
      nameState: "ok",
      emailState: "ok",
      passwordState: "ok",
      telState: "ok"
    }
  };

  submitForm(e) {
    e.preventDefault();
    this.validateName();
    this.validateEmail();
    this.validatePassword();
    this.state.role === "Vendeur" && this.validatePhone();
    let ok = true;
    for (let item in this.state.validate) {
      if (this.state.validate[item] !== "ok") return (ok = false);
    }

    ok && this.state.role === "Vendeur"
      ? this.props.register(
          this.state.name,
          this.state.email,
          this.state.password,
          this.state.role,
          this.state.phone
        )
      : this.props.register(
          this.state.name,
          this.state.email,
          this.state.password,
          this.state.role
        );
  }
  changeHandler = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };
  validateName = () => {
    const { validate } = this.state;
    if (!this.state.name) {
      validate.nameState = "bad";
    } else {
      validate.nameState = "ok";
    }
    this.setState({ validate });
  };
  validateEmail = () => {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
    if (emailRex.test(this.state.email)) {
      validate.emailState = "ok";
    } else {
      validate.emailState = "bad";
    }
    this.setState({ validate });
  };
  validatePassword = () => {
    const { validate } = this.state;
    if (!this.state.password) {
      validate.passwordState = "bad";
    } else {
      validate.passwordState = "ok";
    }
    this.setState({ validate });
  };
  validatePhone = () => {
    const { validate } = this.state;
    if (this.state.phone.length !== 8) {
      validate.telState = "bad";
    } else {
      validate.telState = "ok";
    }
    this.setState({ validate });
  };
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className=" cont containerr">
        <h2 className="text-center mb-5">Créer Votre Compte</h2>
        <Col>
          <AlertMsg />
        </Col>
        <Form className="form" onSubmit={e => this.submitForm(e)}>
          <Col>
            <FormGroup className="d-flex  form-group flex-wrap ">
              <i class="fas fa-user-tie fas1"></i>
              <Input
                className="input-text ml-3"
                type="name"
                name="name"
                placeholder="Votre Prénom"
                value={this.state.name}
                onChange={this.changeHandler}
                invalid={this.state.validate.nameState === "bad"}
                onFocus={() => {
                  this.setState({
                    validate: { ...this.state.validate, nameState: "ok" }
                  });
                }}
              />
              <FormFeedback iinvalid="true">Entrer un nom valide.</FormFeedback>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup className="d-flex  form-group  flex-wrap ">
              <i className="fas fa-envelope fas1"></i>
              <Input
                className="input-text ml-3 "
                type="email"
                name="email"
                placeholder="Votre Email"
                invalid={this.state.validate.emailState === "bad"}
                onFocus={() => {
                  this.setState({
                    validate: { ...this.state.validate, emailState: "ok" }
                  });
                }}
                value={this.state.email}
                onChange={this.changeHandler}
              />
              <FormFeedback invalid="true">
                Entrer un Email valide.
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup className="d-flex  form-group flex-wrap ">
              <i className="fas fa-lock fas1"></i>
              <Input
                className="input-text ml-3"
                type="password"
                name="password"
                placeholder="Mot de passe"
                value={this.state.password}
                onChange={this.changeHandler}
                invalid={this.state.validate.passwordState === "bad"}
                onFocus={() => {
                  this.setState({
                    validate: { ...this.state.validate, passwordState: "ok" }
                  });
                }}
              />
              <FormFeedback iinvalid="true">
                Entrer un mot de passe valide.
              </FormFeedback>
            </FormGroup>
          </Col>
          <Row className="m-0" xs="1" md="2">
            <Col>
              <FormGroup className="d-flex  form-group flex-wrap ">
                <i className="fas fa-user-tag fas1"></i>
                <Input
                  className="input-text ml-3"
                  type="select"
                  name="role"
                  onChange={this.changeHandler}
                  onClick={() => {
                    this.state.role === "Client" &&
                      this.setState({
                        validate: { ...this.state.validate, telState: "ok" }
                      });
                  }}
                >
                  <option value="Vendeur">Vendeur</option>
                  <option value="Client"> Client</option>
                </Input>
              </FormGroup>
            </Col>
            {this.state.role === "Vendeur" && (
              <Col>
                <FormGroup className="d-flex  form-group flex-wrap ">
                  <i className="fas fa-mobile fas1"></i>
                  <Input
                    className="input-text ml-2"
                    type="number"
                    name="phone"
                    placeholder="Votre Numéro de téléphone"
                    value={this.state.phone}
                    onChange={this.changeHandler}
                    invalid={this.state.validate.telState === "bad"}
                    onFocus={() => {
                      this.setState({
                        validate: { ...this.state.validate, telState: "ok" }
                      });
                    }}
                  />
                  <FormFeedback iinvalid="true">
                    S'il vous plait entrez un numéro de téléphone avec chiffres.
                  </FormFeedback>
                </FormGroup>
              </Col>
            )}
          </Row>
          <p className="mt-3 text-cente ">
            Vous avez déjà un compte{" "}
            <Link to="/login" className="inscription">
              Se connecter
            </Link>
          </p>
          <Col className="text-right">
            <Button color="warning " className="btn-register">
              S'inscrire
            </Button>
          </Col>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
