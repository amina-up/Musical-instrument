import React from "react";
import CardModel from "./CardModel";
import { Container, Row, Col } from "reactstrap";

const Cards = props => {
  return (
    <Container className="d-flex justify-content-sm-center">
      <Row>
        <Col className="m-3">
          <CardModel
            who={"Utilisateurs"}
            nombre={props.users.length - 1}
            to={"/admin"}
          />
        </Col>
        <Col className="m-3">
          <CardModel
            who={"Publications"}
            nombre={props.pubs.length}
            to={"/admin/pubs"}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Cards;
