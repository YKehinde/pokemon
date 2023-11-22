import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import starRegular from '../../assets/star-regular.svg';
import starSolid from '../../assets/star-solid.svg';
import { useGetPokemonDetails } from '../../queries/useGetPokemonDetails';
import { capitalise } from '../../utils/Capitilise';
import Attributes from '../Attributes/Attributes';
import Sprites from '../Sprites/Sprites';
import './Details.scss';
import { useSessionStorage } from 'usehooks-ts';

const Detials = () => {
  const navigate = useNavigate();
  const paramName = useLocation().pathname.split('/')[1];
  const { data: pokemon, isLoading } = useGetPokemonDetails(paramName || '');
  const [favourite, setFavourite] = useSessionStorage<string[]>('favourites', []);

  const cleanId = (id: number) => {
    const str = '' + id;
    const pad = '0000';
    const ans = pad.substring(0, pad.length - str.length) + str;
    return ans;
  };

  const { id, name, sprites } = pokemon || {};

  const handleFavourite = (name: string) => () => {
    if (favourite.includes(name)) {
      setFavourite(prevFavourite => prevFavourite.filter(item => item !== name));
    } else {
      setFavourite(prevFavourite => [...prevFavourite, name]);
    }
  };

  return (
    <div className="details-container">
      <button className="back-button" onClick={() => navigate('/')} aria-label="back button">
        Go back
      </button>

      {!pokemon && isLoading ? (
        <h2>Loading...</h2>
      ) : pokemon ? (
        <>
          <h1 className="page-title">
            {`${cleanId(id)} - ${capitalise(name)}`}
            <img
              className="star"
              src={favourite.includes(name) ? starSolid : starRegular}
              alt="star"
              onClick={handleFavourite(name)}
            />
          </h1>
          <Sprites sprites={sprites} />
          <Attributes attributes={pokemon} />
        </>
      ) : (
        <h2>No Data available. Please try again</h2>
      )}
    </div>
  );
};

export default Detials;
