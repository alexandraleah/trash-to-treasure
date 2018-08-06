import React from 'react';
import Post from './Post';
import MainMap from './MainMap';
import ButterToast from 'butter-toast';

export default function Map(props) {
  return (
    <div>
      <div id="postButton">
        <Post {...props} />
      </div>
      <MainMap {...props} />
      <ButterToast trayPosition="bottom-right" />
    </div>
  );
}
