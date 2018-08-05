import React from 'react';
import Path from 'path';
export default function TreasurePin() {
  return <img src={Path.join(__dirname, '/images/treasure.png')} alt="pin" />;
}
