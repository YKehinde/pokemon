import React from 'react';
import './Sprites.scss';
import { capitalise } from '../../utils/Capitilise';

interface SpritesProps {
  sprites: Record<string, string | null | object>;
}

const Sprites = ({ sprites }: SpritesProps) => {
  const spriteEntries = Object.entries(sprites).filter(
    (sprite): sprite is [string, string] => typeof sprite[1] === 'string' && Boolean(sprite[1]),
  );

  return (
    <section className="sprite-section" aria-labelledby="sprites-heading">
      <h2 id="sprites-heading">Sprites</h2>
      <div className="sprite-list">
        {spriteEntries.map(([key, value]) => (
          <figure className="sprite-card" key={key}>
            <img
              className="sprite"
              src={value}
              alt={`${capitalise(key.replaceAll('_', ' '))} sprite`}
              width="96"
              height="96"
              loading="lazy"
            />
            <figcaption>{capitalise(key.replaceAll('_', ' '))}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Sprites;
