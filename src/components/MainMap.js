import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import CurrentPin from './currentPin';
import axios from 'axios';
import TreasurePin from './TreasurePin';
import { getUserPosition } from '../helperFunctions';

class MainMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 0,
        lng: 0,
      },
      treasures: {},
      zoom: 15,
      currentTreasure: {},
    };
    this._onChildClick = this._onChildClick.bind(this);
  }

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 15,
  };
  async componentDidMount() {
    //first load google map
    try {
      const response = await axios.get(
        `https://trash-to-treasur-1533175223809.firebaseio.com/treasures.json`
      );
      const treasures = response.data;

      this.setState({ treasures });
      console.log('state after update', this.state);
    } catch (error) {
      console.log('could not get data', error);
    }

    //then load your current location

    const center = await getUserPosition();
    this.setState({ center: center });
    //if geolocation is not enabled should still continue loading the rest of the content
    //then load icons
  }

  _onChildClick = async (key, childProps) => {
    await this.setState({ currentTreasure: childProps });
    this.props.history.push(
      `/treasures/${this.state.currentTreasure.treasure}`
    );
  };
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '90vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyA_oI_wKTyYKqNFP3GZAjCu4XOpLreJTjE' }}
          defaultCenter={this.props.center}
          center={this.state.center}
          defaultZoom={this.state.zoom}
          onChildClick={this._onChildClick}
          onChildMouseEnter={this.onChildMouseEnter}
          onChildMouseLeave={this.onChildMouseLeave}
        >
          {/* find another solution instead of setting the default location to 0,0. possibly with boolean on state */}
          {this.state.lat && this.state.lng ? (
            <CurrentPin
              lat={this.state.center.lat}
              lng={this.state.center.lng}
            />
          ) : null}

          {Object.keys(this.state.treasures).map(key => (
            <TreasurePin
              treasure={key}
              key={this.state.treasures[key].imageURL}
              lat={this.state.treasures[key].lat}
              lng={this.state.treasures[key].long}
            />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default MainMap;
