import React, { Component } from 'react';
/*global google*/

const style = {
  width: '100vw',
  height: '100vh',
};

export default class MapContainer extends Component {
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
    return (
      <div style={style}>
        <div id="map" ref="map" />
        {this.renderChildren()}
      </div>
    );
  }
}
