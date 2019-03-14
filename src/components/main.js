import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

class Main extends React.Component {
  state = {
    text: "",
    password: "",
    response: "",
    token: ""
  };

  inputForm = e => {
    const type = e.target.type;
    this.setState({
      [type]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { text, password } = this.state;
    this.setState({
      response: ""
    });

    if (text.length !== 0 && password.length !== 0) {
      //POBIERANIE

      // fetch("https://cors-anywhere.herokuapp.com/http://maciejf.pl/newUser.php")
      //   .then(resp => {
      //     if (resp.ok) return resp.text();
      //     else throw new Error("Błąd sieci!");
      //   })
      //   .then(response => {
      //     console.log(response);
      //   })
      //   .catch(err => {
      //     console.log("Błąd!", err);
      //   });

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
          this.setState({
            response: response
          });
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
    const { text, password, response } = this.state;
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
