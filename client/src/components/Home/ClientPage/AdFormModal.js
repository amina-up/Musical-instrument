import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  ModalFooter,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import { addPub, updatePub } from "../../../actions/publication";
import { setAlert } from "../../../actions/alert";
import AlertMsg from "../../Alert";
class PublicationModal extends Component {
  state = {
    title: this.props.isEdit ? this.props.pub.title : "",
    description: this.props.isEdit ? this.props.pub.description : "",
    image: this.props.isEdit ? this.props.pub.image : "",
    marque: this.props.isEdit ? this.props.pub.marque : "",
    price: this.props.isEdit ? this.props.pub.price : ""
  };
  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  removeDuplicates = (myArr, prop) => {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  };
  handleClick = () => {
    this.props.isEdit
      ? this.props.updatePub(
          this.props.pub._id,
          this.state.title,
          this.state.description,
          this.state.image,
          this.state.price,
          this.state.marque
        )
      : this.props.addPub(
          this.state.title,
          this.state.description,
          this.state.image,
          this.state.price,
          this.state.marque
        );
  };
  render() {
    return (
      <Modal
        className="modal-lg"
        isOpen={this.props.isOpen}
        toggle={() => this.props.toggle()}
      >
        <ModalHeader>
          {this.props.isEdit
            ? "Modifier votre instrument"
            : "Ajouter un instrument"}
          <i class="fas fa-guitar-electric"></i>
        </ModalHeader>
        <ModalBody>
          <AlertMsg />
          <InputGroup className="m-2">
            <InputGroupAddon addonType="prepend" style={{ width: "125px" }}>
              <InputGroupText className="w-100">
                <i class="fab fa-tumblr-square"></i>itre
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder=" Nom d'instrument"
              name="title"
              value={this.state.title}
              onChange={this.changeHandler}
            />
          </InputGroup>
          <InputGroup className="m-2">
            <InputGroupAddon addonType="prepend" style={{ width: "125px" }}>
              <InputGroupText className="w-100">
                <i class="fab fa-dochub"></i>escription
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="Ajouter une description"
              name="description"
              value={this.state.description}
              onChange={this.changeHandler}
            />
          </InputGroup>
          <InputGroup className="m-2">
            <InputGroupAddon addonType="prepend" style={{ width: "125px" }}>
              <InputGroupText className="w-100">
                <i class="fas fa-info"></i>mage
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="Image d'instrument"
              name="image"
              value={this.state.image}
              onChange={this.changeHandler}
            />
          </InputGroup>{" "}
          <InputGroup className="m-2">
            <InputGroupAddon addonType="prepend" style={{ width: "125px" }}>
              <InputGroupText className="w-100">
                <i class="fab fa-monero"></i>arque
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="Marque d'instrument"
              name="marque"
              value={this.state.marque}
              onChange={this.changeHandler}
            />
          </InputGroup>{" "}
          <InputGroup className="m-2">
            <InputGroupAddon addonType="prepend" style={{ width: "125px" }}>
              <InputGroupText className="w-100">
                <i class="fab fa-product-hunt"></i>rix
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="Prix d'instrument"
              name="price"
              value={this.state.price}
              onChange={this.changeHandler}
            />
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => {
              this.handleClick();
              this.props.toggle();
            }}
          >
            {this.props.isEdit ? "Enregistrer " : "Publier"}
          </Button>{" "}
          <Button color="secondary" onClick={() => this.props.toggle()}>
            Annuler
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
export default connect(
  null,
  {
    addPub,
    updatePub,
    setAlert
  }
)(PublicationModal);
