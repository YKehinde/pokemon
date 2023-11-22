import axios from 'axios';
import { useQuery } from 'react-query';

export const POKEMON = 'pokemon';

const getPokemon = async (offset, favourites) => {
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}${favourites ? '' : '&limit=20'}`,
  );
  return data.results;
};

const useGetPokemon = (offset: number, favourites: boolean) => {
  return useQuery(
    [POKEMON, offset, favourites],
    () => {
      return getPokemon(offset, favourites);
    },
    { enabled: true, keepPreviousData: true },
  );
};

export { useGetPokemon };
