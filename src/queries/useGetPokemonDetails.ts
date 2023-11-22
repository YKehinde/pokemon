import axios from 'axios';
import { useQuery } from 'react-query';

const getPokemonDetails = async name => {
  // console.log(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return data;
};

const useGetPokemonDetails = (name: string) => {
  return useQuery(
    [name, name],
    () => {
      return getPokemonDetails(name);
    },
    { enabled: true, keepPreviousData: true },
  );
};

export { useGetPokemonDetails };
