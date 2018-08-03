import React, { Component } from 'react';
import fire from '../fire';
export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { photos: [], selectedPhoto: null };
  }
  componentWillMount() {
    /* Create reference to messages in Firebase Database */
    let photosRef = fire
      .database()
      .ref('photos')
      .orderByKey()
      .limitToLast(100);
    photosRef.on('child_added', snapshot => {
      /* Update React state when photo is added at Firebase Database */
      let selectedPhoto = { image: snapshot.val(), id: snapshot.key };
      this.setState({ photos: [selectedPhoto].concat(this.state.photos) });
    });
  }
  changeHandler = event => {
    this.setState({ selectedPhoto: event.target.files[0] });
  };

  uplaodHandler = event => {
    event.preventDefault();
    fire
      .database()
      .ref('photos')
      .push(this.inputEl.files);
    this.inputEl.files = '';
    console.log(this.state.selectedPhoto);
  };

  // handleSubmit(event) {
  //   event.preventDefault();
  //   alert('you clicked the button');
  // }

  render() {
    return (
      <div>
        <form onSubmit={this.uplaodHandler.bind(this)}>
          <input
            type="file"
            accept="image/*"
            capture
            onChange={this.changeHandler.bind(this)}
            ref={el => (this.inputEl = el)}
          />
          <input type="submit" />
          <ul>
            {/* Render the list of messages */
            this.state.photos.map(photo => (
              <li key={photo.id}>{photo.text}</li>
            ))}
          </ul>
        </form>
        {/* <form onSubmit={this.handleSubmit}>
          <label htmlFor="photo">Take a photo</label>
          <input name="photo" type="file" accept="image/*" capture />
          <button type="submit">Upload</button>
        </form>
        <img src="" /> */}
      </div>
    );
  }
}
