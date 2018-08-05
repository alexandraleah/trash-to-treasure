import React, { Component } from 'react';
import firebase from '../fire';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import axios from 'axios';
import StatusIcon from './statusIcon';
import { getUserPosition } from '../helperFunctions';

const database = firebase.database();

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
      //get location
      const { lat, lng } = await getUserPosition();
      const address = await this.lookUpAddress(lat, lng);

      var newTreasure = await database.ref('treasures').push();
      newTreasure.set({
        imageURL: this.state.imageURL,
        lat: lat,
        long: lng,
        approxAddress: address,
        postedDate: new Date().toString(),
      });

      var treasureKey = await newTreasure.key;
      await this.setState({ status: 'success' });
      this.props.history.push(`/treasures/${treasureKey}`);
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
