import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/authentification";
import { setAlert } from "../actions/alert";
import { Col, Form, FormGroup, FormFeedback, Input, Button } from "reactstrap";
import AlertMsg from "./Alert";
import "./Register.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
    validate: {
      emailState: "ok",
      passwordState: "ok"
    }
  };

  submitForm(e) {
    e.preventDefault();
    this.validateEmail();
    this.validatePassword();
    let ok = true;
    for (let item in this.state.validate) {
      if (this.state.validate[item] !== "ok") return (ok = false);
    }
    ok && this.props.login(this.state.email, this.state.password);
  }
  changeHandler = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
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

  render() {
    if (this.props.user) {
      return this.props.user.role === "Admin" ? (
        <Redirect to="/admin" />
      ) : (
        <Redirect to="/" />
      );
    }

    return (
      <div className=" cont containerr">
        <h2 className="text-center mb-5">Mon compte</h2>
        <Col>
          <AlertMsg />
        </Col>
        <Form className="form" onSubmit={e => this.submitForm(e)}>
          <Col>
            <FormGroup className="d-flex  form-group flex-wrap ">
              <i className="fas fa-envelope fas1"></i>
              <Input
                className="input-text ml-3"
                type="email"
                name="email"
                placeholder="Votre adresse email"
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
                Entrer un email valide.
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
                placeholder="Password"
                value={this.state.password}
                onChange={this.changeHandler}
                invalid={this.state.validate.passwordState === "bad"}
                onFocus={() => {
                  this.setState({
                    validate: { ...this.state.validate, passwordState: "ok" }
                  });
                }}
              />
              <FormFeedback invalid="true">
                Entrer un mot de passe valide
              </FormFeedback>
            </FormGroup>
          </Col>
          <p className="mt-4 text-cente ">
            Vous n'avez pas un compte?
            <Link to="/register" className="inscription">
              {" "}
              S'inscrire
            </Link>
          </p>
          <Col className="text-right">
            <Button color="warning " className="btn-register">
              Se connecter
            </Button>
          </Col>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.authReducer.user
});
export default connect(
  mapStateToProps,
  { setAlert, login }
)(Login);
