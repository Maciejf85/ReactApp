import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router-dom";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.local = JSON.parse(localStorage.getItem("session-token"));
    this.session = JSON.parse(sessionStorage.getItem("session-token"));

    this.state = {
      text: "",
      password: "",
      response: "",
      token: this.props.tokenValue,
      type: this.props.type,
      checkbox: false,
      local: this.local,
      session: this.session
    };
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

  // handleSubmitPrototype = e => {
  //   e.preventDefault();

  //   const { checkbox } = this.state;

  //   const token = "b8b19afef0f4dd7ba907fe848589685e";
  //   const type = "photographer";

  //   const logInfo = JSON.stringify({ token: token, type: type });

  //   checkbox
  //     ? localStorage.setItem("session-token", logInfo)
  //     : sessionStorage.setItem("session-token", logInfo);

  //   this.setState({
  //     token: token,
  //     type: type
  //   });

  //   this.props.token(token, type);
  // };

  handleSubmit = e => {
    e.preventDefault();
    const { text, password } = this.state;

    this.setState({
      response: ""
    });

    if (text.length !== 0 && password.length !== 0) {
      // WYSYŁANIE DANYCH
      fetch(
        "https://cors-anywhere.herokuapp.com/http://maciejf.pl/reactApp/login.php",
        {
          method: "POST",
          body: JSON.stringify({ text: text, password: password })
        }
      )
        .then(resp => {
          if (resp.ok) return resp.text();
          else throw new Error("Błąd sieci!");
        })
        .then(response => {
          const { token, type, name } = JSON.parse(response);
          this.props.token(token, type, name);
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
    const { text, password, response, token, type } = this.state;

    if (token !== "" && type === "photographer") {
      return <Redirect to="/photographer" />;
    } else if (token !== "" && type === "client") {
      return <Redirect to="/client" />;
    }

    return (
      <>
        <div className="wrapper">
          <div className="form-window">
            <div className="form">
              <div className="form-icon">
                <FontAwesomeIcon icon={faUserCircle} />
              </div>
              <form>
                <div className="inputBox">
                  <input
                    type="text"
                    onChange={this.inputForm}
                    value={text}
                    required
                  />
                  <label>Login</label>
                </div>
                <div className="inputBox">
                  <input
                    type="password"
                    onChange={this.inputForm}
                    value={password}
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
        </div>
      </>
    );
  }
}

export default Main;
