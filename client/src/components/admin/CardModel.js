import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const CardPublication = props => {
  return (
    <div
      className="text-center m-auto shadow card-model"
      style={{ width: "20vw", minWidth: "200px" }}
    >
      <Link to={props.to} className="text-white text-decoration-none w-100">
        <Button className="card-model-button w-100">{props.who}</Button>
      </Link>
    </div>
  );
};

export default CardPublication;
