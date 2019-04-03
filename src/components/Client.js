import React from "react";
import { Redirect } from "react-router-dom";
import logSrc from "../img/react-logo.png";
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
      surname: "",
      packageQ: "",
      price: "",
      priceAdd: "",
      payed: "",
      typeOf: "",
      prints: false,
      comments: false,
      gettingData: false,
      chosenQ: 0,
      ready: 0,
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
        if (this.mounted) {
          const chosenQ = JSON.parse(response[1]).filter(
            item => item.chosen === true
          ).length;
          this.setState({
            user_name: response[0].name,
            surname: response[0].surname,
            packageQ: response[0].package,
            price: response[0].price,
            priceAdd: response[0].price_add,
            payed: response[0].payed,
            typeOf: response[0].typeof,
            ready: response[0].ready,
            comments: JSON.parse(response[0].comments),
            prints: JSON.parse(response[0].prints),
            photos: JSON.parse(response[1]),
            gettingData: true,
            chosenQ: chosenQ
          });
        }
      })
      .catch(err => {
        this.setState({
          response: err
        });
      });
  }
  updateDataBase = value => {
    fetch(
      "https://cors-anywhere.herokuapp.com/http://maciejf.pl/reactApp/updateBaseData.php",
      // "http://maciejf.pl/reactApp/updateBaseData.php",
      {
        method: "POST",
        body: JSON.stringify({
          token: this.state.token,
          value: value
        })
      }
    )
      .then(resp => {
        if (resp.ok) return resp.text();
        else throw new Error("Błąd sieci!");
      })
      .then(response => {})
      .catch(err => {
        console.log(err);
      });
  };

  updateData = () => {
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
        if (this.mounted) {
          const chosenQ = response.filter(item => item.chosen === true).length;
          this.setState({
            user_name: response[0].name,
            surname: response[0].surname,
            packageQ: response[0].package,
            price: response[0].price,
            priceAdd: response[0].price_add,
            payed: response[0].payed,
            typeOf: response[0].typeof,
            ready: response[0].ready,
            comments: JSON.parse(response[0].comments),
            prints: JSON.parse(response[0].prints),
            photos: JSON.parse(response[1]),
            gettingData: true,
            chosenQ: chosenQ
          });
        }
      })
      .catch(err => {
        this.setState({
          response: err
        });
      });
  };
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
            <div className="client-photo-side">
              {gettingData && (
                <ClientMain
                  allData={this.state}
                  // photos={this.state.photos}
                  // prints={this.state.prints}
                  // comments={this.state.comments}
                  token={this.state.token}
                  chosenQ={this.state.chosenQ}
                  update={this.updateData}
                  updateData={this.updateDataBase}
                />
              )}
            </div>
          </main>
        </>
      );
    }
  }
}

export default Client;
