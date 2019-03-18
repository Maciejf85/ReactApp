import React from "react";
import Loader from "../Loader";

class Sessions extends React.Component {
  state = {
    newUser: this.props.newUser,
    allSesions: this.props.allSessions,
    response: "",
    loading: true
  };

  componentDidMount() {
    fetch(
      "https://cors-anywhere.herokuapp.com/http://maciejf.pl/reactApp/getData.php"
    )
      .then(resp => {
        if (resp.ok) return resp.json();
        else throw new Error("Błąd sieci!");
      })
      .then(response => {
        this.setState({ response: response, loading: false });
        console.log(response);
      })
      .catch(err => {
        this.setState({
          response: err
        });
      });
  }

  render() {
    const { newUser, allSesions, response, loading } = this.state;
    // const [token, type, name, rows] = response;

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
          {loading && <div className="loader">{<Loader />}</div>}
          <div>
            <h1 className="list-title">Zbiór sesji</h1>
            {!loading && (
              <ul className="list">
                {response.map(item => {
                  return (
                    <li key={item.id}>
                      <span className="title">{item.name}</span>
                      <div className="description">
                        `${item.token} ${item.type} ${item.name}`
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        <div className="photographer-right" />
      </div>
    );
  }
}

export default Sessions;
