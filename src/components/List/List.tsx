import React, { FormEvent, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSessionStorage } from 'usehooks-ts';
import { useGetPokemon } from '../../queries/useGetPokemon';
import ListItem from '../ListItem/ListItem';
import type { FavouritePokemon, StoredFavouritePokemon } from '../../types/pokemon';
import { normaliseFavouritePokemon, toggleFavouritePokemon } from '../../utils/favourites';
import './List.scss';

const List = () => {
  const PAGE_SIZE = 20;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get('page') || '1');
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
  const offset = (page - 1) * PAGE_SIZE;
  const showFavourites = searchParams.get('view') === 'favourites';
  const { data: defaultList, isLoading } = useGetPokemon(offset);
  const [searchTerm, setSearchTerm] = useState('');
  const [storedFavourites, setStoredFavourites] = useSessionStorage<StoredFavouritePokemon[]>(
    'favourites',
    [],
  );
  const favouriteList = useMemo(
    () => normaliseFavouritePokemon(storedFavourites),
    [storedFavourites],
  );

  const handlePagination = (step: number): void => {
    const nextPage = Math.max(1, page + step);
    const nextSearchParams = new URLSearchParams(searchParams);

    nextSearchParams.set('page', String(nextPage));
    setSearchParams(nextSearchParams);
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();

    if (trimmedSearchTerm) {
      navigate(`/${trimmedSearchTerm}`);
    }
  };

  const handleFavourite = (pokemon: FavouritePokemon) => () => {
    setStoredFavourites(previous => toggleFavouritePokemon(previous, pokemon));
  };

  const toggleShowFavourites = () => {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (showFavourites) {
      nextSearchParams.delete('view');
    } else {
      nextSearchParams.set('view', 'favourites');
    }

    nextSearchParams.set('page', String(page));
    setSearchParams(nextSearchParams);
  };

  const pokemonList = showFavourites
    ? favouriteList
    : (defaultList?.results || []).map(pokemon => ({
        name: pokemon.name,
        id: Number(pokemon.url.split('/').filter(Boolean).at(-1) || 0),
      }));

  const totalPages = defaultList ? Math.ceil(defaultList.count / PAGE_SIZE) : 0;
  const currentPage = totalPages > 0 ? Math.min(page, totalPages) : page;
  const canGoToNextPage = totalPages > 0 ? page < totalPages : false;

  const summary = showFavourites
    ? `${favouriteList.length} saved Pokemon`
    : totalPages > 0
      ? `Showing page ${currentPage} of ${totalPages}`
      : `Showing page ${page}`;

  return (
    <>
      <section className="list-toolbar" aria-label="Pokedex controls">
        <form className="search-container" onSubmit={handleSearch}>
          <label className="visually-hidden" htmlFor="pokemon-search">
            Search for a Pokemon by name
          </label>
          <input
            className="search-input"
            id="pokemon-search"
            name="pokemon-search"
            type="search"
            inputMode="search"
            autoComplete="off"
            spellCheck={false}
            placeholder="Search Pokemon by name…"
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
          />
          <button className="search-button" type="submit">
            Search Pokemon
          </button>
          <button
            className="filter-button"
            type="button"
            onClick={toggleShowFavourites}
            aria-pressed={showFavourites}
          >
            {showFavourites ? 'Show Full Pokedex' : 'Show Favourites'}
          </button>
        </form>

        <p className="results-summary" aria-live="polite">
          {summary}
        </p>
      </section>

      <section className="list-container" aria-label={showFavourites ? 'Favourite Pokemon' : 'Pokemon list'}>
        {pokemonList.length > 0 ? (
          pokemonList.map(pokemon => (
            <ListItem
              key={pokemon.name}
              name={pokemon.name}
              id={pokemon.id}
              onClick={handleFavourite(pokemon)}
              favourite={favouriteList.some(favourite => favourite.name === pokemon.name)}
            />
          ))
        ) : isLoading ? (
          <div className="status-card">
            <h2>Loading…</h2>
            <p>Pulling the latest Pokemon into the Pokedex.</p>
          </div>
        ) : showFavourites ? (
          <div className="status-card">
            <h2>No favourites yet</h2>
            <p>Save a Pokemon to build a quick shortlist here.</p>
          </div>
        ) : (
          <div className="status-card">
            <h2>Something went wrong</h2>
            <p>Refresh the page or try a different Pokemon name.</p>
          </div>
        )}
      </section>

      {!showFavourites ? (
        <div className="button-container">
          <button
            className="pagination-button"
            type="button"
            onClick={() => handlePagination(-1)}
            disabled={page === 1}
          >
            Previous Page
          </button>

          <p className="pagination-status" aria-live="polite">
            {totalPages > 0 ? `Page ${currentPage} of ${totalPages}` : 'Loading pages…'}
          </p>

          <button
            className="pagination-button"
            type="button"
            onClick={() => handlePagination(1)}
            disabled={!canGoToNextPage}
          >
            Next Page
          </button>
        </div>
      ) : null}
    </>
  );
};

export default List;
