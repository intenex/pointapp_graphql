import React from "react";
import { Route } from "react-router-dom";
import auth from "../Auth";

export default class AuthRoute extends React.Component {
  render() {
    const { component: Component, path } = this.props;
    return (
      <Route
        exact
        path={path}
        render={(props) => {
          if (!auth.isAuthenticated()) return auth.login();
          return <Component {...props} />;
        }}
      />
    )
  }
}