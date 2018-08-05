import React from 'react';

export default function ErrorPage(props) {
  return (
    <div>
      <h2>Sorry there was an error</h2>
      <p>{props.message}</p>
    </div>
  );
}
