import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import PublicationsPages from "./PublicationsPages/PublicationsPages";
import PublicationUser from "./PublicationsPages/PublicationUser";
import MyPublication from "./ClientPage/MyPublication";
import SubPage from "./SubPage";
import NavMenu from "./Navbar/NavMenu";
import { BackTop } from "antd";
import Condition from "./conditionUtilisation/Condition";

export class Home extends Component {
  render() {
    return (
      <div>
        <NavMenu />

        <Switch>
          <Route exact path="/" component={SubPage} />
          <Route exact path="/pubs" component={PublicationsPages} />
          <Route exact path="/pubs/:id" component={PublicationUser} />
          <Route
            exact
            path="/pubs/instrument/:instrument"
            component={PublicationsPages}
          />
          <Route exact path="/MyPublication" component={MyPublication} />
          <Route exact path="/condition" component={Condition} />
        </Switch>
        <BackTop />
      </div>
    );
  }
}

export default Home;
