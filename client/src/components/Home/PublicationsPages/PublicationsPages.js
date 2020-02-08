import React, { Component } from "react";
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
import PublicationNav from "./PublicationNav";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getPubs } from "../../../actions/publication";
import "./PublicationUser.css";

class PublicationsPages extends Component {
  state = { myTitle: "", myMarque: "" };
  componentDidMount() {
    this.props.getPubs();
  }
  searchByTitle = title => {
    this.setState({ myTitle: title });
    this.props.getPubs();
  };

  render() {
    return this.props.loading ? (
      <img className="spiner" src="https://svgshare.com/i/EmH.svg" alt="" />
    ) : (
      <>
        <PublicationNav
          searchByInstrument={this.searchByInstrument}
          pub={this.props.pub}
          searchByTitle={this.searchByTitle}
        />
        <Row md="4" sm="2" xs="1" className="m-2 ">
          {this.props.pubs
            .filter(pub =>
              this.state.myTitle
                ? pub.title
                    .toLowerCase()
                    .includes(this.state.myTitle.toLowerCase().trim())
                : pub
            )

            .map(pub => (
              <Col>
                <Card className="h-70 shadow-sm mt-5 mb-5">
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
                      Instrument:<span className="text-user">{pub.title}</span>
                    </CardTitle>
                    <CardSubtitle className="card-category text-center mt-3">
                      Marque:
                      <span className="text-user "> {pub.marque}</span>
                    </CardSubtitle>
                    <CardText className="mt-3 mb-2 text-center text-secondary card-price">
                      <span className="ml-1 card-category"> Prix: </span>{" "}
                      <span className="text-user">{pub.price}</span>
                      <sup className="ml-1 text-user">DT</sup>
                    </CardText>
                    <Button
                      className="btn-consult"
                      tag={Link}
                      to={`/pubs/${pub._id}`}
                    >
                      Consulter
                    </Button>
                  </CardBody>
                  <CardFooter className="text-center p-0 border-0"></CardFooter>
                </Card>
              </Col>
            ))}
        </Row>
      </>
    );
  }
}
const mapStateToProps = state => ({
  pubs: state.pubReducer.pubs,
  loading: state.pubReducer.loading
});
export default connect(
  mapStateToProps,
  { getPubs }
)(PublicationsPages);
