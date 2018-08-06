import React, { Component } from 'react';
//library for using google maps with react
import GoogleMapReact from 'google-map-react';
import CurrentPin from './currentPin';
import axios from 'axios';
import TreasurePin from './TreasurePin';
import { getUserPosition } from '../helperFunctions';
import ButterToast, { CinnamonSugar } from 'butter-toast';

class MainMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 42.3539,
        lng: -71.1337,
      },
      treasures: {},
      zoom: 15,
      currentTreasure: {},
      located: false,
    };
    this.onChildClick = this.onChildClick.bind(this);
    this.noLocation = this.noLocation.bind(this);
  }

  static defaultProps = {
    center: {
      lat: 42.3539,
      lng: -71.1337,
    },
    zoom: 15,
  };
  async componentDidMount() {
    //first get the treasures from the database
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

    let userPos = await getUserPosition();
    if (userPos) {
      this.setState({ center: userPos, located: true });
    } else {
      this.noLocation();
    }
  }
  //when one of the map icons is clicked set the state to the current item and push the page for that item on to the history
  onChildClick = async (key, childProps) => {
    await this.setState({ currentTreasure: childProps });
    this.props.history.push(
      `/treasures/${this.state.currentTreasure.treasure}`
    );
  };

  noLocation() {
    ButterToast.raise({
      content: ({ toastId, dismiss }) => (
        <div>
          Geolocation is not enabled on your browser. You will not be able to
          post photos.
        </div>
      ),
      toastTimeout: 5000, // default: 3000 ms
    });
  }

  render() {
    return (
      // Important! Always set the container height explicitly

      <div style={{ height: '90vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyA_oI_wKTyYKqNFP3GZAjCu4XOpLreJTjE',
          }}
          defaultCenter={this.props.center}
          center={this.state.center}
          defaultZoom={this.state.zoom}
          onChildClick={this.onChildClick}
          onChildMouseEnter={this.onChildMouseEnter}
          onChildMouseLeave={this.onChildMouseLeave}
        >
          {/* check whether the user's position has been obtained and if it has place a pin at the current position*/}
          {this.state.located ? (
            <CurrentPin
              lat={this.state.center.lat}
              lng={this.state.center.lng}
            />
          ) : null}
          {/* place a pin for each item */}
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
