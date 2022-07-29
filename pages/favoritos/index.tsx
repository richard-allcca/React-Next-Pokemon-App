import { useState, useEffect } from 'react';

import { Card, Grid } from "@nextui-org/react"
import { Layout } from "../../components/layouts"
import { NoFavorites } from './../../components/ui/NoFavorites';
import { pokemons } from '../../utils';


const FavoritosPage = () => {

  const [favoritePokemon, setFavoritePokemon] = useState<number[]>([])

  useEffect(() => {
    setFavoritePokemon(pokemons)
  }, [])


  return (
    <Layout title="Pokémons - Favoritos" >

      {
        favoritePokemon.length === 0
          ? (<NoFavorites />)
          : (
            <Grid.Container gap={2} direction='row' justify='flex-start' >
              {
                favoritePokemon.map(item => {
                  return (
                    <Grid xs={6} sm={3} md={2} xl={1} key={item} >
                      <Card isHoverable isPressable css={{ padding: 10 }} >
                        <Card.Image
                          width={180}
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${item}.svg`}
                        >

                        </Card.Image>
                      </Card>
                    </Grid>
                  )
                })
              }
            </Grid.Container>
          )
      }

    </Layout>
  )
}

export default FavoritosPage
