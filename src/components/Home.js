import React, { Component } from 'react';
import Post from './Post';
import firebase from '../fire';
import axios from 'axios';
import MainMap from './MainMap';
const database = firebase.database();

export default class Map extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div id="postButton">
          <Post />
        </div>
        <MainMap />
      </div>
    );
  }
}
