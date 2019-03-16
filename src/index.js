import React from "react";
import ReactDOM from "react-dom";
import LoginPage from "./components/LoginPage";
import NotFound from "./components/notFound";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./scss/main.scss";
import Client from "./components/Client";
import Photographer from "./components/Photographer";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.local = JSON.parse(localStorage.getItem("session-token"));
    this.session = JSON.parse(sessionStorage.getItem("session-token"));

    this.state = {
      isAuthenticated: false,
      token: "",
      type: "",
      local: this.local,
      session: this.session
    };
  }

  handleLogin = (value, type) => {
    this.setState({
      isAuthenticated: true,
      token: value,
      type: type
    });
  };

  logOut = () => {
    this.setState({
      isAuthenticated: false,
      token: "",
      type: ""
    });
    localStorage.clear();
    sessionStorage.clear();
  };

  render() {
    const { isAuthenticated, token, type, local, session } = this.state;

    return (
      <>
        {/* <h2>
            React Router , {isAuthenticated} , {token}, {type};
            <button onClick={this.logOut}>wyloguj</button>
          </h2> */}
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              component={() => (
                <LoginPage
                  token={this.handleLogin}
                  isAuthenticated={isAuthenticated}
                  type={type}
                  tokenValue={token}
                  logout={this.logOut}
                  local={local}
                  session={session}
                />
              )}
            />
            <Route
              exact
              path="/client"
              component={() => (
                <Client
                  token={this.handleLogin}
                  isAuthenticated={isAuthenticated}
                  type={type}
                  tokenValue={token}
                  logout={this.logOut}
                />
              )}
            />
            />
            <Route
              exact
              path="/photographer"
              component={() => (
                <Photographer
                  token={this.handleLogin}
                  isAuthenticated={isAuthenticated}
                  type={type}
                  tokenValue={token}
                  logout={this.logOut}
                />
              )}
            />
            />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </>
    );
  }
}
// }

ReactDOM.render(<App />, document.getElementById("root"));
