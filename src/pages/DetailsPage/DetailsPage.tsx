import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import starRegular from '../../assets/star-regular.svg';
import starSolid from '../../assets/star-solid.svg';
import { useGetPokemonDetails } from '../../queries/useGetPokemonDetails';
import { capitalise } from '../../utils/Capitilise';
import Attributes from '../../components/Attributes/Attributes';
import Sprites from '../../components/Sprites/Sprites';
import './DetailsPage.scss';
import { useSessionStorage } from 'usehooks-ts';
import type { StoredFavouritePokemon } from '../../types/pokemon';
import { normaliseFavouritePokemon, toggleFavouritePokemon } from '../../utils/favourites';

const DetailsPage = () => {
  const navigate = useNavigate();
  const { name: paramName = '' } = useParams();
  const { data: pokemon, isLoading } = useGetPokemonDetails(paramName || '');
  const [storedFavourites, setStoredFavourites] = useSessionStorage<StoredFavouritePokemon[]>(
    'favourites',
    [],
  );
  const favourites = normaliseFavouritePokemon(storedFavourites);

  const { name, sprites } = pokemon || {};

  const handleFavourite = (name: string) => () => {
    if (!pokemon) return;

    setStoredFavourites(previous =>
      toggleFavouritePokemon(previous, {
        name,
        id: pokemon.id,
      }),
    );
  };

  return (
    <main className="details-container" id="main-content">
      <div className="details-header">
        <button className="back-button" type="button" onClick={() => navigate('/')}>
          <span aria-hidden="true">←</span>
          Back to Pokedex
        </button>
      </div>

      <section className="card" aria-live="polite">
        {!pokemon && isLoading ? (
          <div className="status-card">
            <h2>Loading…</h2>
            <p>Gathering this Pokemon&apos;s latest stats and sprites.</p>
          </div>
        ) : pokemon ? (
          <>
            <div className="card-hero">
              <div className="title-block">
                <p className="pokemon-id">#{String(pokemon.id).padStart(3, '0')}</p>
                <h1 className="page-title">{capitalise(name)}</h1>
                <p className="details-copy">
                  Review the core profile, compare stats, and save this Pokemon to your favourites.
                </p>
              </div>

              <button
                className="details-favourite-button"
                type="button"
                onClick={handleFavourite(name)}
                aria-label={
                  favourites.some(item => item.name === name)
                    ? `Remove ${capitalise(name)} from favourites`
                    : `Save ${capitalise(name)} to favourites`
                }
                aria-pressed={favourites.some(item => item.name === name)}
                data-active={favourites.some(item => item.name === name)}
              >
                <img
                  className="favourite-icon"
                  src={favourites.some(item => item.name === name) ? starSolid : starRegular}
                  alt=""
                  aria-hidden="true"
                />
                {favourites.some(item => item.name === name) ? 'Saved' : 'Save'}
              </button>
            </div>

            <div className="details-overview">
              <div className="art-panel">
                <img
                  className="default-image"
                  src={String(sprites.front_default)}
                  alt={`${capitalise(name)} default sprite`}
                  width="220"
                  height="220"
                />
              </div>

              <Attributes attributes={pokemon} />
            </div>

            <Sprites sprites={sprites} />
          </>
        ) : (
          <div className="status-card">
            <h2>Pokemon not found</h2>
            <p>Try a different name or head back to the main Pokedex list.</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default DetailsPage;
