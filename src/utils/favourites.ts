import type { FavouritePokemon, StoredFavouritePokemon } from '../types/pokemon';

const getPokemonIdFromUrl = (url: string) => {
  const segments = url.split('/').filter(Boolean);
  const id = Number(segments[segments.length - 1]);

  return Number.isFinite(id) ? id : 0;
};

export const normaliseFavouritePokemon = (items: StoredFavouritePokemon[]): FavouritePokemon[] => {
  return items.reduce<FavouritePokemon[]>((list, item) => {
    if (typeof item === 'string') {
      if (!list.some(entry => entry.name === item)) {
        list.push({ name: item, id: 0 });
      }

      return list;
    }

    if (!item.name || list.some(entry => entry.name === item.name)) {
      return list;
    }

    const id = 'id' in item && typeof item.id === 'number' ? item.id : getPokemonIdFromUrl(item.url);

    list.push({
      name: item.name,
      id,
    });

    return list;
  }, []);
};

export const toggleFavouritePokemon = (
  items: StoredFavouritePokemon[],
  pokemon: FavouritePokemon,
) => {
  const favourites = normaliseFavouritePokemon(items);

  if (favourites.some(item => item.name === pokemon.name)) {
    return favourites.filter(item => item.name !== pokemon.name);
  }

  return [...favourites, pokemon];
};
