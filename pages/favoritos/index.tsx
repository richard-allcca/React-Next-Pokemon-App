import { useState, useEffect } from 'react';

import { Layout } from "../../components/layouts"
import { NoFavorites } from './../../components/ui/NoFavorites';
import { getPokemonLs } from '../../utils';
import { FavoritePokemons } from '../../components/pokemon';


const FavoritosPage = () => {

  const [favoritePokemon, setFavoritePokemon] = useState<number[]>([])

  useEffect(() => {
    setFavoritePokemon(getPokemonLs)
  }, [])


  return (
    <Layout title="Pokémons - Favoritos" >

      {
        favoritePokemon.length === 0
          ? (<NoFavorites />)
          : (<FavoritePokemons favorites={favoritePokemon} />)
      }

    </Layout>
  )
}

export default FavoritosPage
