import React from 'react';
import List from '../../components/List/List';
import PokemonLogo from '../../assets/pokemon-logo-black-transparent.png';

const ListPage = () => {
  return (
    <div className="body">
      <h1>
        <img className="pokemon-logo" src={PokemonLogo} alt="pokemon-logo" aria-label="pokemon logo" />
      </h1>
      <List />
    </div>
  );
};

export default ListPage;
