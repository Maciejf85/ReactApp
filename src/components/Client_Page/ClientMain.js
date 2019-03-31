import React from "react";
import Photo from "./Photo-item";

class Main extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    const { photos, user_name, prints } = this.props.allData;
    this.state = {
      photos: photos,
      comments: this.props.allData.comments,
      prints: prints,
      modal_state: false,
      user_name: user_name,
      chosen: this.props.chosenQ,
      isReady: false
    };
  }

  updateData = value => {
    this.setState({
      chosen: value
    });
  };

  countPrice = (chosen, packageQ, priceAdd, payed, price) => {
    this.updateIsReady(chosen >= packageQ);

    if (payed === "false") {
      let toPay = parseInt(price);
      if (chosen > packageQ) {
        toPay += parseInt(chosen - packageQ) * parseInt(priceAdd);
      }
      return toPay;
    } else {
      let toPay = 0;
      if (chosen > packageQ) {
        toPay += parseInt(chosen - packageQ) * parseInt(priceAdd);
      }
      return toPay;
    }
  };
  updateIsReady = value => {
    const isReady = value === true ? 1 : 0;
    fetch(
      "https://cors-anywhere.herokuapp.com/http://maciejf.pl/reactApp/update_isReady.php",
      // "http://maciejf.pl/reactApp/update_isReady.php",
      {
        method: "POST",
        body: JSON.stringify({
          isReady: isReady,
          token: this.props.allData.token
        })
      }
    )
      .then(resp => {
        if (resp.ok) return resp.text();
        else throw new Error("Błąd sieci!");
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { photos, user_name, chosen } = this.state;
    const { typeOf, payed, priceAdd, packageQ, price } = this.props.allData;
    return (
      <>
        <div className="client-summary-side">
          <div className="client-summary-container">
            <div className="client-item-title">Podsumowanie: </div>
            <div className="client-item">
              <div className="client-item-value">
                <p>sesja : {typeOf} </p>
              </div>
            </div>
            <div className="client-item">
              <div className="client-item-value">
                <p>imię : {user_name} </p>
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
                <p>sesja {payed === "true" ? " opłacona" : " nieopłacona"} </p>
              </div>
            </div>
            <div className="client-item">
              <div className="client-item-value">
                <p>
                  wybrane {chosen} / {packageQ} szt.
                </p>
              </div>
            </div>
            <div className="client-item">
              <div className="client-item-value">
                <p>
                  do zapłaty{" "}
                  {this.countPrice(chosen, packageQ, priceAdd, payed, price)} zł
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="client-photo-container">
          {photos.map(item => (
            <div key={item.name}>
              <Photo
                item={item}
                prints={this.state.prints}
                comments={this.state.comments}
                token={this.props.token}
                update={this.updateData}
              />
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default Main;
