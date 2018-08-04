import React from 'react';
import Path from 'path';
export default function CurrentPin() {
  return <img src={Path.join(__dirname, '/images/you.png')} />;
}
