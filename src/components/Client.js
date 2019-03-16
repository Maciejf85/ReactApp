import React from "react";
import { Redirect } from "react-router-dom";
import logSrc from "../img/react-logo.png";

class Client extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: this.props.tokenValue,
      type: this.props.type
    };
  }

  render() {
    const { token, type } = this.state;
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

          <h3 style={{ marginTop: "40px" }}>
            message from component Photographer
          </h3>
        </>
      );
    }
  }
}

export default Client;
