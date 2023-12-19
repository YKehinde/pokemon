import { createBrowserHistory } from 'history';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSessionStorage } from 'usehooks-ts';
import { useGetPokemon } from '../../queries/useGetPokemon';
import ListItem from '../ListItem/ListItem';
import './List.scss';

type pokemonItemProps = {
  name: string;
  url: string;
};

const List = () => {
  const navigate = useNavigate();
  const history = createBrowserHistory();
  const location = useLocation();
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [showFavourites, setShowFavourites] = useState(false);
  const { data: defaultList, isLoading } = useGetPokemon(offset);
  const [searchTerm, setSearchTerm] = useState('');
  const [favouriteList, setFavouriteList] = useSessionStorage<pokemonItemProps[]>('favourites', []);

  useEffect(() => {
    history.push(`?page=${page}`);
    const pageParam = new URLSearchParams(location.search).get('page');
    if (pageParam) {
      setPage(Number(pageParam));
    }
  }, [location, page]);

  useEffect(() => {
    setOffset((page - 1) * 20);
  }, [page]);

  const handlePagination = (step: number): void => {
    if (page + step < 1) return;
    setPage(prevPage => prevPage + step);
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
    <>
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
        <button onClick={() => handlePagination(-1)}>Previous page</button>
        <button onClick={() => handlePagination(1)}>Next page</button>
      </div>
    </>
  );
};

export default List;
