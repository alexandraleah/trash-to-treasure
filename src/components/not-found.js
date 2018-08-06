import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container">
      <p>This page or item is no longer available</p>
      <Link to="/">
        <button className="btn btn-primary myBtn">Take me home</button>
      </Link>
    </div>
  );
};

export default NotFound;
