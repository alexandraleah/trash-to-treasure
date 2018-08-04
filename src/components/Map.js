import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Post from './Post';
import axios from 'axios';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class myMap extends Component {
  static defaultProps = {
    center: {
      lat: -34.397,
      lng: 150.644,
    },
    zoom: 15,
  };
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: -34.397,
        lng: 150.644,
      },
      zoom: 15,
      treasures: {},
    };
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
          center: {
            lat: coords.latitude,
            lng: coords.longitude,
          },
        });
      });
      this.map.panTo({ center: this.state.center });
    }
    console.log(this.state);
  }
  render() {
    return (
      <div>
        <div id="postButton">
          <Post />
        </div>
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyA_oI_wKTyYKqNFP3GZAjCu4XOpLreJTjE',
            }}
            defaultCenter={this.state.center}
            defaultZoom={this.props.zoom}
          >
            <AnyReactComponent
              lat={-35.397}
              lng={151.644}
              text={'Kreyser Avrora'}
            />
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}
