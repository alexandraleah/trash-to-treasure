import React from 'react';
import { Link } from 'react-router-dom';
import {
  BrowserRouter as Router,
  withRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import GoogleMap from './components/Map';
import Post from './components/Post';

export default function App(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/post" component={Post} />
        <Route path="/" component={GoogleMap} />
      </Switch>
    </Router>
  );
}
