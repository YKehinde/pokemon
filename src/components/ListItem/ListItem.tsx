import React from 'react';
import './ListItem.scss';
import { Link } from 'react-router-dom';
import { capitalise } from '../../utils/Capitilise';
import starRegular from '../../assets/star-regular.svg';
import starSolid from '../../assets/star-solid.svg';
import spinner from '../../assets/pokeball.gif';

interface ListItemProps {
  name: string;
  favourite?: boolean;
  onClick?: () => void;
  id: number;
}

const ListItem: React.FC<ListItemProps> = ({ name, favourite, onClick, id }) => {
  const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div className="list-item">
      <Link to={{ pathname: `/${name}` }}>
        <img src={!id ? spinner : url} alt="front_default"></img>
        <h2 className="pokemon-title">{`${capitalise(name)}`}</h2>
      </Link>
      <img className="star" src={favourite ? starSolid : starRegular} alt="star" onClick={onClick} />
    </div>
  );
};

export default ListItem;
