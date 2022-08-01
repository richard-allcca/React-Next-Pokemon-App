import { FC, useEffect, useState } from 'react';

import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import confetti from 'canvas-confetti'

import { Layout } from '../../components/layouts'
import { Pokemon } from '../../interfaces';
import { existInFavorites, getPokemonInfo, toggleFavorite } from '../../utils';

interface Props {
  pokeDataOne: Pokemon
}

const PokemonPage: FC<Props> = ({ pokeDataOne }) => {

  const [isInFavorite, setIsInFavorite] = useState(existInFavorites(pokeDataOne.id))

  useEffect(() => {

    setIsInFavorite(existInFavorites(pokeDataOne.id))

  }, [pokeDataOne.id])


  const onToggleFavorite = () => {
    // console.log(`ID: ${pokeDataOne.id}}`);
    toggleFavorite(pokeDataOne.id);
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
    <Layout title={pokeDataOne.name}>

      <Grid.Container css={{ marginTop: '5px' }} gap={2} >

        <Grid xs={12} sm={4} >
          <Card isHoverable css={{ padding: '30px' }} >
            <Card.Body >
              <Card.Image
                src={pokeDataOne.sprites.other?.dream_world.front_default || '/no-image.png'}
                alt={pokeDataOne.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8} >
          <Card>

            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }} >
              <Text h1 transform='capitalize' >{pokeDataOne.name}</Text>

              <Button onPress={onToggleFavorite} color='gradient' ghost={!isInFavorite} >
                {isInFavorite ? 'Esta en Favoritos' : 'Guardar en Favoritos'}
              </Button>

            </Card.Header>

            <Card.Body >
              <Text size={30} >Sprites:</Text>

              <Container display='flex' direction='row' gap={1} >
                <Image
                  src={pokeDataOne.sprites.front_default}
                  alt={pokeDataOne.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokeDataOne.sprites.back_default}
                  alt={pokeDataOne.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokeDataOne.sprites.front_shiny}
                  alt={pokeDataOne.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokeDataOne.sprites.back_shiny}
                  alt={pokeDataOne.name}
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


// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {

  //? crea un array de objetos con los ids de los pokemones, 151
  const pokemons151 = [...Array(151).map((value, i) => `${i + 1}`)]

  return {
    // paths: [ //? método original
    //   {
    //     params: { id: '1' }
    //   },
    // ],
    paths: pokemons151.map((id) => ({
      params: { id: String(id) }
    })),
    // fallback: "blocking" // ? valor por defecto
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  // usamos "as" para el tipo que pide en {id}
  const { id } = ctx.params as { id: string }

  // const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`)

  return {
    props: {
      pokeDataOne: await getPokemonInfo(id)

    }
  }
}

export default PokemonPage