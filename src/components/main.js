import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

class Main extends React.Component {
  state = {
    text: "",
    password: ""
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
      text: "",
      password: ""
    });

    console.log(text, password);

    //POBIERANIE

    // fetch(
    //   "https://cors-anywhere.herokuapp.com/http://maciejf.pl/Strony_k/222/222.json"
    // )
    //   .then(resp => {
    //     if (resp.ok) return resp.json();
    //     else throw new Error("Błąd sieci!");
    //   })
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(err => {
    //     console.log("Błąd!", err);
    //   });
  };

  render() {
    const { text, password } = this.state;
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
