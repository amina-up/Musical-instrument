import React, { Component } from "react";
import {
  Button,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardFooter
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getRecentPubs } from "../../../actions/publication";
import "./NewCard.css";
class NewCard extends Component {
  componentDidMount() {
    this.props.getRecentPubs();
  }
  render() {
    return (
      <>
        <h1 className="header-card-section m-2 lastpub">
          Dernières publications
        </h1>
        <Row md="4" sm="2" xs="1" className="m-2 ">
          {this.props.pubs.map(pub => (
            <Col key={pub._id}>
              <Card className="h-80  card">
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
                    <span className="ml-1 card-category">
                      Marque: <span className="text-user">{pub.marque}</span>
                    </span>
                  </CardSubtitle>
                  <CardText className="mt-3 text-center text-secondary card-price">
                    <span className="ml-1 card-category"> Prix: </span>{" "}
                    <span className="text-user">{pub.price}</span>
                    <sup className="ml-1 text-user">DT</sup>
                  </CardText>
                  <Button
                    className="btn-consult text-center"
                    tag={Link}
                    to={`/pubs/${pub._id}`}
                  >
                    Consulter
                  </Button>
                </CardBody>
                <CardFooter className="text-center  p-0 border-0"></CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="d-flex justify-content-end">
          <Button
            tag={Link}
            to="/pubs"
            className="text-decoration-none m-2 see-more-ads"
          >
            <i class="fad fa-arrow-to-right"></i>
          </Button>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => ({
  pubs: state.pubReducer.pubs
});
export default connect(
  mapStateToProps,
  { getRecentPubs }
)(NewCard);
