import React, { Component } from 'react';
/*global google*/
export default class MapContainer extends Component {
  shouldComponentUpdate() {
    return false;
  }
  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      center: { lat: this.props.lat, lng: this.props.lng },
      zoom: 15,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.map.panTo({ lat: nextProps.lat, lng: nextProps.lng });
  }
  render() {
    return <div id="map" ref="map" />;
  }
}
