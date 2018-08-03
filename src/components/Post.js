import React, { Component } from 'react';
import firebase from '../fire';
import FileUploader from 'react-firebase-file-uploader';
const database = firebase.database();

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
      progress: 0,
      imageURL: '',
    };
  }

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = async filename => {
    //save image to firebase storage (seperate than the database)
    firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ imageURL: url }));

    //make current data
    let postingDateObject = new Date();

    //set local state
    this.setState({
      image: filename,
      progress: 100,
      isUploading: false,
    });

    //get geolocation
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coords = pos.coords;
        const lat = Number(coords.latitude);
        const long = Number(coords.longitude);
        var newTreasure = database.ref('treasures').push();
        newTreasure.set({
          imageURL: this.state.imageURL,
          lat: lat,
          long: long,
          postedDate: new Date().toString(),
        });
      });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {/* for mvp I think I will just have people post the image without any comments or description and then show it on the map with the time posted. will add these other fields if I have time. */}
          {/* <label htmlFor="tags">tags</label>
          <input
            type="text"
            name="tags"
            placeholder="example: chair, furniture"
          />
          <label htmlFor="description">description</label>
          <textarea name="description" /> */}

          <label htmlFor="photo">Take a photo</label>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.imageURL && <img src={this.state.imageURL} />}

          <FileUploader
            accept="image/*"
            name="photo"
            capture
            randomizeFilename
            storageRef={firebase.storage().ref('images')}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
        </form>
      </div>
    );
  }
}
