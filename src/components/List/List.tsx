import React, { useState } from 'react';
import './List.scss';
import { useGetPokemon } from '../../queries/useGetPokemon';
import ListItem from '../ListItem/ListItem';
import PokemonLogo from '../../assets/pokemon-logo-black-transparent.png';
import { useNavigate } from 'react-router-dom';

const List = () => {
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const { data: pokemonList, isLoading } = useGetPokemon(offset);
  const [searchTerm, setSearchTerm] = useState('');

  // Made it one function to handle both buttons
  const handlePagination = step => {
    if (offset + step < 0) return;

    setOffset(prevOffset => prevOffset + step);
  };

  const handleSearch = event => {
    if (event.key === 'Enter') {
      if (searchTerm === '') return;

      navigate(`/${searchTerm}`);
    }
  };

  return (
    <div className="body">
      <h1>
        <img className="pokemon-logo" src={PokemonLogo} alt="pokemon-logo" aria-label="pokemon logo" />
      </h1>

      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search Pokemon"
          onKeyDown={handleSearch}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="list-container">
        {pokemonList ? (
          pokemonList.map((p, index) => <ListItem key={`${p.name}-${index}`} name={p.name} />)
        ) : isLoading ? (
          <h2>Loading...</h2>
        ) : (
          <h2>Something went wrong</h2>
        )}
      </div>

      <div className="button-container">
        <button onClick={() => handlePagination(-20)}>Previous page</button>
        <button onClick={() => handlePagination(20)}>Next page</button>
      </div>
    </div>
  );
};

export default List;
