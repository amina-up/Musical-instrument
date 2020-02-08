import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  InputGroup,
  InputGroupAddon,
  Input,
  Button
} from "reactstrap";

export class PublicationNav extends Component {
  state = {
    isOpen: false,
    title: "",
    marque: ""
  };

  changeHandler = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
    console.log(event);
  };
  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  removeDuplicates = (myArr, prop) => {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  };
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <InputGroup className="w-25">
              <Input
                placeholder="Trouver un instrument..."
                name="title"
                value={this.state.title}
                onChange={e => this.changeHandler(e)}
              />
              <InputGroupAddon addonType="append">
                <Button
                  style={{ backgroundColor: "black" }}
                  onClick={() => {
                    this.props.searchByTitle(this.state.title);
                  }}
                >
                  <i class="fas fa-search"></i>
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default PublicationNav;
