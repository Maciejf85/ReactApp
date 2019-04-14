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
    detail: false,
    name: "",
    surname: "",
    token: "",
    detailResponse: ""
  };

  componentDidMount() {
    this.mounted = true;
    fetch(
      "https://cors-anywhere.herokuapp.com/http://maciejf.pl/reactApp/getData.php"
      // "/reactApp/getData.php"
    )
      .then(resp => {
        if (resp.ok) return resp.json();
        else throw new Error("Błąd sieci!");
      })
      .then(response => {
        if (this.mounted === true) {
          this.setState({ response: response, loading: false });
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

  handleDetail = (name, surname, token) => {
    this.setState({
      loading: true
    });
    fetch(
      "https://cors-anywhere.herokuapp.com/http://maciejf.pl/reactApp/getClientData.php",
      // "/reactApp/getClientData.php",
      {
        method: "POST",
        body: JSON.stringify({ token: token, type: "file" })
      }
    )
      .then(resp => {
        if (resp.ok) return resp.json();
        else throw new Error("Błąd sieci!");
      })
      .then(response => {
        if (this.mounted) {
          const chosenQ = response.filter(item => item.chosen === true);
          this.setState({
            detail: true,
            name: name,
            surname: surname,
            token: token,
            detailResponse: chosenQ,
            loading: !this.state.loading
          });
        }
      })
      .catch(err => {
        this.setState({
          response: err
        });
      });
  };

  handleRemove = (name, id, token) => {
    fetch(
      "https://cors-anywhere.herokuapp.com/http://maciejf.pl/reactApp/removeUser.php",
      // "/reactApp/removeUser.php",
      {
        method: "POST",
        body: JSON.stringify({
          user: name,
          id: id,
          token: token
        })
      }
    )
      .then(resp => {
        if (resp.ok) return resp.text();
        else throw new Error("Błąd sieci!");
      })
      .then(response => {
        this.getData();
      })
      .catch(err => {
        console.log(err);
      });
  };

  getData = () => {
    this.mounted = true;
    this.setState({
      loading: true
    });

    fetch(
      "https://cors-anywhere.herokuapp.com/http://maciejf.pl/reactApp/getData.php"
      // "/reactApp/getData.php"
    )
      .then(resp => {
        if (resp.ok) return resp.json();
        else throw new Error("Błąd sieci!");
      })
      .then(response => {
        if (this.mounted === true) {
          this.setState({
            response: response,
            loading: false,
            detail: false
          });
        }
      })
      .catch(err => {
        this.setState({
          response: err
        });
      });
  };

  handleUpdate = props => {
    fetch(
      "https://cors-anywhere.herokuapp.com/http://maciejf.pl/reactApp/update.php",
      // "/reactApp/update.php",
      {
        method: "POST",
        body: JSON.stringify({
          name: props.name,
          surname: props.surname,
          phone: props.phone,
          email: props.email,
          typeOf: props.typeOf,
          packageQ: props.packageQ,
          price: props.price,
          priceAdd: props.priceAdd,
          date: props.date,
          id: props.id
        })
      }
    )
      .then(resp => {
        if (resp.ok) return resp.text();
        else throw new Error("Błąd sieci!");
      })
      .then(response => {
        this.getData();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const {
      newUser,
      allSesions,
      response,
      loading,
      detail,
      name,
      surname,
      token,
      detailResponse
    } = this.state;
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
            {!detail && (
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
                            update={this.handleUpdate}
                            detail={this.handleDetail}
                          />
                        )
                    )}
                  </ul>
                )}
              </div>
            )}
            {detail && (
              <div className="session-detal-container">
                <div className="session-detal-name">
                  <span>
                    {name} {surname}
                  </span>
                  <button className="btn-logout dark" onClick={this.getData}>
                    Powrót
                  </button>
                </div>

                {detailResponse.map((item, index) => (
                  <div key={item.name} className="session-detal-item">
                    <div className="session-detal-number">{index + 1}.</div>
                    <div className="session-detal-image">
                      <img
                        src={`http://maciejf.pl/reactApp/${token}/img/${
                          item.name
                        }`}
                        alt=""
                      />
                    </div>
                    <div className="session-detal-comment">{item.comment}</div>
                    <div className="session-detal-prints">
                      <div className="printsList">
                        <ul>
                          <li className="strong ">
                            <div>rozmiar</div> <div>papier</div>
                            <div>ilość</div>
                            <div />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="session-detal-imgName">{item.name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="photographer-right" />
      </div>
    );
  }
}

export default Sessions;
