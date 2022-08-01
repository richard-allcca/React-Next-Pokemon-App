import { FC, useEffect, useState } from 'react';

import { GetStaticPaths, GetStaticProps } from 'next'
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';

import confetti from 'canvas-confetti'

import pokeApi from '../../api/pokeApi';
import { Layout } from '../../components/layouts'
import { Pokemon, PokemonListResponse } from '../../interfaces';
import { existInFavorites, getPokemonInfo, toggleFavorite } from '../../utils';
// import { getPokemonInfo } from '../../utils/getPokemonInfo';

interface Props {
  pokemon: Pokemon
}

const PokemonByNamePage: FC<Props> = ({ pokemon }) => {

  const [isInFavorite, setIsInFavorite] = useState(existInFavorites(pokemon.id))

  useEffect(() => {
    setIsInFavorite(existInFavorites(pokemon.id))
  }, [pokemon.id])


  const onToggleFavorite = () => {
    // console.log(`ID: ${pokeDataOne.id}}`);
    toggleFavorite(pokemon.id);
    setIsInFavorite(!isInFavorite);
  }

  if (isInFavorite) {
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: { x: 1, y: 0 },
    })

  }



  return (
    <Layout title={pokemon.name}>

      <Grid.Container css={{ marginTop: '5px' }} gap={2} >

        <Grid xs={12} sm={4} >
          <Card isHoverable css={{ padding: '30px' }} >
            <Card.Body >
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8} >
          <Card>

            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }} >
              <Text h1 transform='capitalize' >{pokemon.name}</Text>

              <Button onPress={onToggleFavorite} color='gradient' ghost={!isInFavorite} >
                {isInFavorite ? 'Esta en Favoritos' : 'Guardar en Favoritos'}
              </Button>

            </Card.Header>

            <Card.Body >
              <Text size={30} >Sprites:</Text>

              <Container display='flex' direction='row' gap={1} >
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>

            </Card.Body>

          </Card>
        </Grid>

      </Grid.Container>

    </Layout>
  )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151)');
  const pokemonNames: string[] = data.results.map((pokemon: any) => pokemon.name);

  return {
    paths: pokemonNames.map(name => ({
      params: { name: name }
    })),
    fallback: false // si esta en falso aparece error 404
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  // usamos "as" para el tipo que pide en {id}
  const { name } = ctx.params as { name: string }

  return {
    props: {
      pokemon: await getPokemonInfo(name)
    }
  }
}

export default PokemonByNamePage; 