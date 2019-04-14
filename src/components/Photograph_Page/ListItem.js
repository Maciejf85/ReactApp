import React from "react";
import LoaderSmall from "./LoaderSmall";
import Confirm from "./ModalConfirm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

class ListItem extends React.Component {
  state = {
    id: this.props.value.id,
    user: this.props.value.user,
    date: this.props.value.data,
    name: this.props.value.name,
    surname: this.props.value.surname,
    phone: this.props.value.phone,
    email: this.props.value.email,
    typeOf: this.props.value.typeof,
    packageQ: this.props.value.package,
    price: this.props.value.price,
    priceAdd: this.props.value.price_add,
    ready: this.props.value.ready,
    chosen: this.props.value.chosen,
    token: this.props.value.token,
    edit: false,
    pending: false,
    confirm: false
  };

  handleDetail = () => {
    const { name, surname, token } = this.state;
    this.props.detail(name, surname, token);
  };

  handleEdit = () => {
    this.state.edit && this.props.update(this.state);

    this.setState({
      edit: !this.state.edit,
      pending: true
    });
  };

  handleConfirm = () => {
    this.setState({
      confirm: !this.state.confirm
    });
  };

  handleRemove = () => {
    this.props.remove(this.state.name, this.state.id, this.state.token);
    this.setState({
      pending: true,
      confirm: false
    });
  };

  handleForm = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const {
      id,
      user,
      date,
      name,
      surname,
      phone,
      email,
      typeOf,
      packageQ,
      price,
      priceAdd,
      ready,
      token,
      edit,
      pending,
      chosen,
      confirm
    } = this.state;
    const addPhotos = parseInt(chosen) > parseInt(packageQ);
    const downloadBtn = parseInt(chosen) >= parseInt(packageQ);
    const payed = this.props.value.payed;
    const cost = payed === "true" ? 0 : parseFloat(price);
    return (
      <>
        {edit === false ? (
          <li>
            {pending && <div className="loader_small">{<LoaderSmall />}</div>}
            <div className="title">
              <span className="date">{this.props.value.user}</span>
              <div>
                {downloadBtn && (
                  <button className="btn-download">
                    <a href={`/reactApp/${this.props.value.token}/wybrane.bat`}>
                      <FontAwesomeIcon icon={faDownload} />
                    </a>
                  </button>
                )}
                <span className="date">{date}</span>
              </div>
            </div>
            <ul className="client-data">
              <li className="element desc">imię</li>
              <li className="element desc">nazwisko</li>
              <li className="element desc">telefon</li>
              <li className="element desc">e-mail</li>
              <li className="element desc">typ</li>
              <li className="element small desc">pakiet</li>
              <li className="element small desc">cena </li>
              <li className="element small desc">dodatkowe </li>
              <li className="element small desc">wybrane</li>
              <li className="element small desc">do zapłaty</li>
              <li className="element desc">status</li>
              <li>
                <div className="empty" />
                <div className="empty" />
              </li>
            </ul>
            <ul className="client-data">
              <li className="element">{name}</li>
              <li className="element">{surname}</li>
              <li className="element">{phone}</li>
              <li className="element">{email}</li>
              <li className="element">{typeOf}</li>
              <li className="element small">{packageQ} szt.</li>
              <li className="element small">{price} zł</li>
              <li className="element small">{priceAdd} zł</li>
              <li className="element small">
                {chosen} / {packageQ}
              </li>
              <li className={`element small ${addPhotos ? "unpayed" : null}`}>
                {addPhotos ? (chosen - packageQ) * priceAdd + cost : 0 + cost}{" "}
                zł
              </li>
              <li className={ready > 0 ? "element ready" : "element pending"}>
                {ready > 0 ? "gotowe" : "oczekuje"}
              </li>
              <li>
                <button
                  className="btn-edit"
                  id={id}
                  name={user}
                  value={token}
                  onClick={this.handleEdit}
                >
                  edytuj
                </button>

                <button
                  className="btn-remove"
                  id={id}
                  name={user}
                  value={token}
                  onClick={this.handleConfirm}
                >
                  usuń
                </button>
              </li>
            </ul>
            {downloadBtn && (
              <button
                className="btn-more"
                name={token}
                onClick={this.handleDetail}
              />
            )}
          </li>
        ) : (
          <li key={id} className={edit && "active"}>
            <div className="title">
              <span className="date">{this.props.value.user}</span>
              <span>edycja</span>

              <span className="date">
                <input
                  className="listItem-input"
                  type="text"
                  defaultValue={date}
                  name="date"
                  onChange={this.handleForm}
                />
              </span>
            </div>
            <ul className="client-data">
              <li className="element">
                <input
                  className="listItem-input"
                  type="text"
                  defaultValue={name}
                  name="name"
                  onChange={this.handleForm}
                />
              </li>
              <li className="element">
                <input
                  className="listItem-input"
                  type="text"
                  defaultValue={surname}
                  name="surname"
                  onChange={this.handleForm}
                />
              </li>
              <li className="element">
                <input
                  className="listItem-input"
                  type="text"
                  defaultValue={phone}
                  name="phone"
                  onChange={this.handleForm}
                />
              </li>
              <li className="element">
                <input
                  className="listItem-input"
                  type="text"
                  defaultValue={email}
                  name="email"
                  onChange={this.handleForm}
                />
              </li>
              <li className="element">
                <input
                  className="listItem-input"
                  type="text"
                  defaultValue={typeOf}
                  name="typeOf"
                  onChange={this.handleForm}
                />
              </li>
              <li className="element small">
                <input
                  className="listItem-input small"
                  type="text"
                  defaultValue={packageQ}
                  name="packageQ"
                  onChange={this.handleForm}
                />
                szt.
              </li>
              <li className="element small">
                <input
                  className="listItem-input small"
                  type="text"
                  defaultValue={price}
                  name="price"
                  onChange={this.handleForm}
                />
                zł
              </li>
              <li className="element small">
                <input
                  className="listItem-input small"
                  type="text"
                  defaultValue={priceAdd}
                  name="priceAdd"
                  onChange={this.handleForm}
                />
                zł
              </li>
              <li className={ready > 0 ? "element ready" : "element pending"}>
                {ready > 0 ? "gotowe" : "oczekuje"}
              </li>
              <li>
                <button className="btn-edit save" onClick={this.handleEdit}>
                  zapisz
                </button>

                <button
                  className="btn-remove"
                  id={id}
                  name={user}
                  value={token}
                  onClick={this.props.remove}
                >
                  usuń
                </button>
              </li>
            </ul>
          </li>
        )}
        {edit && <div className="editing" />}
        {confirm && (
          <Confirm
            name={name}
            id={id}
            value={token}
            cancel={this.handleConfirm}
            remove={this.handleRemove}
          />
        )}
      </>
    );
  }
}

export default ListItem;
