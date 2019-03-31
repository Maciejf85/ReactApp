import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import ModalPhoto from "./ModalPhoto";
import LoaderSmall from "../Photograph_Page/LoaderSmall";

class Photo extends React.Component {
  state = {
    prints: this.props.prints,
    comment: this.props.comments,
    name: this.props.item.name,
    comment_text: this.props.item.comment,
    chosen: this.props.item.chosen,
    prints_items: [],
    token: this.props.token,
    edit: false,
    chosenQ: this.props.chosenQ,
    status: false
  };
  componentDidMount() {
    this.mount = true;
  }
  componentWillUnmount() {
    this.mount = false;
  }

  countChosen = response => {
    const chosenQ = response.filter(item => item.chosen === true).length;
    this.props.update(chosenQ);
  };
  updateComponent = () => {
    if (this.mount) {
      fetch(
        "https://cors-anywhere.herokuapp.com/http://maciejf.pl/reactApp/updateData.php",
        // "http://maciejf.pl/reactApp/updateData.php",
        {
          method: "POST",
          body: JSON.stringify({
            name: this.state.name,
            comment: this.state.comment_text,
            chosen: this.state.chosen,
            token: this.props.token
          })
        }
      )
        .then(resp => {
          if (resp.ok) return resp.json();
          else throw new Error("Błąd sieci!");
        })
        .then(response => {
          this.countChosen(response);
          this.setState({
            status: false
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  handleEdit = (message, comment, prints) => {
    this.setState({
      status: true
    });
    if (message === "update") {
      this.setState(
        {
          edit: !this.state.edit,
          comment_text: comment,
          prints_items: prints
        },
        this.updateComponent
      );
      console.log(message, comment, prints);
    } else if (message === "chosen") {
      this.setState(
        {
          edit: !this.state.edit,
          chosen: !this.state.chosen
        },
        this.updateComponent
      );
      console.log(message, comment, prints);
    } else {
      this.setState({
        edit: !this.state.edit,
        status: false
      });
      console.log("close modal");
    }
  };

  selectPhoto = () => {
    this.setState(
      {
        chosen: !this.state.chosen,
        status: true
      },
      this.updateComponent
    );
  };

  render() {
    const { prints, comment, chosen, edit, status } = this.state;

    return (
      <>
        {edit && <ModalPhoto name={this.state} hide={this.handleEdit} />}

        <div className="photo-item">
          {status && <div className="loader_small">{<LoaderSmall />}</div>}
          <div className="photo-image">
            <img
              src={`http://www.maciejf.pl/reactApp/${this.props.token}/img/${
                this.state.name
              }`}
              alt=""
            />
            {chosen && <span className="mark" />}
          </div>
          <div className="photo-buttons">
            <button
              className={
                chosen ? "btn-photo-select selected" : "btn-photo-select"
              }
              onClick={this.selectPhoto}
            >
              wybierz
            </button>
            {comment && (
              <button
                className="btn-photo-comment"
                name="edit"
                onClick={this.handleEdit}
              >
                <FontAwesomeIcon icon={faPen} />
              </button>
            )}
            {prints && (
              <button
                className="btn-photo-prints"
                name="prints"
                onClick={this.handleEdit}
              >
                odbitki
              </button>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Photo;