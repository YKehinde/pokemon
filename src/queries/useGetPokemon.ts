import axios from 'axios';
import { useQuery } from 'react-query';
import type { PokemonListResponse } from '../types/pokemon';

export const POKEMON = 'pokemon';

const getPokemon = async (offset: number) => {
  const { data } = await axios.get<PokemonListResponse>(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20}`,
  );
  return data;
};

const useGetPokemon = (offset: number) => {
  return useQuery<PokemonListResponse>(
    [POKEMON, offset],
    () => {
      return getPokemon(offset);
    },
    { enabled: true, keepPreviousData: true },
  );
};

export { useGetPokemon };
