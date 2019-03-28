import React from "react";
import Photo from "./Photo-item";

class Main extends React.Component {
  state = {
    photos: JSON.parse(this.props.photos),
    comments: this.props.comments,
    prints: this.props.prints
  };
  render() {
    const { photos } = this.state;
    return (
      <div className="client-photo-container">
        {photos.map(item => (
          <div key={item.name}>
            <Photo
              item={item}
              prints={this.state.prints}
              comments={this.state.comments}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default Main;
