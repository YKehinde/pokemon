import React from 'react';
import './Attributes.scss';
import { capitalise } from '../../utils/Capitilise';

const Attributes = ({ attributes }) => {
  const { moves, stats, types } = attributes || {};
  const attributeRow = (key, value) => {
    return (
      <div className="attribute-row" key={key}>
        <h3>{capitalise(key)}</h3>
        <p>{String(value)}</p>
      </div>
    );
  };

  return (
    <div className="attributes">
      <h2>Types</h2>
      <div className="types-list">
        {types.map((type, index) => {
          return <p key={index}>{capitalise(type.type.name)}</p>;
        })}
      </div>

      <h2>Key Attributes</h2>
      {Object.entries(attributes).map(([key, value]) => {
        if (typeof value !== 'object') {
          return attributeRow(key, value);
        }
      })}

      <h2>Stats</h2>
      <div className="stat-row">
        {stats.map((stat, index) => {
          return attributeRow(stat.stat.name, stat.base_stat);
        })}
      </div>

      <h2>Moves</h2>
      <div className="moves">
        <div className="move-list">
          {moves.map((move, index) => {
            return (
              <div>
                <p key={index}>{capitalise(move.move.name)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Attributes;
