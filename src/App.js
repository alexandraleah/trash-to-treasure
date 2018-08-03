import React from 'react';
import Map from '../src/components/Map';
import Post from './components/Post';
export default function App(props) {
  return (
    <div>
      <h1>Allston Christmas</h1>
      <h2>Find free stuff on the street</h2>
      <Post />
      <Map />
    </div>
  );
}
