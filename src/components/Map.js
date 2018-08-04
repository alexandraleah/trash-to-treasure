import React, { Component } from 'react';
import MapContainer from './MapContainer';
import Post from './Post';
import firebase from '../fire';
const database = firebase.database();

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { lat: -34.397, lng: 150.644, treasures: {} };
  }

  async componentDidMount() {
    /* Create reference to messages in Firebase Database */
    let treasuresRef = database.ref('treasures');
    treasuresRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let treasure = { item: snapshot.val(), id: snapshot.key };
      this.setState({ treasures: { ...this.state, treasure } });
    });
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coords = pos.coords;
        this.setState({
          lat: coords.latitude,
          lng: coords.longitude,
        });
      });
    }
    console.log(this.state);
  }
  render() {
    return (
      <div>
        <h1>Trash to Treasure</h1>
        <Post />
        <MapContainer lat={this.state.lat} lng={this.state.lng} />
      </div>
    );
  }
}
