import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

class Photo extends React.Component {
  state = {
    prints: this.props.prints,
    comment: this.props.comments,
    name: this.props.item.name,
    comment_text: this.props.item.comment,
    prints_items: []
  };

  render() {
    console.log(this.props);
    const { prints, comment, src, name } = this.state;
    return (
      <>
        <div className="photo-item">
          {name}
          <div className="photo-image">
            <img
              src={`http://www.maciejf.pl/reactApp/9319c9633832e96f019c30b364522b1a/img/${
                this.state.name
              }`}
              alt=""
            />
          </div>
          <div className="photo-buttons">
            <button className="btn-photo-select">wybierz</button>
            {comment && (
              <button className="btn-photo-comment">
                <FontAwesomeIcon icon={faPen} />
              </button>
            )}
            {prints && <button className="btn-photo-prints">odbitki</button>}
          </div>
        </div>
      </>
    );
  }
}

export default Photo;
