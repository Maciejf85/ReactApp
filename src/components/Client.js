import React from "react";
import { Redirect } from "react-router-dom";
import logSrc from "../img/react-logo.png";
import ClientSummary from "./Client_Page/ClientSummary";
import ClientMain from "../components/Client_Page/ClientMain";
import Loader from "./Loader";

class Client extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: this.props.tokenValue,
      type: this.props.type,
      name: this.props.name,
      user_name: "",
      packageQ: "",
      price: "",
      priceAdd: "",
      payed: "",
      typeOf: "",
      prints: false,
      comments: false,
      gettingData: false,
      photos: {}
    };
  }

  componentDidMount() {
    this.mounted = true;
    fetch(
      "https://cors-anywhere.herokuapp.com/http://maciejf.pl/reactApp/getClientData.php",
      // "http://maciejf.pl/reactApp/getClientData.php",
      {
        method: "POST",
        body: JSON.stringify({ token: this.state.token })
      }
    )
      .then(resp => {
        if (resp.ok) return resp.json();
        else throw new Error("Błąd sieci!");
      })
      .then(response => {
        console.log(response);
        if (this.mounted) {
          this.setState({
            user_name: response[0].name,
            packageQ: response[0].package,
            price: response[0].price,
            priceAdd: response[0].price_add,
            payed: response[0].payed,
            typeOf: response[0].typeof,
            comments: JSON.parse(response[0].comments),
            prints: JSON.parse(response[0].prints),
            photos: response[1],
            gettingData: true
          });
        }
      })
      .catch(err => {
        this.setState({
          response: err
        });
      });
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { token, type, name, gettingData } = this.state;
    if (token === "" || type === "") {
      return <Redirect to="/" />;
    } else {
      return (
        <>
          {!gettingData && <Loader />}
          <div className="owner-nav-container" />
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
          <main className="client-main">
            <div className="client-summary-side">
              {gettingData && <ClientSummary value={this.state} />}
            </div>
            <div className="client-photo-side">
              {gettingData && (
                <ClientMain
                  photos={this.state.photos}
                  prints={this.state.prints}
                  comments={this.state.comments}
                />
              )}
            </div>
            <div className="client-footer" />
          </main>
        </>
      );
    }
  }
}

export default Client;
