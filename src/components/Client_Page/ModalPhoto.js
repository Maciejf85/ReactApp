import React from "react";

class ModalPhoto extends React.Component {
  state = {
    name: this.props.name.name,
    comment: this.props.name.comment_text,
    prints: [],
    editComment: this.props.editComment,
    editPrints: this.props.editPrints,
    count: 1,
    size: "10x15",
    paper: "matowy"
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
    } else {
      this.props.hide("close", "", "");
    }
  };

  handleAddPrint = () => {
    const print = {
      name: this.state.name,
      size: this.state.size,
      paper: this.state.paper,
      count: this.state.count
    };
    let prints = this.state.prints;
    prints.push(print);

    this.setState({
      prints: prints,
      count: 1
    });
  };
  handlePrintsCount = e => {
    const value = e.target.name === "add" ? 1 : -1;
    this.setState({
      count: this.state.count + value
    });
  };

  inputForm = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { comment, size, paper, count, prints } = this.state;
    return (
      <div className="modal-photo">
        <div className="modal-photo-container">
          <div className="modal-image">
            <img
              src={`/reactApp/${this.props.name.token}/img/${this.state.name}`}
              alt=""
            />
          </div>
          <div className="modal-edit">
            {this.props.name.prints && (
              <div className="photo-prints">
                <div className="photo-prints-title">odbitki</div>
                <div className="prints-input">
                  <select
                    className="select-type"
                    name="size"
                    value={size}
                    onChange={this.inputForm}
                  >
                    <option value="10x15">10x15</option>
                    <option value="13x18">13x18</option>
                    <option value="15x21">15x21</option>
                    <option value="20x30">20x30</option>
                  </select>
                  <select
                    className="select-type"
                    name="paper"
                    value={paper}
                    onChange={this.inputForm}
                  >
                    <option value="matowy">matowy</option>
                    <option value="błyszczący">błyszczący</option>
                    <option value="jedwabny">jedwabny</option>
                    <option value="metalik">metalik</option>
                  </select>
                  <button
                    className="changeValue"
                    onClick={this.handlePrintsCount}
                    name="subs"
                  >
                    -
                  </button>
                  <div className="counter">{count}</div>
                  <button
                    className="changeValue"
                    onClick={this.handlePrintsCount}
                    name="add"
                  >
                    +
                  </button>
                  <button
                    className="btn-addPrints"
                    onClick={this.handleAddPrint}
                  >
                    Dodaj
                  </button>
                </div>

                <div className="printsList">
                  <ul>
                    <li className="strong">
                      <div>rozmiar</div> <div>papier</div>
                      <div>ilość</div>
                      <div />
                    </li>
                    {prints.map((item, index) => (
                      <li key={index}>
                        <div>{item.size}</div>
                        <div>{item.paper}</div>
                        <div>{item.count}</div>
                        <div>
                          <button className="btn-remove">usuń</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {this.props.name.comment && (
              <textarea
                className="photo-comment"
                onChange={this.handleInput}
                value={comment}
                placeholder="Napisz swoje uwagi"
              />
            )}
          </div>
          <div className="modal-buttons">
            {this.props.name.comment && (
              <button
                className="btn-edit photo-btn-close"
                name="save"
                onClick={this.saveData}
                disabled={!this.props.name.comment}
              >
                Zapisz
              </button>
            )}
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
