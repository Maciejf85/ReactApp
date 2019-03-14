import React from "react";
import ReactDOM from "react-dom";
import Main from "./components/main";
import Login from "./components/logedIn";
import NotFound from "./components/notFound";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./scss/main.scss";

class App extends React.Component {
  state = {
    isAuthenticated: false,
    token: ""
  };

  handleLogin = props => {
    console.log(props);
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/Login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
