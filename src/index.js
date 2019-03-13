import React from "react";
import ReactDOM from "react-dom";
import Main from "./components/main";
import Login from "./components/login";
import Contact from "./components/contact";
import NotFound from "./components/notFound";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./scss/main.scss";

class App extends React.Component {
  state = {
    isAuthenticated: false
  };

  componentDidMount() {}

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/Login" component={Login} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
