import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getPub,
  addComment,
  deleteComment
} from "../../../actions/publication";
import Moment from "react-moment";
import {
  Row,
  Col,
  Button,
  Input,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from "reactstrap";

import "./PublicationUser.css";
import { Link } from "react-router-dom";

class PublicationUser extends Component {
  state = {
    comment: ""
  };
  componentDidMount() {
    this.props.getPub(this.props.match.params.id);
  }

  changeHandler = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };
  render() {
    return this.props.loading || !this.props.pub ? (
      <img className="spiner" src="https://svgshare.com/i/EmH.svg" alt="" />
    ) : (
      <div className="m-auto w-75">
        <Row md="2" xs="1" className=" box-pub">
          <Col className="d-flex align-items-center">
            <img
              src={this.props.pub.image}
              width="100%"
              height="100%"
              alt="..."
            />
          </Col>
          <Col>
            <h2 className="ad-title text-center our-pubs titl">
              {this.props.pub.title}
            </h2>
            <div className="marque-pub">
              <h4 className="our-pubs"> Marque:</h4>
              <h6 className=" secondary ml-2 mr-1">{this.props.pub.marque}</h6>
            </div>

            <div>
              <h4 className="our-pubs"> Description:</h4>
              <p className="desc">{this.props.pub.description}</p>
            </div>
            <div className="marque-pub">
              <Col className="mt-4 mb-4 d-flex justify-content-between ">
                <h4 className="our-pubs"> Prix:</h4>
                <p className="prixx">
                  {this.props.pub.price} <sup>DT</sup>
                </p>
              </Col>
            </div>

            {this.props.isAuthenticated && (
              <div className="m-2 p-3 ">
                <p>
                  <span className="mr-2 font-weight-bold our-pubs">
                    Publié par :
                  </span>
                  {this.props.pub.user.name}
                </p>
                <p>
                  <span className="mr-2 font-weight-bold  our-pubs">
                    Adresse email :
                  </span>
                  {this.props.pub.user.email}
                </p>
                <p>
                  <span className="mr-2 font-weight-bold our-pubs">
                    Numéro de téléphone :
                  </span>
                  {this.props.pub.user.phone}
                </p>
              </div>
            )}
          </Col>
        </Row>
        <div>
          <ListGroup className="mt-2 font-weight-bold  commentaire">
            <ListGroupItem>
              <ListGroupItemHeading>
                <p className="connexion">
                  <span className="connexion">
                    {this.props.pub.Comments.length}
                  </span>{" "}
                  {this.props.pub.Comments.length === 1
                    ? "Comment"
                    : "Comments"}
                </p>
              </ListGroupItemHeading>
            </ListGroupItem>
            {this.props.pub.Comments.map(comment => (
              <ListGroupItem key={comment._id}>
                <ListGroupItemHeading className="d-flex justify-content-between">
                  <span className="font-size-bolder">{comment.user.name}</span>{" "}
                  {this.props.isAuthenticated &&
                    (this.props.user._id === comment.user._id ||
                      this.props.user.role === "Admin") && (
                      <span>
                        <button
                          type="button"
                          class="btn btn-danger"
                          onClick={() =>
                            this.props.deleteComment(
                              this.props.pub._id,
                              comment._id
                            )
                          }
                        >
                          Supprimer
                        </button>
                      </span>
                    )}
                </ListGroupItemHeading>
                <ListGroupItemText>{comment.text}</ListGroupItemText>
                <ListGroupItemText
                  style={{ fontSize: "12px" }}
                  className="text-right text-secondary"
                >
                  Publié en:{" "}
                  <Moment format="YYYY/MM/DD HH:mm" className="comment-date">
                    {comment.date}
                  </Moment>
                </ListGroupItemText>
              </ListGroupItem>
            ))}
            <ListGroupItem>
              {this.props.isAuthenticated &&
              this.props.user.role === "Client" ? (
                <>
                  {" "}
                  <Input
                    type="textarea"
                    name="comment"
                    value={this.state.comment}
                    id="exampleText"
                    onChange={this.changeHandler}
                    style={{ border: "solid 1px #EB9916" }}
                  />
                  <Button
                    onClick={() => {
                      this.props.addComment(
                        this.props.pub._id,
                        this.state.comment
                      );
                      this.setState({ comment: "" });
                    }}
                    outline
                    style={{
                      backgroundColor: "#EB9916",
                      border: "solid 2px #EB9916",
                      color: "white"
                    }}
                    className="mt-2"
                  >
                    Ajouter un commentaire
                  </Button>
                </>
              ) : (
                <p>
                  Connectez-vous ou inscrivez-vous pour écrire un commentaire{" "}
                  <Link to="/login" className="connexion">
                    {" "}
                    Se connecter
                  </Link>
                </p>
              )}
            </ListGroupItem>
          </ListGroup>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  loading: state.pubReducer.loading,
  pub: state.pubReducer.pub,
  isAuthenticated: state.authReducer.isAuthenticated,
  user: state.authReducer.user
});
export default connect(
  mapStateToProps,
  {
    getPub,
    addComment,
    deleteComment
  }
)(PublicationUser);
