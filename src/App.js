import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Post from './components/Post';
import TreasureDetail from './components/treasureDetail';
import TreasureHeader from './components/header';

export default function App(props) {
  return (
    <div>
      <TreasureHeader />
      <Switch>
        <Route exact path="/post" component={Post} />
        <Route
          exact
          path="/treasures/:id"
          render={props => <TreasureDetail {...props} />}
        />
        <Route path="/" render={props => <Home {...props} />} />
      </Switch>
    </div>
  );
}
