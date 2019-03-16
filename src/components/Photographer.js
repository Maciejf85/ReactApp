import React from "react";
import { Redirect } from "react-router-dom";
import logSrc from "../img/react-logo.png";
import Form from "./PhotographPage/Form";
import Sessions from "./PhotographPage/Sessions";

class Photographer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: this.props.tokenValue,
      type: this.props.type,
      newUser: true,
      allSessions: false
    };
  }

  handleButtonOption = e => {
    e.target.name === "newClient"
      ? this.setState({ newUser: true, allSessions: false })
      : this.setState({ newUser: false, allSessions: true });
  };

  render() {
    const { token, type, newUser, allSessions } = this.state;
    console.log(newUser, allSessions);
    if (token === "" || type === "") {
      return <Redirect to="/" />;
    } else {
      return (
        <>
          <nav className="owner-nav">
            <div>
              <div className="nav-logo">
                <div>
                  <img src={logSrc} alt="logo" />
                </div>
                <span>your LOGO</span>
              </div>
            </div>
            <ul className="nav-list">
              <li>
                Witaj <span className="nav-name">{type}</span> !
              </li>
              <li className="nav-button">
                <button className="btn-logout" onClick={this.props.logout}>
                  Wyloguj
                </button>
              </li>
            </ul>
          </nav>
          <div className="nav-options">
            <button
              className="btn-choose"
              name="newClient"
              onClick={this.handleButtonOption}
            >
              Nowy klient
            </button>
            <button
              className="btn-choose"
              name="allSesions"
              onClick={this.handleButtonOption}
            >
              Pokaż wszystkie
            </button>
          </div>
          {newUser && <Form />}
          {allSessions && <Sessions />}
        </>
      );
    }
  }
}

export default Photographer;
