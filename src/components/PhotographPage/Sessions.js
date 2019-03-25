import React from "react";
import Loader from "../Loader";
import ListItem from "./ListItem";

class Sessions extends React.Component {
  state = {
    newUser: this.props.newUser,
    allSesions: this.props.allSessions,
    response: "",
    loading: true,
    remove: false,
    sort: "data"
  };

  componentDidMount() {
    this.mounted = true;
    fetch(
      "https://cors-anywhere.herokuapp.com/http://maciejf.pl/reactApp/getData.php"
      // "http://maciejf.pl/reactApp/getData.php"
    )
      .then(resp => {
        if (resp.ok) return resp.json();
        else throw new Error("Błąd sieci!");
      })
      .then(response => {
        if (this.mounted === true) {
          this.setState({ response: response, loading: false });
          // console.log(response);
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
    console.log("component unmounted: " + this.mounted);
  }

  handleRemove = e => {
    // console.log(e.target.id, e.target.name, e.target.value);
    fetch(
      "https://cors-anywhere.herokuapp.com/http://maciejf.pl/reactApp/removeUser.php",
      // "http://maciejf.pl/reactApp/removeUser.php",
      {
        method: "POST",
        body: JSON.stringify({
          user: e.target.name,
          id: e.target.id,
          token: e.target.value
        })
      }
    )
      .then(resp => {
        if (resp.ok) return resp.text();
        else throw new Error("Błąd sieci!");
      })
      .then(response => {
        console.log("response " + response);
        this.getData();
      })
      .catch(err => {
        console.log(err);
      });
  };

  getData = () => {
    fetch(
      "https://cors-anywhere.herokuapp.com/http://maciejf.pl/reactApp/getData.php"
      // "http://maciejf.pl/reactApp/getData.php"
    )
      .then(resp => {
        if (resp.ok) return resp.json();
        else throw new Error("Błąd sieci!");
      })
      .then(response => {
        if (this.mounted === true) {
          this.setState({ response: response, loading: false });
          // console.log(response);
        }
      })
      .catch(err => {
        this.setState({
          response: err
        });
      });
  };

  render() {
    const { newUser, allSesions, response, loading } = this.state;
    // console.log(response);

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
        <div className="photographer-form busy">
          {loading && <div className="loader">{<Loader />}</div>}
          <div>
            <h1 className="list-title">Baza klientów</h1>
            {!loading && (
              <ul className="list">
                {response.map(
                  item =>
                    item.type === "client" && (
                      <ListItem
                        key={item.id}
                        value={item}
                        remove={this.handleRemove}
                      />
                    )
                )}
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
