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
      name: this.props.name,
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
    const { token, type, newUser, allSessions, name } = this.state;
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
                <span>company name</span>
              </div>
            </div>
            <div className="nav-options" />
            <ul className="nav-list">
              <li>
                Witaj <span className="nav-name">{name}</span> !
              </li>
              <li className="nav-button">
                <button className="btn-logout" onClick={this.props.logout}>
                  Wyloguj
                </button>
              </li>
            </ul>
          </nav>

          {newUser && (
            <Form
              change={this.handleButtonOption}
              newUser={this.state.newUser}
              allSessions={this.state.allSessions}
            />
          )}
          {allSessions && (
            <Sessions
              change={this.handleButtonOption}
              newUser={this.state.newUser}
              allSessions={this.state.allSessions}
            />
          )}
        </>
      );
    }
  }
}

export default Photographer;
