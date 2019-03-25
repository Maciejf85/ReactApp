import React from "react";

class NotFound extends React.Component {
  render() {
    return (
      <div className="wrongPage">
        <div className="error404">
          <h5>ERROR 404</h5>
          <div>ooops, coś poszło </div>
          <div>nie tak :/ </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
