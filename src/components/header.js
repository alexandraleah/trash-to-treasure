import React from 'react';
import { Link } from 'react-router-dom';

export default function TreasureHeader(props) {
  return (
    <div>
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
    </div>
  );
}
