import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Path from 'path';
import CurrentPin from './currentPin';
import axios from 'axios';
import TreasurePin from './TreasurePin';
import InfoBox from './InfoBox';

//refractor this so both components use the same function
function getUserPosition() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

class MainMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {},
      treasures: {},
      zoom: 15,
      infoOn: false,
      currentTreasure: {},
    };
    this.setPinAsCenter = this.setPinAsCenter.bind(this);
  }

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 15,
  };
  async componentDidMount() {
    try {
      console.log('component mounted');
      const response = await axios.get(
        `https://trash-to-treasur-1533175223809.firebaseio.com/treasures.json`
      );
      const treasures = response.data;
      const pos = await getUserPosition();
      const coords = pos.coords;
      const lat = Number(coords.latitude);
      const lng = Number(coords.longitude);
      this.setState({ center: { lat: lat, lng: lng }, treasures });
      console.log('state after update', this.state);
    } catch (error) {
      console.log('could not get data or user location', error);
    }
  }
  setPinAsCenter() {
    alert('set pin as center called!');
  }
  _onChildClick = (key, childProps) => {
    this.setState({ infoOn: true, currentTreasure: childProps });
  };
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyA_oI_wKTyYKqNFP3GZAjCu4XOpLreJTjE' }}
          defaultCenter={this.props.center}
          center={this.state.center}
          defaultZoom={this.state.zoom}
          onChildClick={this._onChildClick}
          onChildMouseEnter={this.onChildMouseEnter}
          onChildMouseLeave={this.onChildMouseLeave}
        >
          <CurrentPin
            lat={this.state.center.lat}
            lng={this.state.center.lng}
            onClick={() => this.setPinAsCenter()}
          />
          {Object.keys(this.state.treasures).map(key => (
            <TreasurePin
              onClick={() => this.setPinAsCenter(key)}
              onChildMouseEnter={this.onChildMouseEnter}
              onChildMouseLeave={this.onChildMouseLeave}
              handlePinClick={this.handleOnClick}
              treasure={key}
              key={this.state.treasures[key].imageURL}
              lat={this.state.treasures[key].lat}
              lng={this.state.treasures[key].long}
              imageURL={this.state.treasures[key].imageURL}
              date={this.state.treasures[key].postedDate}
            />
          ))}
          {this.state.infoOn === true ? (
            <InfoBox
              lat={this.state.lat}
              lng={this.state.lng}
              currentTreasure={this.state.currentTreasure}
            />
          ) : null}
        </GoogleMapReact>
      </div>
    );
  }
}

export default MainMap;
