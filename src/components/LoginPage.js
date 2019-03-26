import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router-dom";
import LoaderSmall from "./PhotographPage/LoaderSmall";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.local = JSON.parse(localStorage.getItem("session-token"));
    this.session = JSON.parse(sessionStorage.getItem("session-token"));

    this.state = {
      text: "Maciej",
      password: "1",
      response: "",
      token: this.props.tokenValue,
      type: this.props.type,
      checkbox: false,
      local: this.local,
      session: this.session,
      loading: false
    };
  }
  componentDidMount() {
    if (this.local !== null) {
      this.props.token(this.local.token, this.local.type, this.local.name);
    }
    if (this.session !== null) {
      this.props.token(
        this.session.token,
        this.session.type,
        this.session.name
      );
    }
  }

  inputForm = e => {
    const type = e.target.type;
    this.setState({
      [type]: e.target.value
    });
  };

  handleCheckbox = e => {
    e.target.checked
      ? this.setState({
          checkbox: true
        })
      : this.setState({
          checkbox: false
        });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { text, password } = this.state;

    this.setState({
      loading: true
    });

    if (text.length !== 0 && password.length !== 0) {
      // WYSYŁANIE DANYCH
      fetch(
        "https://cors-anywhere.herokuapp.com/http://maciejf.pl/reactApp/login.php",
        // "http://maciejf.pl/reactApp/login.php",
        {
          method: "POST",
          body: JSON.stringify({ text: text, password: password })
        }
      )
        .then(resp => {
          if (resp.ok) return resp.json();
          else throw new Error("Błąd sieci!");
        })
        .then(response => {
          const { error, token, type, name } = response;
          error === undefined
            ? this.props.token(token, type, name, this.state.checkbox)
            : console.log(error);
        })
        .catch(err => {
          this.setState({
            response: err
          });
        });

      this.setState({
        text: "",
        password: ""
      });
    } else {
      this.setState({
        response: "Wpisz login i hasło"
      });
    }
  };

  render() {
    const { text, password, response, token, type, loading } = this.state;

    if (token !== "" && type === "photographer") {
      return <Redirect to="/photographer" />;
    } else if (token !== "" && type === "client") {
      return <Redirect to="/client" />;
    }

    return (
      <>
        <div className="wrapper" />
        <div className="form-window">
          <div className="form">
            {loading && (
              <div className="loader_small dark">{<LoaderSmall />}</div>
            )}
            <div className="form-icon">
              <FontAwesomeIcon icon={faUserCircle} />
            </div>
            <form>
              <div className="inputBox">
                <input
                  type="text"
                  onChange={this.inputForm}
                  value={text}
                  autoComplete="off"
                  required
                />
                <label>Login</label>
              </div>
              <div className="inputBox">
                <input
                  type="password"
                  onChange={this.inputForm}
                  value={password}
                  autoComplete="off"
                  required
                />
                <label>Hasło</label>
              </div>
              <div className="main-checkbox">
                <label>
                  <input type="checkbox" onChange={this.handleCheckbox} /> Nie
                  wylogowuj mnie
                </label>
              </div>
              <div className="result">{response}</div>

              <input
                type="submit"
                value="Wyślij"
                className="btn-submit"
                onClick={this.handleSubmit}
              />
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Main;
