import React from "react";
import { Redirect } from "react-router-dom";
import logSrc from "../img/react-logo.png";
import ClientSummary from './Client_Page/ClientSummary';
import ClientMain from '../components/Client_Page/ClientMain';


class Client extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: this.props.tokenValue,
      type: this.props.type,
      name: this.props.name
    };
  }

  render() {
    const { token, type, name } = this.state;
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
                <span> LOGO</span>
              </div>
            </div>
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
          <main className='client-main'>
            <div className='client-summary-side'>
              <ClientSummary value={this.state} />
            </div>
            <div className='client-photo-side'>
              <ClientMain value={this.state} />
            </div>
            <div className='client-footer'></div>
          </main>

        </>
      );
    }
  }
}

export default Client;
