import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Post from './components/Post';
import TreasureDetail from './components/treasureDetail';
const style = {
  backgroundColor: 'steelblue',
  color: 'white',
  padding: '10px',
};

export default function App(props) {
  return (
    <div>
      {/*make the header into it's own component*/}
      <header style={style} className="row">
        <div className="col-2">
          <Link to="/">
            <i className="fa fa-home fa-2x" style={style} />
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
