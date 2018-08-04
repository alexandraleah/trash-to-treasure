import React, { Component } from 'react';
import MapContainer from './MapContainer';
import Post from './Post';
import firebase from '../fire';
import axios from 'axios';
import Marker from './Marker';
const database = firebase.database();

export default class Map extends Component {
  renderChildren() {
    const { children } = this.props;
    if (!children) return;
    return React.Children.map(children, c => {
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation,
      });
    });
  }
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
    const pos = { lat: 37.759703, lng: -122.428093 };
    return (
      <div>
        <div id="postButton">
          <Post />
        </div>
        {/* //   {Object.keys(this.state.treasures).map(key => ( */}
        {/* //     <img src="{this.state.treasures[key].imageURL}" />
      //   ))} */}
        <MapContainer lat={this.state.lat} lng={this.state.lng}>
          <Marker />
          <Marker position={pos} />
        </MapContainer>
      </div>
    );
  }
}
