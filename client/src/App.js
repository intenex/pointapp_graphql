import React from "react";
import { Route, withRouter } from "react-router-dom";
import Nav from "./components/Nav";
import AllTweets from "./components/AllTweets";
import CreateTweet from "./components/CreateTweet";
import UserTweets from "./components/UserTweets";
import Callback from "./components/Callback";
import AuthRoute from "./components/AuthRoute";
import auth from "./Auth";
import "./App.css";

class App extends React.Component {

  async componentDidMount() {
    // callback already attempts to handle auth
    if (this.props.location.pathname === "/callback") return;
    try {
      await auth.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error === "login_required") return;
      console.log(err.error); // in reality actually notify someone
    }
  }

  render() {
    return (
      <div>
        <Nav />
        <Route exact path="/" component={AllTweets} />
        <AuthRoute exact path="/create" component={CreateTweet} />
        <AuthRoute exact path="/user" component={UserTweets} />
        <Route exact path="/callback" component={Callback} />
      </div>
    );
  }
}

export default withRouter(App);
