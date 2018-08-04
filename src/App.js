import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import GoogleMap from './components/Map';
import Post from './components/Post';

export default function App(props) {
  return (
    <div>
      <header>
        <h1>Trash to Treasure</h1>
      </header>
      <Switch>
        <Route exact path="/post" component={Post} />
        <Route path="/" component={GoogleMap} />
      </Switch>
    </div>
  );
}
