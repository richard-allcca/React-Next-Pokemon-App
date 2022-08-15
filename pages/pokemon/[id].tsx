import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Card, Grid } from '@nextui-org/react';


import { Layout } from '../../components/layouts'
import { Pokemon } from '../../interfaces';
import { getPokemonInfo } from '../../utils';
import { IndividualPokemonCard } from '../../components/ui/IndividualPokemonCard';

interface Props {
   pokeDataOne: Pokemon
}

const PokemonPage: NextPage<Props> = ({ pokeDataOne }) => {



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
               <IndividualPokemonCard pokemon={pokeDataOne} />
            </Grid>

         </Grid.Container>

      </Layout>
   )
}


// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {

   // //? crea un array de objetos con los ids de los pokemones, 151
   const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`)

   // NOTE - The paths array should be an array of objects, each object should have the key of params and the value of an object with the key of name and the value of the pokemon id.

   return {
      // paths: [ //? método original
      //   {
      //     params: { id: '1' }
      //   },
      // ],
      paths: pokemons151.map(id => ({
         params: { id }
      })),
      // fallback: false
      fallback: "blocking"
   }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
   // usamos "as" para el tipo que pide en {id}
   const { id } = ctx.params as { id: string }

   const pokeDataOne = await getPokemonInfo(id)

   if (!pokeDataOne) {
      return {
         redirect: {
            destination: '/',
            permanent: false
         }
      }
   }

   return {
      props: {
         pokeDataOne
      },
      revalidate: 86400
   }
}

export default PokemonPage