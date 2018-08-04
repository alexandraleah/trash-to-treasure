import React, { Component } from 'react';
import MapContainer from './MapContainer';
import Post from './Post';
import firebase from '../fire';
import axios from 'axios';
const database = firebase.database();

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { lat: -34.397, lng: 150.644, treasures: {} };
  }

  async componentDidMount() {
    const response = await axios.get(
      `https://trash-to-treasur-1533175223809.firebaseio.com/treasures.json`
    );
    const treasures = response.data;
    this.setState({ treasures: treasures });

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
        {Object.keys(this.state.treasures).map(key => (
          <img src={this.state.treasures[key].imageURL} />
        ))}
        <MapContainer lat={this.state.lat} lng={this.state.lng} />
      </div>
    );
  }
}
