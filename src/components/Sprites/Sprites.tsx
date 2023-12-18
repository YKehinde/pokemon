import React from 'react';
import './Sprites.scss';

const Sprites = ({ sprites }) => {
  return (
    <div className="sprite-list">
      <h2>Sprites</h2>
      {Object.keys(sprites).map((key, index) => {
        if (sprites[key] !== null && typeof sprites[key] === 'string') {
          return <img className="sprite" key={index} src={sprites[key]} alt={key} />;
        }
      })}
    </div>
  );
};

export default Sprites;
