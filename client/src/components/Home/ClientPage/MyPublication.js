import React, { Component } from "react";
import { connect } from "react-redux";
import { getPubs, deletePub } from "../../../actions/publication";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardFooter,
  Button
} from "reactstrap";
import PublicationModal from "./AdFormModal";
import "../Cards/NewCard.css";

class MyPublication extends Component {
  state = {
    modal: false,
    isEdit: false,
    pub: null
  };
  componentDidMount() {
    this.props.user && this.props.getPubs(this.props.user._id);
  }
  toggle = () => this.setState({ modal: !this.state.modal });

  render() {
    console.log(this.props.pubs);
    return this.props.loading ? (
      <img className="spiner" src="https://svgshare.com/i/EmH.svg" alt="" />
    ) : (
      <>
        <Row md="4" sm="2" xs="1">
          {this.props.pubs.map(pub => (
            <Col className="mt-4" key={pub._id}>
              <Card className="h-90 shadow-sm">
                <CardImg
                  top
                  width="100%"
                  height="50%"
                  src={pub.image}
                  alt="Card image cap"
                  className="border-bottom"
                />
                <CardBody>
                  <CardTitle className="text-center card-title mt-3">
                    Instrument:<span className="text-user"> {pub.title}</span>
                  </CardTitle>
                  <CardSubtitle className="card-category text-left mt-3">
                    <span className="ml-1 card-category">
                      Marque: <span className="text-user">{pub.marque}</span>
                    </span>
                  </CardSubtitle>

                  <CardText className="mt-3 mb-2 text-right text-secondary card-price">
                    <span className="ml-1 card-category"> Prix: </span>{" "}
                    <span className="text-user">{pub.price}</span>
                    <sup className="ml-1 text-user">DT</sup>
                  </CardText>
                </CardBody>
                <CardFooter className="d-flex justify-content-between mt-1">
                  <Button color="light">
                    <i
                      className="fas fa-wrench fa-lg text-info"
                      onClick={() =>
                        this.setState({ modal: true, isEdit: true, pub: pub })
                      }
                    ></i>
                  </Button>
                  <Button
                    color="light"
                    onClick={() => this.props.deletePub(pub._id)}
                  >
                    <i className="fas fa-cut fa-lg text-danger"></i>
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          ))}
          <Col
            className="d-flex align-items-center justify-content-center mt-4"
            onClick={() =>
              this.setState({ modal: true, isEdit: false, pub: null })
            }
          >
            <img
              src="https://d1yn1kh78jj1rr.cloudfront.net/image/thumbnail/rDtN98Qoishumwih/product-add-lite-ecommerce-icon_fkhcuaUu_thumb.jpg"
              alt="..."
              style={{ width: "100px", cursor: "pointer" }}
            />
          </Col>
        </Row>

        {this.state.modal ? (
          <PublicationModal
            toggle={this.toggle}
            isOpen={this.state.modal}
            isEdit={this.state.isEdit}
            pub={this.state.pub}
          />
        ) : null}
      </>
    );
  }
}
const mapStateToProps = state => ({
  user: state.authReducer.user,
  pubs: state.pubReducer.pubs,
  loading: state.pubReducer.loading
});
export default connect(
  mapStateToProps,
  {
    getPubs,
    deletePub
  }
)(MyPublication);
