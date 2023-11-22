import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PokemonLogo from '../../assets/pokemon-logo-black-transparent.png';
import { useGetPokemon } from '../../queries/useGetPokemon';
import ListItem from '../ListItem/ListItem';
import './List.scss';
import { useSessionStorage } from 'usehooks-ts';

const List = () => {
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const { data: pokemonList, isLoading } = useGetPokemon(offset);
  const [searchTerm, setSearchTerm] = useState('');
  const [favourite, setFavourite] = useSessionStorage<string[]>('favourites', []);

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

  const handleFavourite = (name: string) => () => {
    if (favourite.includes(name)) {
      setFavourite(prevFavourite => prevFavourite.filter(item => item !== name));
    } else {
      setFavourite(prevFavourite => [...prevFavourite, name]);
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
          pokemonList.map((p, index) => (
            <ListItem
              key={`${p.name}-${index}`}
              name={p.name}
              onClick={handleFavourite(p.name)}
              favourite={favourite.includes(p.name)}
            />
          ))
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
