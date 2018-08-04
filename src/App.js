import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Post from './components/Post';

const style = {
  backgroundColor: 'steelblue',
  color: 'white',
  padding: '10px',
  textAlign: 'center',
};

export default function App(props) {
  return (
    <div>
      <header style={style}>
        <h1>Trash to Treasure</h1>
      </header>
      <Switch>
        <Route exact path="/post" component={Post} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}
