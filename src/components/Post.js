import React, { Component } from 'react';
import firebase from '../fire';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import axios from 'axios';
import StatusIcon from './statusIcon';

const database = firebase.database();

function getUserPosition() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
      progress: 0,
      imageURL: '',
      image: '',
      status: '',
    };
  }

  lookUpAddress = async (lat, long) => {
    const latlng = lat.toString() + ',' + long.toString();
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=AIzaSyCjxnaxhQdSIlkUO_L6KZvYAJTy4Uasnw4
      `
    );
    return response.data.results[0].formatted_address;
  };

  handleUploadStart = () =>
    this.setState({ isUploading: true, progress: 0, status: 'isLoading' });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false, isError: true });
    console.error(error);
  };

  handleUploadSuccess = async filename => {
    //save image to firebase storage (seperate than the database)
    try {
      await firebase
        .storage()
        .ref('images')
        .child(filename)
        .getDownloadURL()
        .then(url => this.setState({ imageURL: url }));

      //set local state
      this.setState({
        image: filename,
        progress: 100,
        isUploading: false,
      });
      //get geolocation
      //if gelocation is not available need to have a fallback option with an else block. Possibly prompt user to enter in a place or select a point on the map. but for now we will just write a message to the console
      //maybe give them a choice whether to geolocate if they have the possiblity? that way if they are home posting it later or something. but then you will need a new page for it.
      //also if you have a progress bar it could show the progress for the combined uploading and geolocating.
      //look into how to do that.
      //when i save in the database do I want to shrink the photos first? maybe i don't need to?
      if (navigator && navigator.geolocation) {
        const pos = await getUserPosition();
        const coords = pos.coords;
        const lat = Number(coords.latitude);
        const long = Number(coords.longitude);
        //should catch errors either call an error function callback or make into a promise that you can await. The secon would be a good learning experience.
        const address = await this.lookUpAddress(lat, long);

        var newTreasure = await database.ref('treasures').push();
        newTreasure.set({
          imageURL: this.state.imageURL,
          lat: lat,
          long: long,
          approxAddress: address,
          postedDate: new Date().toString(),
        });

        var treasureKey = await newTreasure.key;
        await this.setState({ status: 'success' });
        this.props.history.push(`/treasures/${treasureKey}`);
      } else {
        const errorMessage =
          'Your browser does not support geolocation. At this time, without geolocation you cannot upload images.';
        console.log('there is no support for geolocation');
        this.setState({ status: 'error' });
      }
    } catch (error) {
      console.log('there was an error', error);
      this.setState({ status: 'error' });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <CustomUploadButton
            accept="image/*"
            name="photo"
            randomizeFilename
            capture
            storageRef={firebase.storage().ref('images')}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
            style={{
              backgroundColor: 'steelblue',
              color: 'white',
              padding: 10,
              borderRadius: 4,
            }}
          >
            <StatusIcon status={this.state.status} />&nbsp; Add Treasure
          </CustomUploadButton>
        </form>
      </div>
    );
  }
}
