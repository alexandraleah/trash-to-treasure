import React, { Component } from 'react';
import firebase from '../fire';
//a library to upload files to firebase
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import StatusIcon from './statusIcon';
import { getUserPosition, lookUpAddress } from '../helperFunctions';

const database = firebase.database();

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //these 2 state fields are utilized by react-firebase-file-uploader
      isUploading: false,
      progress: 0,
      //tracks the image url and image name after upload
      imageURL: '',
      image: '',
      //tracks the combined status of the geolocating and file upload
      status: '',
    };
  }
  //Part of the react-firebase-file-uploader library
  handleUploadStart = () =>
    this.setState({ isUploading: true, progress: 0, status: 'isLoading' });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false, isError: true });
    console.error(error);
  };
  //expanded from the react-firebase-file-uploader
  handleUploadSuccess = async filename => {
    //save image to firebase storage
    try {
      await firebase
        .storage()
        .ref('images')
        .child(filename)
        .getDownloadURL()
        .then(url => this.setState({ imageURL: url }));

      //set local state with file name
      this.setState({
        image: filename,
        progress: 100,
        isUploading: false,
      });
      //get the location using helper function
      const { lat, lng } = await getUserPosition();
      //get the address using helper function
      const address = await lookUpAddress(lat, lng);
      //create a new instance in the database
      var newTreasure = await database.ref('treasures').push();
      //upload the url, lat and long, address and data posted to the database
      newTreasure.set({
        imageURL: this.state.imageURL,
        lat: lat,
        long: lng,
        approxAddress: address,
        postedDate: new Date().toString(),
      });
      //get the key/id of the new instance
      var treasureKey = await newTreasure.key;
      //set the status to success
      await this.setState({ status: 'success' });
      //push the new instances page to history
      this.props.history.push(`/treasures/${treasureKey}`);
    } catch (error) {
      //if there is an error set status to error
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
              backgroundColor: '#2788c5',
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
