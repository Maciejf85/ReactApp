import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleRight,
  faArrowCircleLeft
} from "@fortawesome/free-solid-svg-icons";

class MainModal extends React.Component {
  state = {
    name: this.props.name,
    index: this.props.index,
    length: this.props.length,
    chosen: Boolean(this.props.chosen)
  };

  componentDidUpdate() {
    console.log("MainModal updated");
    if (this.state.name !== this.props.name) {
      this.setState({
        name: this.props.name,
        index: this.props.index,
        length: this.props.length,
        chosen: Boolean(this.props.chosen)
      });
    }
    if (this.state.chosen !== this.props.chosen) {
      console.log("MAIN MODAL chosen !== chosen");
    }
  }
  componentDidMount() {
    document.addEventListener("keyup", this.props.slider);
  }
  saveData = () => {
    this.props.save(!this.state.chosen, this.props.name, this.props.token);

    this.setState({
      chosen: !this.state.chosen
    });
  };

  render() {
    return (
      <div className="modal-photo">
        <div className="main-modal-container">
          <img
            src={`http://www.maciejf.pl/reactApp/${this.props.token}/img/${
              this.state.name
            }`}
            alt=""
          />
          {this.state.chosen && <span className="mark-big" />}
          <button
            className="arrow left"
            name="prev"
            onClick={this.props.slider}
          >
            <FontAwesomeIcon icon={faArrowCircleLeft} className="icon" />
          </button>
          <button
            className="arrow right"
            name="next"
            onClick={this.props.slider}
          >
            <FontAwesomeIcon icon={faArrowCircleRight} className="icon" />
          </button>
          <div className="main-modal-buttons">
            <div className="item" />
            <div className="item">
              <div>
                zdjęcie {this.state.index} / {this.state.length}
              </div>
            </div>
            <div className="item right">
              <button
                className="btn-edit photo-btn-chose"
                name="chosen"
                onClick={this.saveData}
              >
                Wybierz
              </button>
              <button
                className="btn-edit modal-btn-close"
                name="close"
                onClick={this.props.close}
              >
                zamknij
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainModal;
