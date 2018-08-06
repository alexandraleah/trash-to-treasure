import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import TreasureDetail from './components/treasureDetail';
import TreasureHeader from './components/header';
import NotFound from './components/not-found';

export default function App(props) {
  return (
    <div>
      <TreasureHeader />
      <Switch>
        <Route exact path="/" render={props => <Home {...props} />} />
        <Route
          path="/treasures/:id"
          render={props => <TreasureDetail {...props} />}
        />
        <Route path="/not-found" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}
