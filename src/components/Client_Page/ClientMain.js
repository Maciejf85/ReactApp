import React from "react";
import Photo from "./Photo-item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import MainModal from "./MainModal";

class Main extends React.Component {
  constructor(props) {
    super(props);
    const {
      photos,
      user_name,
      prints,
      surname,
      ready,
      chosen
    } = this.props.allData;
    const nameArray = [];
    photos.map(item => nameArray.push(item.name));

    this.state = {
      photos: photos,
      comments: this.props.allData.comments,
      prints: prints,
      user_name: user_name,
      surname: surname,
      chosen: this.props.chosenQ,
      toModal: "",
      isReady: ready,
      modal: false,
      modal_token: "",
      modal_comment: "",
      modal_prints: "",
      modal_chosen: chosen,
      modal_nameArray: nameArray,
      modal_index: "",
      modal_length: ""
    };
  }

  saveModal = (value, name, token) => {
    const curr = this.state.photos.filter(item => item.name === name);

    fetch(
      "https://cors-anywhere.herokuapp.com/http://maciejf.pl/reactApp/updateData.php",
      // "http://maciejf.pl/reactApp/updateData.php",
      {
        method: "POST",
        body: JSON.stringify({
          name: name,
          chosen: value,
          token: token,
          comment: curr[0].comment
        })
      }
    )
      .then(resp => {
        if (resp.ok) return resp.json();
        else throw new Error("Błąd sieci!");
      })
      .then(response => {
        console.log("updated");
        this.setState({
          photos: response
        });

        console.log("update z photo item");
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateData = (response, value) => {
    console.log("update wybranych zdjęć");
    this.setState({
      photos: response,
      chosen: value
    });
  };
  /**
   * Wyświetlenie modala
   */
  handleModal = (name, comment, prints, chosen, token) => {
    const currPhotoIndex = this.state.modal_nameArray.indexOf(name);
    const photos_length = this.state.modal_nameArray.length - 1;
    this.setState({
      toModal: name,
      modal: true,
      modal_token: token,
      modal_comment: comment,
      modal_chosen: chosen,
      modal_prints: prints,
      modal_index: currPhotoIndex,
      modal_length: photos_length
    });
  };
  componentDidUpdate() {
    console.log("Client main updated");
    // let value1 = 0;
    // let value2 = 0;

    // console.log((value1 = this.state.photos.map(item => item.chosen === true)));
    // let cnt1 = value1.map(item => (item === true ? 1 : 0));
    // const sum1 = cnt1.reduce((prev, curr) => prev + curr);
    // console.log(
    //   (value2 = this.props.allData.photos.map(item => item.chosen === true))
    // );
    // let cnt2 = value2.map(item => (item === true ? 1 : 0));
    // const sum2 = cnt2.reduce((prev, curr) => prev + curr);
    // console.log("state sum = ", sum1, " props sum = ", sum2);
    // console.log(sum1 === sum2);
    // if (sum1 !== sum2) {
    // this.props.update();
    // }
  }
  /**
   * Obsługa modala
   */
  handleSlider = e => {
    let dir = "";
    if (e.keyCode !== undefined) {
      dir = e.keyCode;
    } else {
      dir = e.target.name;
    }
    if (e.keyCode === 27) this.closeModal();

    let currPhotoIndex = this.state.modal_nameArray.indexOf(this.state.toModal);

    if (dir === "next" || e.keyCode === 39) {
      if (currPhotoIndex < this.state.modal_length) {
        currPhotoIndex += 1;
      } else {
        currPhotoIndex = 0;
      }
    }
    if (dir === "prev" || e.keyCode === 37) {
      if (currPhotoIndex > 0) {
        currPhotoIndex -= 1;
      } else {
        currPhotoIndex = this.state.modal_length;
      }
    }
    const currPhotoValue = this.state.photos[currPhotoIndex];
    this.setState({
      toModal: currPhotoValue.name,
      modal_index: currPhotoIndex,
      modal_chosen: currPhotoValue.chosen
    });
    // console.log(currPhotoValue);
  };
  /**
   * Zamknij modal
   */
  closeModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  /**
   * Cena za sesję
   */
  countPrice = (chosen, packageQ, priceAdd, payed, price) => {
    this.updateIsReady(chosen >= packageQ);

    if (payed === "false") {
      let toPay = parseFloat(price);
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

  /**
   * Czy sesja jest gotowa
   */
  updateIsReady = value => {
    const isReady = value === true ? 1 : 0;
    const update = value !== Boolean(this.state.isReady);

    if (update) {
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
          console.log("ClientMain.js zmieniono isRady na watość ", value);
          this.setState({
            isReady: value
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    const { photos, user_name, chosen, modal } = this.state;
    const {
      typeOf,
      payed,
      priceAdd,
      packageQ,
      price,
      surname
    } = this.props.allData;
    return (
      <>
        <div className="client-summary-side">
          <div className="client-summary-container">
            <div className="client-item-title">
              <FontAwesomeIcon icon={faUser} className="icon" />
              {user_name} {surname}
            </div>
            <div className="client-item">
              <span className="value-title">sesja :</span>
              <span className="client-item-value">{typeOf}</span>
            </div>
            <div className="client-item">
              <span className="value-title">pakiet :</span>
              <span className="client-item-value">{packageQ} szt.</span>
            </div>
            <div className="client-item">
              <span className="value-title">cena :</span>
              <span className="client-item-value">{price} zł</span>
            </div>
            <div className="client-item">
              <span className="value-title">sesja :</span>
              <span
                className={`client-item-value ${
                  payed === "true" ? "payed" : "fail"
                }`}
              >
                {payed === "true" ? " opłacona" : " nieopłacona"}
              </span>
            </div>
            <div className="client-item">
              <span className="value-title">wybrane :</span>
              <span className="client-item-value">
                {chosen} / {packageQ}
              </span>
            </div>
            {/* <div className="client-item">
              <span className="value-title">do zapłaty :</span>
              <span className="client-item-value">
                {this.countPrice(chosen, packageQ, priceAdd, payed, price)} zł
              </span>
            </div> */}
          </div>
        </div>
        <div className="client-footer">
          <div className="footer-summary">
            suma: {this.countPrice(chosen, packageQ, priceAdd, payed, price)} zł
          </div>
        </div>

        {
          <div className="client-photo-container">
            {photos.map(item => (
              <div key={item.name}>
                {!modal && (
                  <Photo
                    item={item}
                    prints={this.state.prints}
                    comments={this.state.comments}
                    token={this.props.token}
                    update={this.updateData}
                    click={this.handleModal}
                  />
                )}
              </div>
            ))}
            )
          </div>
        }
        {modal && (
          <MainModal
            name={this.state.toModal}
            token={this.state.modal_token}
            close={this.closeModal}
            save={this.saveModal}
            slider={this.handleSlider}
            index={this.state.modal_index}
            length={this.state.modal_length}
            chosen={this.state.modal_chosen}
          />
        )}
      </>
    );
  }
}

export default Main;
