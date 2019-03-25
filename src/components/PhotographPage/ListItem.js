import React from "react";

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
    token: this.props.value.token,
    edit: false
  };

  handleEdit = () => {
    this.setState({
      edit: !this.state.edit
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
      edit
    } = this.state;

    return (
      <>
        {edit === false ? (
          <li key={id}>
            <div className="title">
              <span className="date">{this.props.value.user}</span>
              <span className="date">{date}</span>
            </div>
            <ul className="client-data">
              <li className="element">{name}</li>
              <li className="element">{surname}</li>
              <li className="element">{phone}</li>
              <li className="element">{email}</li>
              <li className="element">{typeOf}</li>
              <li className="element small">{packageQ} szt.</li>
              <li className="element small">{price} zł</li>
              <li className="element small">{priceAdd} zł</li>
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
                  onClick={this.props.remove}
                >
                  usuń
                </button>
              </li>
            </ul>
          </li>
        ) : (
            <li key={id}>
              <div className="title">
                <span className="date">{this.props.value.user}</span>
                <span>Edycja</span>
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
                  <button
                    className="btn-edit"
                    id={id}
                    name={user}
                    value={token}
                    onClick={this.handleEdit}
                  >
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
      </>
    );
  }
}

export default ListItem;
