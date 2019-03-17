import React from "react";

class Sessions extends React.Component {
  state = {
    newUser: this.props.newUser,
    allSesions: this.props.allSessions,
    response: ""
  };

  componentDidMount() {
    fetch(
      "https://cors-anywhere.herokuapp.com/http://maciejf.pl/reactApp/getData.php"
    )
      .then(resp => {
        if (resp.ok) return resp.text();
        else throw new Error("Błąd sieci!");
      })
      .then(response => this.setState({ response: response }))
      .catch(err => {
        this.setState({
          response: err
        });
      });
  }

  render() {
    const { newUser, allSesions, response } = this.state;

    return (
      <div className="photographer-container">
        <div className="photographer-left">
          <button
            className={"btn-choose " + (newUser ? " btn-active" : "null")}
            name="newClient"
            onClick={this.props.change}
          >
            Nowy klient
          </button>
          <button
            className={"btn-choose " + (allSesions ? " btn-active" : "null")}
            name="allSesions"
            onClick={this.props.change}
          >
            Pokaż wszystkie
          </button>
        </div>
        <div className="photographer-main ">
          <div>
            data:
            <h1>{response}</h1>
          </div>
        </div>
        <div className="photographer-right" />
      </div>
    );
  }
}

export default Sessions;
