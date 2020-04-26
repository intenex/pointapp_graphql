import React from "react";
import { Link, withRouter } from "react-router-dom";
import auth from "../Auth";
import "../App.css";

class Nav extends React.Component {
  
  logout() {
    auth.logout();
    this.props.history.replace('/');
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            Pwitter
          </Link>
        </div>
        <ul className="nav navbar-nav">
          <li>
            <Link to="/">All the Tweets</Link>
          </li>
          {auth.isAuthenticated() ? (
            <>
              <li>
                <Link to="/user">Your Tweets</Link>
              </li>
              <li>
                <Link to="/create">Make a Tweet</Link>
              </li>
            </>
          ) : (
            ""
          )}
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li>
            {auth.isAuthenticated() ? (
              <button
                className="btn btn-danger log"
                onClick={() => this.logout()}
              >
                Log out{" "}
              </button>
            ) : (
              <button className="btn btn-info log" onClick={() => auth.login()}>
                Log In
              </button>
            )}
          </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Nav);
