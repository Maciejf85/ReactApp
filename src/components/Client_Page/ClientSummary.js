import React from "react";

class MainClient extends React.Component {
  state = {
    name: this.props.value.user_name,
    packageQ: this.props.value.packageQ,
    price: this.props.value.price,
    priceAdd: this.props.value.priceAdd,
    payed: this.props.value.payed,
    choosed: 0,
    supplement: 0,
    type: this.props.value.typeOf
  };

  render() {
    const {
      name,
      packageQ,
      price,
      priceAdd,
      payed,
      choosed,
      type
    } = this.state;
    return (
      <div className="client-summary-container">
        <div className="client-item-title">Podsumowanie: </div>
        <div className="client-item">
          <div className="client-item-value">
            <p>sesja : {type}</p>
          </div>
        </div>
        <div className="client-item">
          <div className="client-item-value">
            <p>imię : {name}</p>
          </div>
        </div>
        <div className="client-item">
          <div className="client-item-value">
            <p>pakiet : {packageQ} szt.</p>
          </div>
        </div>
        <div className="client-item">
          <div className="client-item-value">
            <p>cena : {price} zł</p>
          </div>
        </div>
        <div className="client-item">
          <div className="client-item-value">
            <p>sesja {payed ? "opłacona " : "nieopłacona"}</p>
          </div>
        </div>
        <div className="client-item">
          <div className="client-item-value">
            <p>
              wybrane {choosed}/{packageQ} szt.
            </p>
          </div>
        </div>
        <div className="client-item">
          <div className="client-item-value">
            <p>dopłata {choosed * priceAdd} zł</p>
          </div>
        </div>
      </div>
    );
  }
}

export default MainClient;
