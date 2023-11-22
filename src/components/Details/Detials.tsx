import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetPokemonDetails } from '../../queries/useGetPokemonDetails';
import Attributes from '../Attributes/Attributes';
import Sprites from '../Sprites/Sprites';
import { capitalise } from '../../utils/Capitilise';
import './Details.scss';

const Detials = () => {
  const navigate = useNavigate();
  const paramName = useLocation().pathname.split('/')[1];
  const { data: pokemon, isLoading } = useGetPokemonDetails(paramName || '');

  const cleanId = (id: number) => {
    const str = '' + id;
    const pad = '0000';
    const ans = pad.substring(0, pad.length - str.length) + str;
    return ans;
  };

  const { id, name, sprites } = pokemon || {};

  return (
    <div className="details-container">
      <button className="back-button" onClick={() => navigate('/')} aria-label="back button">
        Go back
      </button>

      {!pokemon && isLoading ? (
        <h2>Loading...</h2>
      ) : pokemon ? (
        <>
          <h1 className="page-title">{`${cleanId(id)} - ${capitalise(name)}`}</h1>
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
