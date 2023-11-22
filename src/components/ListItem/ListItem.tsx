import React from 'react';
import './ListItem.scss';
import { Link } from 'react-router-dom';
import { capitalise } from '../../utils/Capitilise';
import starRegular from '../../assets/star-regular.svg';
import starSolid from '../../assets/star-solid.svg';

interface ListItemProps {
  name: string;
  favourite?: boolean;
  onClick?: () => void;
}

const ListItem = ({ name, favourite, onClick }: ListItemProps) => {
  return (
    <div className="list-item">
      <Link onClick={() => console.log('clicked')} to={{ pathname: `/${name}` }}>
        <h2 className="pokemon-title">{`${capitalise(name)}`}</h2>
      </Link>
      <img className="star" src={favourite ? starSolid : starRegular} alt="star" onClick={onClick} />
    </div>
  );
};

export default ListItem;
