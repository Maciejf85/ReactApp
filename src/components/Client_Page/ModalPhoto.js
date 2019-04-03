import React from "react";

class ModalPhoto extends React.Component {
  state = {
    name: this.props.name.name,
    comment: this.props.name.comment_text,
    prints: [],
    comment_av: false
  };

  handleInput = e => {
    this.setState({
      comment: e.target.value
    });
  };

  saveData = e => {
    const option = e.target.name;

    if (option === "save") {
      this.props.hide(
        "update",
        this.state.comment,
        this.state.prints,
        this.props.name.chosen
      );
    } else if (option === "chosen") {
      this.props.hide("chosen");
    } else {
      this.props.hide("close", "", "");
    }
  };

  render() {
    const { comment } = this.state;
    return (
      <div className="modal-photo">
        <div className="modal-photo-container">
          <div className="modal-image">
            <img
              src={`http://www.maciejf.pl/reactApp/${
                this.props.name.token
              }/img/${this.state.name}`}
              alt=""
            />
          </div>
          <div className="modal-edit">
            <textarea
              className="photo-comment"
              onChange={this.handleInput}
              value={comment}
              placeholder="Napisz swoje uwagi"
            />
          </div>
          <div className="modal-buttons">
            {/* <button
              className="btn-edit photo-btn-chose"
              name="chosen"
              onClick={this.saveData}
            >
              Wybierz
            </button> */}
            <button
              className="btn-edit photo-btn-close"
              name="save"
              onClick={this.saveData}
            >
              Zapisz
            </button>
            <button
              className="btn-edit photo-btn-save"
              name="close"
              onClick={this.saveData}
            >
              Anuluj
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalPhoto;
