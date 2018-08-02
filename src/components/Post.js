import React, { Component } from 'react';
export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    alert('you clicked the button');
  }

  handleSubmit(event) {
    event.preventDefault();
    alert('you clicked the button');
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="photo">Take a photo</label>
          <input name="photo" type="file" accept="image/*" capture />
          <button type="submit">Upload</button>
        </form>
        <img src="" />
      </div>
    );
  }
}
