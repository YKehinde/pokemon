import React from 'react';
import { Link } from 'react-router-dom';
import spinner from '../../assets/pokeball.gif';
import starRegular from '../../assets/star-regular.svg';
import starSolid from '../../assets/star-solid.svg';
import { capitalise } from '../../utils/Capitilise';
import './ListItem.scss';

interface ListItemProps {
  name: string;
  favourite?: boolean;
  onClick?: () => void;
  id: number;
}

const ListItem: React.FC<ListItemProps> = ({ name, favourite, onClick, id }) => {
  const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  const displayName = capitalise(name);

  return (
    <article className="list-item">
      <button
        className="favourite-button"
        type="button"
        onClick={onClick}
        aria-label={favourite ? `Remove ${displayName} from favourites` : `Save ${displayName} to favourites`}
        aria-pressed={favourite}
        data-active={favourite}
      >
        <img
          className="favourite-icon"
          src={favourite ? starSolid : starRegular}
          alt=""
          aria-hidden="true"
        />
      </button>

      <Link className="list-item-link" to={`/${name}`}>
        <img
          className="pokemon-image"
          src={id ? url : spinner}
          alt={`${displayName} artwork`}
          width="120"
          height="120"
          loading="lazy"
        />
        <div className="pokemon-copy">
          <p className="pokemon-number">{id ? `#${String(id).padStart(3, '0')}` : 'Saved Pokemon'}</p>
          <h2 className="pokemon-title">{displayName}</h2>
        </div>
      </Link>
    </article>
  );
};

export default ListItem;
