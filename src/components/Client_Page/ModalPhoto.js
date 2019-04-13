import React from "react";

class ModalPhoto extends React.Component {
  state = {
    name: this.props.name.name,
    comment: this.props.name.comment_text,
    prints: this.props.name.photos,
    editComment: this.props.editComment,
    editPrints: this.props.editPrints,
    type: this.props.name.type,
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
    let prints = this.state.prints;
    let val;
    let count = 0;
    if (prints.length > 0) {
      val = prints.findIndex(
        item => item.size === this.state.size && item.paper === this.state.paper
      );

      if (val > -1) {
        count = prints[val].count;
        prints.splice(val, 1);
      }
    }
    const print = {
      name: this.state.name,
      size: this.state.size,
      paper: this.state.paper,
      count: this.state.count + count
    };
    prints.push(print);

    this.setState({
      prints: prints,
      count: 1
    });
  };
  handlePrintsCount = e => {
    const operation = e.target.name === "add" ? 1 : -1;
    let counter = this.state.count;
    let value = counter + operation < 1 ? 1 : counter + operation;
    this.setState({
      count: value
    });
  };
  removePrints = e => {
    const number = e.target.name;
    let prints = this.state.prints;
    prints.splice(number, 1);
    this.setState({
      prints
    });
  };

  inputForm = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { comment, size, paper, count, prints, type } = this.state;

    return (
      <div className="modal-photo">
        <div className="modal-photo-container">
          <div className="modal-image">
            <img
              src={`http://maciejf.pl/reactApp/${this.props.name.token}/img/${
                this.state.name
              }`}
              alt=""
            />
          </div>
          <div className="modal-edit">
            {this.props.name.prints && (
              <div
                className={
                  type === "prints" ? "photo-prints" : "photo-prints disable"
                }
              >
                <div className="photo-prints-title">odbitki</div>
                {type === "prints" && (
                  <div className="prints-input ">
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
                )}

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
                          {type === "prints" && (
                            <button
                              name={index}
                              className="btn-remove"
                              onClick={this.removePrints}
                            >
                              usuń
                            </button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {this.props.name.comment && (
              <textarea
                className={
                  type === "prints" ? "photo-comment disable" : "photo-comment"
                }
                onChange={this.handleInput}
                value={comment}
                placeholder="Napisz swoje uwagi"
                readOnly={!(type === "comment")}
              />
            )}
          </div>
          <div className="modal-buttons">
            <button
              className="btn-edit photo-btn-close"
              name="save"
              onClick={this.saveData}
              // disabled={!this.props.name.comment}
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
