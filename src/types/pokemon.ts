export interface PokemonListEntry {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  results: PokemonListEntry[];
}

export interface FavouritePokemon {
  name: string;
  id: number;
}

export type StoredFavouritePokemon = FavouritePokemon | PokemonListEntry | string;

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonTypeEntry {
  type: {
    name: string;
  };
}

export interface PokemonDetails {
  id: number;
  name: string;
  sprites: Record<string, string | null | object>;
  types: PokemonTypeEntry[];
  base_experience: number;
  height: number;
  weight: number;
  stats: PokemonStat[];
}
