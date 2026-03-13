import axios from 'axios';
import { useQuery } from 'react-query';
import type { PokemonDetails } from '../types/pokemon';

const getPokemonDetails = async (name: string) => {
  const { data } = await axios.get<PokemonDetails>(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return data;
};

const useGetPokemonDetails = (name: string) => {
  return useQuery<PokemonDetails>(
    [name, name],
    () => {
      return getPokemonDetails(name);
    },
    { enabled: true, keepPreviousData: true },
  );
};

export { useGetPokemonDetails };
