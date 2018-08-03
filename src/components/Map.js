import React, { Component } from 'react';
import MapContainer from './MapContainer';
import Post from './Post';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { lat: -34.397, lng: 150.644 };
  }
  componentDidMount() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coords = pos.coords;
        this.setState({
          lat: coords.latitude,
          lng: coords.longitude,
        });
      });
    }
  }
  render() {
    return (
      <div>
        <Post />
        <MapContainer
          lat={this.state.lat}
          lng={this.state.lng}
          style={{
            position: 'fixed',
            zIndex: -1,
          }}
        />
      </div>
    );
  }
}
