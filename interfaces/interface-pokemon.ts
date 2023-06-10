// Lista completa de todos los pokemon
export interface PokemonListResponse {
  count: number;
  next?: string;
  previous?: string;
  results: SmallPokemon[];
}

// Info resumida de un solo pokemon
export interface SmallPokemon {
  id: number;
  name: string;
  url: string;
  img: string
}
