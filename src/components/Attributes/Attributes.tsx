import React from 'react';
import './Attributes.scss';
import { capitalise } from '../../utils/Capitilise';
import { typeColor } from '../../utils/Types';
import type { PokemonDetails, PokemonStat } from '../../types/pokemon';

interface AttributesProps {
  attributes: PokemonDetails;
}

const Attributes = ({ attributes }: AttributesProps) => {
  const { stats, types } = attributes;

  const getAbbreviation = (name: string) => {
    if (name.includes('-')) {
      const nameArray = name.split('-');
      return `${nameArray[0].slice(0, 4)}-${nameArray[1].slice(0, 3)}`;
    }
    return name;
  };

  return (
    <div className="attributes">
      <section className="attribute-section" aria-labelledby="types-heading">
        <h2 id="types-heading">Types</h2>
        <div className="types-list">
          {types.map(type => {
            const backgroundColor = typeColor[type.type.name] || '#4b5d79';
            return (
              <p className="type-pill" style={{ backgroundColor }} key={type.type.name}>
                {capitalise(type.type.name)}
              </p>
            );
          })}
        </div>
      </section>

      <section className="attribute-section" aria-labelledby="attributes-heading">
        <h2 id="attributes-heading">Key Attributes</h2>
        <dl className="attribute-grid">
          <div className="attribute-card">
            <dt>Pokedex ID</dt>
            <dd>{attributes.id}</dd>
          </div>
          <div className="attribute-card">
            <dt>Base XP</dt>
            <dd>{attributes.base_experience}</dd>
          </div>
          <div className="attribute-card">
            <dt>Height</dt>
            <dd>{attributes.height}</dd>
          </div>
          <div className="attribute-card">
            <dt>Weight</dt>
            <dd>{attributes.weight}</dd>
          </div>
        </dl>
      </section>

      <section className="attribute-section" aria-labelledby="stats-heading">
        <h2 id="stats-heading">Base Stats</h2>
        <ul className="stats-list">
          {stats.map((stat: PokemonStat) => {
            const statValue = Math.min(stat.base_stat, 180);
            const progress = `${(statValue / 180) * 100}%`;

            return (
              <li className="stat-row" key={stat.stat.name}>
                <div className="stat-heading">
                  <span>{capitalise(getAbbreviation(stat.stat.name))}</span>
                  <span>{stat.base_stat}</span>
                </div>
                <div className="stat-bar" aria-hidden="true">
                  <span className="stat-bar-fill" style={{ width: progress }} />
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default Attributes;
