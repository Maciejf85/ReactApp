import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import ModalPhoto from "./ModalPhoto";
import LoaderSmall from "../Photograph_Page/LoaderSmall";

class Photo extends React.Component {
  // value = this.props.prints;
  value = 0;

  state = {
    prints: this.props.prints,
    comment: this.props.comments,
    name: this.props.item.name,
    photos: this.props.item.prints,
    photos_cnt: this.value,
    comment_text: this.props.item.comment,
    chosen: this.props.item.chosen,
    prints_items: this.props.item.prints,
    token: this.props.token,
    edit: false,
    edit_type: "",
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
    this.props.update(response, chosenQ);
  };
  updateComponent = () => {
    fetch(
      // "https://cors-anywhere.herokuapp.com/http://maciejf.pl/reactApp/updateData.php",
      "/reactApp/updateData.php",
      {
        method: "POST",
        body: JSON.stringify({
          name: this.state.name,
          comment: this.state.comment_text,
          chosen: this.state.chosen,
          token: this.props.token,
          prints: this.state.prints_items
        })
      }
    )
      .then(resp => {
        if (resp.ok) return resp.json();
        else throw new Error("Błąd sieci!");
      })
      .then(response => {
        if (this.mount) {
          this.countChosen(response);
          this.setState({
            status: false
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleEdit = (message, comment, prints) => {
    if (message.target !== undefined) {
      var type = message.target.name === "prints" ? "prints" : "comment";
    }
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
    } else {
      this.setState({
        edit: !this.state.edit,
        status: false,
        type: type !== "close" ? type : ""
      });
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

  handleModal = () => {
    const { name, comment_text, prints_items, chosen, token } = this.state;
    this.props.click(name, comment_text, prints_items, chosen, token);
  };

  render() {
    const {
      prints,
      comment,
      chosen,
      edit,
      status,
      comment_text,
      prints_items
    } = this.state;

    const count = prints_items.reduce((prev, curr) => {
      return prev + curr.count;
    }, 0);

    return (
      <>
        {edit && <ModalPhoto name={this.state} hide={this.handleEdit} />}
        <div className={`photo-item ${Boolean(chosen) ? "active" : ""}`}>
          {status && <div className="loader_small">{<LoaderSmall />}</div>}
          <div className="photo-image" onClick={this.handleModal}>
            <img
              src={`/reactApp/${this.props.token}/img/${this.state.name}`}
              alt=""
            />
            {Boolean(chosen) && <div className="mark">wybrane</div>}
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
            {comment && Boolean(chosen) && (
              <button
                className={
                  comment_text.length > 0
                    ? "btn-photo-comment active"
                    : "btn-photo-comment"
                }
                name="edit"
                onClick={this.handleEdit}
              >
                <FontAwesomeIcon icon={faPen} />
              </button>
            )}
            {prints && Boolean(chosen) && (
              <button
                className={
                  count > 0 ? "btn-photo-prints active" : "btn-photo-prints"
                }
                name="prints"
                onClick={this.handleEdit}
              >
                odbitki
                <div className={count > 0 ? "count" : "count disabled"}>
                  {count}
                </div>
              </button>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Photo;
