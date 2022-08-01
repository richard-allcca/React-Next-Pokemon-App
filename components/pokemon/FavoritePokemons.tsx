import React, { FC } from 'react'

import { Grid } from '@nextui-org/react'

import FavoriteCardPokemon from './FavoriteCardPokemon';

interface Props {
  favorites: number[]
}


export const FavoritePokemons: FC<Props> = ({ favorites }) => {

  return (
    <Grid.Container gap={2} direction='row' justify='flex-start' >
      {
        favorites.map(item => {
          return (
            <FavoriteCardPokemon key={item} id={item} />
          )
        })
      }
    </Grid.Container>
  )
}

// export default FavoritePokemons

// 362 4344
// 258 3.96
// 302
