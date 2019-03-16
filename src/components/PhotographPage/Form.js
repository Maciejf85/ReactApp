import React from "react";

class Form extends React.Component {
  state = {
    text: "",
    password: ""
  };

  render() {
    const { text, password } = this.state;

    return (
      <div>
        <form>
          <div className="inputBox">
            <input
              type="text"
              onChange={this.inputForm}
              value={text}
              required
            />
            <label>Imię</label>
          </div>

          <div className="inputBox">
            <input
              type="text"
              onChange={this.inputForm}
              value={password}
              required
            />
            <label>Nazwisko</label>
          </div>

          <div className="inputBox">
            <input
              type="text"
              onChange={this.inputForm}
              value={password}
              required
            />
            <label>Email</label>
          </div>

          <div className="inputBox">
            <input
              type="password"
              onChange={this.inputForm}
              value={password}
              required
            />
            <label>Cena za dodatkowe</label>
          </div>

          <div className="inputBox">
            <input
              type="password"
              onChange={this.inputForm}
              value={password}
              required
            />
            <label>Hasło</label>
          </div>

          <div className="inputBox">
            <input
              type="password"
              onChange={this.inputForm}
              value={password}
              required
            />
            <label>Hasło</label>
          </div>

          <div className="inputBox">
            <input
              type="password"
              onChange={this.inputForm}
              value={password}
              required
            />
            <label>Hasło</label>
          </div>

          <div className="inputBox">
            <input
              type="password"
              onChange={this.inputForm}
              value={password}
              required
            />
            <label>Hasło</label>
          </div>

          <div className="inputBox">
            <input
              type="file"
              encType="multipart/form-data"
              onChange={this.inputForm}
              value={password}
              multiple
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
