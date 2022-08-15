import { FC } from 'react';

import { GetStaticPaths, GetStaticProps } from 'next'

import { Card, Grid } from '@nextui-org/react';

import pokeApi from '../../api/pokeApi';
import { Layout } from '../../components/layouts'
import { Pokemon, PokemonListResponse } from '../../interfaces';
import { getPokemonInfo } from '../../utils';
import { IndividualPokemonCard } from '../../components/ui';

interface Props {
   pokemon: Pokemon
}

const PokemonByNamePage: FC<Props> = ({ pokemon }) => {


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

               <IndividualPokemonCard pokemon={pokemon} />

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
      // fallback: false // false para enviar a error 404
      fallback: 'blocking'
   }
}

export const getStaticProps: GetStaticProps = async (ctx) => {

   // REVIEW - usamos "as" para el tipo que pide en {id}
   const { name } = ctx.params as { name: string }

   const pokemon = await getPokemonInfo(name)

   if (!pokemon) {
      return {
         redirect: {
            destination: '/',
            permanent: false,
         }
      }
   }

   return {
      props: {
         pokemon
      },
      revalidate: 86400 // segundos para volver a pedir la data
   }
}

export default PokemonByNamePage; 