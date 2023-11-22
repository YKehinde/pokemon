import React from 'react';
import './ListItem.scss';
import { Link } from 'react-router-dom';
import { capitalise } from '../../utils/Capitilise';

interface ListItemProps {
  name: string;
}

const ListItem = ({ name }: ListItemProps) => {
  return (
    <div className="list-item">
      <Link onClick={() => console.log('clicked')} to={{ pathname: `/${name}` }}>
        <h2 className="pokemon-title">{`${capitalise(name)}`}</h2>
      </Link>
    </div>
  );
};

export default ListItem;
