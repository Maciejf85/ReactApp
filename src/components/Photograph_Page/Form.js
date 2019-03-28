import React from "react";
import Summary from "./Summary";
import Modal from "./Modal";
import Loader from "../Loader";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      name_e: false,
      surname: "",
      surname_e: false,
      password: "",
      password_e: false,
      email: "",
      email_e: false,
      phone: "",
      phone_e: false,
      packageQ: "",
      packageQ_e: false,
      price: "",
      price_e: false,
      addPrice: "",
      addPrice_e: false,
      dateOf: "",
      dateOf_e: false,
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
      success: false,
      loading: false,
      err: 0,
      files_obj: {}
    };
  }

  /**
   * Reakcja na zmiany w input
   */
  inputForm = e => {
    const inputValue = e.target.value;
    const inputName = e.target.name;

    function allLetter(inputtxt) {
      const letters = /^[a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ]+$/;
      if (inputtxt.match(letters)) {
        return true;
      } else {
        return false;
      }
    }

    if (inputName === "name" || inputName === "surname") {
      const matchValue = allLetter(inputValue);
      if (matchValue || inputValue.length < 1) {
        this.setState({
          [e.target.name]: e.target.value
        });
      }
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };
  /**
   * formatowanie daty, nr. telefonu
   */
  formatForm = e => {
    let length = e.target.value.length;
    if (e.target.name === "dateOf") {
      if (length === 2 || length === 5) {
        this.setState({
          [e.target.name]: e.target.value + "/"
        });
      } else if (length === 14) {
        this.setState({
          [e.target.name]: e.target.value + " r."
        });
      }
    } else {
      if (length === 3 || length === 7) {
        this.setState({
          [e.target.name]: e.target.value + "-"
        });
      }
    }
  };

  /**
   * dodanie plików
   */
  fileSelectedHandler = e => {
    const files = e.target.files;
    const t = [...files];
    const size = t.reduce((sum, current) => sum + current.size, 0);
    const sizeT = (size / 1024 / 1024).toFixed(2) + " MB";
    const filesArr = [];

    t.map(item => {
      const photo = {
        name: item.name,
        chosen: 0,
        comment: "",
        prints: []
      };
      return filesArr.push(photo);
    });

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
      comments: String(this.state.comments),
      files_obj: JSON.stringify(filesArr)
    });
    for (let i = 0; i <= t.length; i++) {
      formData.append("files[]", t[i]);
    }
    formData.append("json", data);

    console.log("file select handler");
  };
  /**
   * Czyszczenie formularza
   */
  clearForm = () => {
    this.setState({
      name: "",
      name_e: false,
      surname: "",
      surname_e: false,
      email: "",
      email_e: false,
      phone: "",
      phone_e: false,
      password: "",
      password_e: false,
      packageQ: "",
      packageQ_e: false,
      price: "",
      price_e: false,
      addPrice: "",
      addPrice_e: false,
      dateOf: "",
      dateOf_e: false,
      type: "Rodzinna",
      token: "",
      payed: false,
      prints: false,
      comments: false,
      files: "",
      filesSummary: "",
      loading: false
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
  /**
   * Dodanie nowego użytkownika
   */
  addNewUser = () => {
    fetch(
      "https://cors-anywhere.herokuapp.com/http://maciejf.pl/reactApp/addUser.php",
      // "http://maciejf.pl/reactApp/addUser.php",
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
          showMessage: true,
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          success: false,
          showMessage: true,
          loading: false,
          response: err
        });
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    const err = this.state.err;

    /**
     * Walidacja formularza
     */

    if (!err) {
      this.setState({
        loading: true
      });
      this.addNewUser();
    }
  };
  /**
   * Wyłączanie modala i czyszczenie formularza
   */
  handleModal = () => {
    this.setState({
      showMessage: false
    });
    this.clearForm();
  };
  /**
   * Walidacja formularza
   */
  formValid = e => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    const inputLength = e.target.value.length;

    if (inputName === "name") {
      if (inputLength < 3) {
        this.setState({
          [inputName + "_e"]: "minimalna długość to 3 znaki"
        });
      } else {
        this.setState({
          [inputName + "_e"]: ""
        });
      }
    }

    if (inputName === "surname") {
      if (inputLength < 2) {
        this.setState({
          [inputName + "_e"]: "minimalna długość to 2 znaki"
        });
      } else {
        this.setState({
          [inputName + "_e"]: ""
        });
      }
    }

    if (inputName === "password") {
      if (inputLength < 5) {
        this.setState({
          [inputName + "_e"]: "minimalna długość to 5 znaków"
        });
      } else {
        this.setState({
          [inputName + "_e"]: ""
        });
      }
    }
    if (inputName === "email") {
      if (inputValue.indexOf("@") === -1) {
        this.setState({
          [inputName + "_e"]: "email musi zawierać @"
        });
      } else {
        this.setState({
          [inputName + "_e"]: ""
        });
      }
    }
    if (inputName === "phone") {
      if (inputLength < 11) {
        this.setState({
          [inputName + "_e"]: "prawidłowy format to xxx-xxx-xxx"
        });
      } else {
        this.setState({
          [inputName + "_e"]: ""
        });
      }
    }

    if (
      inputName === "packageQ" ||
      inputName === "price" ||
      inputName === "addPrice"
    ) {
      if (inputLength === 0) {
        this.setState({
          [inputName + "_e"]: "pole nie może być puste"
        });
      } else {
        this.setState({
          [inputName + "_e"]: ""
        });
      }
    }
    if (inputName === "dateOf") {
      if (inputLength !== 10) {
        this.setState({
          [inputName + "_e"]: "prawidłowy format daty to xx/xx/xxx"
        });
      } else {
        this.setState({
          [inputName + "_e"]: ""
        });
      }
    }
  };

  /**
   * Render strony
   */
  render() {
    const {
      name,
      name_e,
      surname,
      surname_e,
      email,
      email_e,
      phone,
      phone_e,
      password,
      password_e,
      packageQ,
      packageQ_e,
      price,
      price_e,
      addPrice,
      addPrice_e,
      dateOf,
      dateOf_e,
      type,
      newUser,
      payed,
      prints,
      files,
      comments,
      allSesions,
      showMessage,
      success,
      loading
    } = this.state;

    return (
      <>
        {loading && <div className="loader form-loader">{<Loader />}</div>}
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
                <form
                  className="form-newClient"
                  onSubmit={this.handleSubmit}
                  noValidate
                >
                  {/* Początek formularza */}
                  <div className="new-box">
                    <input
                      autoComplete="off"
                      type="text"
                      name="name"
                      onChange={this.inputForm}
                      onBlur={this.formValid}
                      value={name}
                      required
                    />
                    <label>Imię</label>
                    <div className="form-error">{name_e}</div>
                    {name_e.length === 0 && (
                      <div className="form-success-icon" />
                    )}
                  </div>

                  <div className="new-box">
                    <input
                      autoComplete="off"
                      type="text"
                      name="surname"
                      onChange={this.inputForm}
                      onBlur={this.formValid}
                      value={surname}
                      required
                    />
                    <label>Nazwisko</label>
                    <div className="form-error">{surname_e}</div>
                    {surname_e.length === 0 && (
                      <div className="form-success-icon" />
                    )}
                  </div>

                  <div className="new-box">
                    <input
                      autoComplete="off"
                      type="text"
                      name="password"
                      onChange={this.inputForm}
                      onBlur={this.formValid}
                      value={password}
                      required
                    />
                    <label>Hasło</label>
                    <div className="form-error">{password_e}</div>
                    {password_e.length === 0 && (
                      <div className="form-success-icon" />
                    )}
                  </div>
                  <div className="new-box">
                    <input
                      autoComplete="off"
                      type="text"
                      name="email"
                      onChange={this.inputForm}
                      onBlur={this.formValid}
                      value={email}
                      required
                    />
                    <label>E-mail</label>
                    <div className="form-error">{email_e}</div>
                    {email_e.length === 0 && (
                      <div className="form-success-icon" />
                    )}
                  </div>
                  <div className="new-box">
                    <input
                      autoComplete="off"
                      type="text"
                      name="phone"
                      onChange={this.inputForm}
                      onKeyUp={this.formatForm}
                      onBlur={this.formValid}
                      value={phone}
                      required
                    />
                    <label>Telefon</label>
                    <div className="form-error">{phone_e}</div>
                    {phone_e.length === 0 && (
                      <div className="form-success-icon" />
                    )}
                  </div>

                  <div className="new-box">
                    <span>Rodzaj sesji :</span>
                    <select
                      className="select-type"
                      name="type"
                      autoComplete="off"
                      value={type}
                      onBlur={this.formValid}
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
                      onBlur={this.formValid}
                      required
                    />
                    <label>Pakiet</label>
                    <div className="form-error">{packageQ_e}</div>
                    {packageQ_e.length === 0 && (
                      <div className="form-success-icon" />
                    )}
                  </div>

                  <div className="new-box">
                    <input
                      autoComplete="off"
                      type="text"
                      name="price"
                      onChange={this.inputForm}
                      value={price}
                      onBlur={this.formValid}
                      required
                    />
                    <label>Cena sesji</label>
                    <div className="form-error">{price_e}</div>
                    {price_e.length === 0 && (
                      <div className="form-success-icon" />
                    )}
                  </div>

                  <div className="new-box">
                    <input
                      autoComplete="off"
                      type="text"
                      name="addPrice"
                      onChange={this.inputForm}
                      value={addPrice}
                      onBlur={this.formValid}
                      required
                    />
                    <label>Cena za dodatkowe</label>
                    <div className="form-error">{addPrice_e}</div>
                    {addPrice_e.length === 0 && (
                      <div className="form-success-icon" />
                    )}
                  </div>

                  <div className="new-box">
                    <input
                      autoComplete="off"
                      type="text"
                      name="dateOf"
                      onChange={this.inputForm}
                      onKeyUp={this.formatForm}
                      value={dateOf}
                      onBlur={this.formValid}
                      required
                    />
                    <label>Data sesji</label>
                    <div className="form-error">{dateOf_e}</div>
                    {dateOf_e.length === 0 && (
                      <div className="form-success-icon" />
                    )}
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

                  <button
                    className="btn-submit-newUser"
                    disabled={files.length <= 0}
                  >
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
