import React from "react";
import Loader from "../Loader";

class Sessions extends React.Component {
  state = {
    newUser: this.props.newUser,
    allSesions: this.props.allSessions,
    response: "",
    loading: true,
    remove: false
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
          console.log(response);
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
    console.log(e.target.id, e.target.name, e.target.value);
    fetch(
      // "https://cors-anywhere.herokuapp.com/http://maciejf.pl/reactApp/removeUser.php",
      "http://maciejf.pl/reactApp/removeUser.php",
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
      // "https://cors-anywhere.herokuapp.com/http://maciejf.pl/reactApp/getData.php"
      "http://maciejf.pl/reactApp/getData.php"
    )
      .then(resp => {
        if (resp.ok) return resp.json();
        else throw new Error("Błąd sieci!");
      })
      .then(response => {
        if (this.mounted === true) {
          this.setState({ response: response, loading: false });
          console.log(response);
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
        <div className="photographer-form busy">
          {loading && <div className="loader">{<Loader />}</div>}
          <div>
            <h1 className="list-title">Zbiór sesji</h1>
            {!loading && (
              <ul className="list">
                {response.map(item => {
                  if (item.type === "client") {
                    return (
                      <li key={item.id}>
                        <span className="title">{`${item.user}`}</span>
                        <div className="description">
                          {` ${item.type} ${item.name}  ${item.name} ${
                            item.surname
                          } ${item.email} ${item.phone} `}
                        </div>
                        <div className="description">
                          {`${item.typeof} ${item.package} ${item.price} ${
                            item.price_add
                          } ${item.data} ${item.prints === 1 ? true : false} ${
                            item.comments === 1 ? true : false
                          }`}
                          <button
                            className="btn-remove"
                            id={item.id}
                            name={item.user}
                            value={item.token}
                            onClick={this.handleRemove}
                          >
                            usuń
                          </button>
                        </div>
                      </li>
                    );
                  }
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
