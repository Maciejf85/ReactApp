import React from "react";
import Summary from "./Summary";
import Modal from "./Modal";

class Form extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   name: "Maciej",
    //   surname: "Fiałkowski",
    //   password: "Qr2r3jp",
    //   email: "mki@interia.pl",
    //   phone: "503-111-456",
    //   packageQ: "15",
    //   price: "350",
    //   addPrice: "15",
    //   dateOf: "01-05-2017",
    //   type: "Rodzinna",
    //   payed: false,
    //   prints: false,
    //   comments: false,
    //   files: "",
    //   filesSummary: "",
    //   newUser: this.props.newUser,
    //   allSesions: this.props.allSessions,
    //   token: "",
    //   typeOf: "client",
    //   form_data: {}
    // };

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
      type: "Rodzinna",
      payed: false,
      prints: false,
      comments: false,
      files: "",
      filesSummary: "",
      newUser: this.props.newUser,
      allSesions: this.props.allSessions,
      token: "",
      typeOf: "client",
      form_data: {},
      showMessage: false,
      success: false
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
    const sizeT = (size / 1024 / 1024).toFixed(2) + " MB";

    const date = new Date();
    const token = date.valueOf().toString();
    const md5 = require("js-md5");
    const sessionValue = md5(token);

    var formData = new FormData();

    this.setState({
      files: files,
      filesSummary: { quantity: t.length, size: sizeT },
      form_data: formData,
      token: sessionValue
    });

    const data = JSON.stringify({
      name: this.state.name,
      surname: this.state.surname,
      password: this.state.password,
      email: this.state.email,
      phone: this.state.phone,
      type: this.state.type,
      token: sessionValue,
      packageQ: this.state.packageQ,
      price: this.state.price,
      addPrice: this.state.addPrice,
      dateOf: this.state.dateOf,
      typeOf: this.state.typeOf,
      payed: String(this.state.payed),
      prints: String(this.state.prints),
      comments: String(this.state.comments)
    });
    for (let i = 0; i <= t.length; i++) {
      formData.append("files[]", t[i]);
    }
    formData.append("json", data);

    console.log("file select handler");
  };

  clearForm = () => {
    this.setState({
      name: "",
      surname: "",
      email: "",
      phone: "",
      password: "",
      packageQ: "",
      price: "",
      addPrice: "",
      dateOf: "",
      type: "Rodzinna",
      token: "",
      payed: false,
      prints: false,
      comments: false,
      files: "",
      filesSummary: ""
    });
    console.log("clear form");
  };
  /**
   * Obsługa checkoxów
   */
  handleCheckbox = e => {
    e.target.checked
      ? this.setState({
          [e.target.name]: true
        })
      : this.setState({
          [e.target.name]: false
        });
  };

  addNewUser = () => {
    fetch(
      "https://cors-anywhere.herokuapp.com/http://maciejf.pl/reactApp/newUser.php",
      // "http://maciejf.pl/reactApp/newUser.php",
      {
        method: "POST",
        body: this.state.form_data
      }
    )
      .then(resp => {
        if (resp.ok) return resp.text();
        else throw new Error("Błąd sieci!");
      })
      .then(response => {
        console.log(response);
        this.setState({
          success: true,
          showMessage: true
        });
      })
      .catch(err => {
        this.setState({
          success: false,
          showMessage: true,
          response: err
        });
      });
  };

  handleSubmit = e => {
    e.preventDefault();

    /**
     * Walidacja formularza
     */
    // const {
    //   name,
    //   surname,
    //   email,
    //   phone,
    //   password,
    //   packageQ,
    //   price,
    //   addPrice,
    //   dateOf,
    //   type,
    //   payed,
    //   prints,
    //   comments,
    //   files,
    //   form_data
    // } = this.state;

    /**
     * Stworzenie tokena na podstawie time stamp
     */
    this.addNewUser();
  };

  handleModal = () => {
    this.setState({
      showMessage: false
    });
    this.clearForm();
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
      payed,
      prints,
      files,
      comments,
      allSesions,
      showMessage,
      success
    } = this.state;

    return (
      <>
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
          <div className="photographer-form ">
            <div className="newUser-form">
              <div>
                <h3>Nowy klient</h3>
              </div>
              <div className="form-container">
                <form onSubmit={this.handleSubmit} noValidate>
                  <div className="new-box">
                    <input
                      autoComplete="off"
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
                      autoComplete="off"
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
                      autoComplete="off"
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
                      autoComplete="off"
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
                      autoComplete="off"
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
                      autoComplete="off"
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
                      autoComplete="off"
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
                      autoComplete="off"
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
                      autoComplete="off"
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
                      autoComplete="off"
                      type="text"
                      name="dateOf"
                      onChange={this.inputForm}
                      value={dateOf}
                      required
                    />
                    <label>Data sesji</label>
                  </div>

                  <div className="form-checkbox">
                    <label className={payed ? "checkbox-active" : ""}>
                      <input
                        name="payed"
                        type="checkbox"
                        onChange={this.handleCheckbox}
                        checked={this.state.payed}
                      />
                      Sesja opłacona
                    </label>
                  </div>
                  <div className="form-checkbox">
                    <label className={prints ? "checkbox-active" : ""}>
                      <input
                        name="prints"
                        type="checkbox"
                        onChange={this.handleCheckbox}
                        checked={this.state.prints}
                      />
                      Odbitki
                    </label>
                  </div>
                  <div className="form-checkbox">
                    <label className={comments ? "checkbox-active" : ""}>
                      <input
                        name="comments"
                        type="checkbox"
                        onChange={this.handleCheckbox}
                        checked={this.state.comments}
                      />
                      Dodawanie komentarzy
                    </label>
                  </div>

                  <div className="new-box">
                    <input
                      type="file"
                      name="files"
                      id="file"
                      accept=".jpg"
                      encType="multipart/form-data"
                      onChange={this.fileSelectedHandler}
                      multiple
                    />
                  </div>
                  <label
                    htmlFor="file"
                    className={
                      files.length > 0
                        ? " file-label files-selected"
                        : "file-label"
                    }
                  >
                    {files.length <= 0
                      ? " dodaj pliki"
                      : " wybrano plików: " + files.length}
                  </label>

                  <button className="btn-submit" disabled={files.length <= 0}>
                    Wyślij
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="photographer-right">
            <Summary values={this.state} />
          </div>
        </div>
        {showMessage && (
          <Modal hide={this.handleModal} result={success} name={name} />
        )}
      </>
    );
  }
}

export default Form;
