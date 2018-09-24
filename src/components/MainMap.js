import React, { Component } from 'react';
import { connect } from 'react-redux';
import { locate } from '../store/map';

//library for using google maps with react
import GoogleMapReact from 'google-map-react';
import CurrentPin from './currentPin';
import axios from 'axios';
import TreasurePin from './TreasurePin';
import google_api_key from '../keys';
//remember to use prop types, go back and add this in

class MainMap extends Component {
  constructor() {
    super();
    this.state = {
      treasures: {},
      currentTreasure: {},
    };
    this.onChildClick = this.onChildClick.bind(this);
  }

  // static defaultProps = {
  //   center: {
  //     lat: 42.3539,
  //     lng: -71.1337,
  //   },
  //   zoom: 15,
  // };
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
    this.props.getUserPosition();

    // if a treasure is on state center to that position
    //but also provide a button so that the user can locate themselves and recenter around that
    //probably putting all of this into store state would make sense
  }
  //when one of the map icons is clicked set the state to the current item and push the page for that item on to the history
  onChildClick = async (key, childProps) => {
    await this.setState({ currentTreasure: childProps });
    this.props.history.push(
      `/treasures/${this.state.currentTreasure.treasure}`
    );
  };

  render() {
    return (
      // Important! Always set the container height explicitly

      <div style={{ height: '90vh', width: '100%' }}>
        {/* i think this is the problem here - not with the geolocation */}
        <GoogleMapReact
          bootstrapURLKeys={{
            key: google_api_key,
          }}
          defaultCenter={this.props.center}
          center={this.props.center}
          defaultZoom={this.props.zoom}
          onChildClick={this.onChildClick}
          onChildMouseEnter={this.onChildMouseEnter}
          onChildMouseLeave={this.onChildMouseLeave}
        >
          {/* check whether the user's position has been obtained and if it has place a pin at the current position*/}
          {this.state.located ? (
            <CurrentPin
              lat={this.props.center.lat}
              lng={this.props.center.lng}
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

const mapStateToProps = state => {
  return {
    center: state.map.center,
    zoom: state.map.zoom,
    located: state.map.located,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserPosition: () => {
      dispatch(locate());
    },
  };
};

export default (MainMap = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMap));
