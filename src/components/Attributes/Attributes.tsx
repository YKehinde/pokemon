import React from 'react';
import './Attributes.scss';
import { capitalise } from '../../utils/Capitilise';
import { typeColor } from '../../utils/Types';

const Attributes = ({ attributes }) => {
  const { moves, stats, types } = attributes || {};
  const attributeRow = (key, value) => {
    return (
      <div className="key-attribute--row" key={key}>
        <h3>{capitalise(getAbbreviation(key))}</h3>
        <p>{String(value)}</p>
      </div>
    );
  };

  const getAbbreviation = (name: string) => {
    if (name.includes('-')) {
      const nameArray = name.split('-');
      return `${nameArray[0].slice(0, 4)}-${nameArray[1].slice(0, 3)}`;
    }
    return name;
  };

  return (
    <div className="attributes">
      <h2>Types</h2>
      <div className="types-list">
        {types.map((type, index) => {
          const backgroundColor = typeColor[type.type.name];
          return (
            <p className="type-pill" style={{ backgroundColor }} key={index}>
              {capitalise(type.type.name)}
            </p>
          );
        })}
      </div>

      <h2>Key Attributes</h2>
      <div className="key-attribute--container">
        {attributeRow('ID', attributes.id)}
        {attributeRow('XP', attributes.base_experience)}
        {attributeRow('height', attributes.height)}
        {attributeRow('weight', attributes.weight)}
      </div>

      <h2>Stats</h2>
      <div className="key-attribute--container">
        {stats.map(stat => {
          // console.log(stat);
          return attributeRow(stat.stat.name, stat.base_stat);
        })}
      </div>

      {/* <h2>Moves</h2>
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
      </div> */}
    </div>
  );
};

export default Attributes;
