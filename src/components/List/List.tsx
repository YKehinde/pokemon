import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStorage } from 'usehooks-ts';
import PokemonLogo from '../../assets/pokemon-logo-black-transparent.png';
import { useGetPokemon } from '../../queries/useGetPokemon';
import ListItem from '../ListItem/ListItem';
import './List.scss';

type pokemonItemProps = {
  name: string;
  url: string;
};

const List = () => {
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const [showFavourites, setShowFavourites] = useState(false);
  const { data: defaultList, isLoading } = useGetPokemon(offset);
  const [searchTerm, setSearchTerm] = useState('');
  const [favouriteList, setFavouriteList] = useSessionStorage<pokemonItemProps[]>('favourites', []);

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

  const handleFavourite = (pokemon: pokemonItemProps) => () => {
    if (favouriteList.some(favourite => favourite.name === pokemon.name)) {
      setFavouriteList(prevFavourite => prevFavourite.filter(favourite => favourite.name !== pokemon.name));
    } else {
      setFavouriteList(prevFavourite => [...prevFavourite, pokemon]);
    }
  };

  const getPokemonId = (url: string) => {
    const urlArray = url.split('/');
    return parseInt(urlArray[urlArray.length - 2]);
  };

  const toggleShowFavourites = () => {
    setShowFavourites(prevShowFavourites => !prevShowFavourites);
  };

  const pokemonList = showFavourites ? favouriteList : defaultList;

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
        <button onClick={toggleShowFavourites}>{showFavourites ? 'Show All' : 'Show Favourites'}</button>
      </div>

      <div className="list-container">
        {pokemonList ? (
          pokemonList.map((p: pokemonItemProps, index) => (
            <ListItem
              key={`${p.name}-${index}`}
              name={p.name}
              id={getPokemonId(p.url)}
              onClick={handleFavourite(p)}
              favourite={favouriteList.some(favourite => favourite.name === p.name)}
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
