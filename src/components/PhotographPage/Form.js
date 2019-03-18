import React from "react";
import Summary from "./Summary";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      password: "",
      email: "",
      phone: "",
      packageQ: "",
      price: "",
      addPrice: "",
      dateOf: "",
      type: "",
      files: "",
      newUser: this.props.newUser,
      allSesions: this.props.allSessions,
      token: ""
    };
  }

  inputForm = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  fileSelectedHandler = e => {
    const files = e.target.files;
    const t = [...files];
    const size = t.reduce((sum, current) => sum + current.size, 0);
    console.log((size / 1024 / 1024).toFixed(2) + " MB");

    this.setState({
      files: e.target.files
    });
  };
  handleSubmit = e => {
    const date = new Date();
    const token = date.valueOf().toString();
    const md5 = require("js-md5");
    const sessionValue = md5(token);
    console.log("submit ", sessionValue);
  };

  render() {
    const {
      name,
      surname,
      email,
      phone,
      password,
      packageQ,
      price,
      addPrice,
      dateOf,
      type,
      newUser,
      allSesions
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
        <div className="photographer-main ">
          <div className="newUser-form">
            <div>
              <h3>Nowy klient</h3>
            </div>
            <div className="form-container">
              <form>
                <div className="new-box">
                  <input
                    type="text"
                    name="name"
                    onChange={this.inputForm}
                    value={name}
                    required
                  />
                  <label>Imię</label>
                </div>

                <div className="new-box">
                  <input
                    type="text"
                    name="surname"
                    onChange={this.inputForm}
                    value={surname}
                    required
                  />
                  <label>Nazwisko</label>
                </div>

                <div className="new-box">
                  <input
                    type="text"
                    name="password"
                    onChange={this.inputForm}
                    value={password}
                    required
                  />
                  <label>Hasło</label>
                </div>
                <div className="new-box">
                  <input
                    type="text"
                    name="email"
                    onChange={this.inputForm}
                    value={email}
                    required
                  />
                  <label>E-mail</label>
                </div>
                <div className="new-box">
                  <input
                    type="text"
                    name="phone"
                    onChange={this.inputForm}
                    value={phone}
                    required
                  />
                  <label>Telefon</label>
                </div>

                <div className="new-box">
                  <span>Rodzaj sesji :</span>
                  <select
                    className="select-type"
                    name="type"
                    value={type}
                    onChange={this.inputForm}
                  >
                    <option value="Rodzinna">Rodzinna</option>
                    <option value="Dziecięca">Dziecięca</option>
                    <option value="Newborn">Newborn</option>
                    <option value="Świąteczna">Świąteczna</option>
                    <option value="Kobieca">Kobieca</option>
                    <option value="Ślubna">Ślubna</option>
                  </select>
                </div>

                <div className="new-box">
                  <input
                    type="text"
                    name="packageQ"
                    onChange={this.inputForm}
                    value={packageQ}
                    required
                  />
                  <label>Pakiet</label>
                </div>

                <div className="new-box">
                  <input
                    type="text"
                    name="price"
                    onChange={this.inputForm}
                    value={price}
                    required
                  />
                  <label>Cena sesji</label>
                </div>

                <div className="new-box">
                  <input
                    type="text"
                    name="addPrice"
                    onChange={this.inputForm}
                    value={addPrice}
                    required
                  />
                  <label>Cena za dodatkowe</label>
                </div>

                <div className="new-box">
                  <input
                    type="text"
                    name="dateOf"
                    onChange={this.inputForm}
                    value={dateOf}
                    required
                  />
                  <label>Data sesji</label>
                </div>

                <div className="new-box">
                  <input
                    type="file"
                    name="files"
                    accept=".jpg"
                    encType="multipart/form-data"
                    onChange={this.fileSelectedHandler}
                    multiple
                  />
                </div>
                <button type="submit" onClick={this.handleSubmit}>
                  Wyślij{" "}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="photographer-right">
          <Summary values={this.state} />
        </div>
      </div>
    );
  }
}

export default Form;
