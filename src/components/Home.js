import React from 'react';
import Post from './Post';
import MainMap from './MainMap';

export default function Map(props) {
  return (
    <div>
      <div id="postButton">
        <Post {...props} />
      </div>
      <MainMap {...props} />
    </div>
  );
}
