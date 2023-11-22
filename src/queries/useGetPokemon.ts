import axios from 'axios';
import { useQuery } from 'react-query';

const POKEMON = 'pokemon';

const getPokemon = async offset => {
  console.log(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
  return data.results;
};

const useGetPokemon = (offset: number) => {
  return useQuery(
    [POKEMON, offset],
    () => {
      return getPokemon(offset);
    },
    { enabled: true, keepPreviousData: true },
  );
};

export { useGetPokemon };
