import type { GetStaticProps, NextPage } from 'next'
import { Grid } from '@nextui-org/react'

import { pokeApi } from '../api'
import { Layout } from '../components/layouts'
import { PokemonListResponse, SmallPokemon } from '../interfaces'
import { PokeCard } from '../components/pokemon/PokeCard';

interface Props {
  pokeData: SmallPokemon[]
}

const Home: NextPage<Props> = ({ pokeData }) => {


  return (
    <Layout title='Richard'>

      <Grid.Container gap={2} justify='flex-start' >
        {
          pokeData.map((pokemon) => {
            return <PokeCard pokemon={pokemon} key={pokemon.id} />
          })
        }
      </Grid.Container>
    </Layout>
  )
}


/**
 * Crea el contenido inicial de una página antes de ser creada.
 * Solo se ejecuta en el lado del servidor && durante el build
 */
export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokeData: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    name: poke.name,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  }))

  // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg

  return {
    props: {
      pokeData
    }
  }
}

export default Home
