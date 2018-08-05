import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Post from './components/Post';
import TreasureDetail from './components/treasureDetail';

export default function App(props) {
  return (
    <div>
      {/*make the header into it's own component*/}
      <header className="row">
        <div className="col-2">
          <Link to="/">
            <i className="fa fa-home fa-2x" />
          </Link>
        </div>
        <div className="col">
          <h3 className="navbar-brand">Trash to Treasure</h3>
        </div>
      </header>
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
