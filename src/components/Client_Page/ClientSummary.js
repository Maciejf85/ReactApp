import React from "react";

class MainClient extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.value.user_name,
      surname: this.props.allData.surname,
      packageQ: this.props.value.packageQ,
      price: this.props.value.price,
      priceAdd: this.props.value.priceAdd,
      payed: this.props.value.payed,
      supplement: 0,
      type: this.props.value.typeOf,
      photos: this.props.photos
    };
  }

  render() {
    const {
      name,
      packageQ,
      price,
      priceAdd,
      payed,
      type,
      surname
    } = this.state;
    const count1 = this.props.photos.filter(item => item.chosen === true)
      .length;

    return (
      <div className="client-summary-container">
        <div className="client-item-title">Podsumowanie: </div>
        <div className="client-item">
          <div className="client-item-value">
            <p>sesja :</p> <span>{type}</span>
          </div>
        </div>
        <div className="client-item">
          <div className="client-item-value">
            <p>
              imię : {name} {surname}
            </p>
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
              wybrane {count1}/{packageQ} szt.
            </p>
          </div>
        </div>
        <div className="client-item">
          <div className="client-item-value">
            <p>dopłata {count1 * priceAdd} zł</p>
          </div>
        </div>
      </div>
    );
  }
}

export default MainClient;
