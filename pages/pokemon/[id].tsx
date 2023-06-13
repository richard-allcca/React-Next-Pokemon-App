import { FC } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Card, Grid } from '@nextui-org/react';

import { Layout } from '../../components/layouts';
import { Pokemon } from '../../interfaces';
import { getPokemonInfo } from '../../utils';
import { IndividualPokemonCard } from '../../components/ui/IndividualPokemonCard';

interface Props {
  pokemon: Pokemon;
}

const PokemonByIdPage: NextPage<Props> = ({ pokemon }) => {
// const PokemonByNamePage: FC<Props> = ({ pokemon }) => {
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
  );
};

export default PokemonByIdPage;

/**
 * Usa un filtro para evitar enviar data innecesaria a getStaticProps
 * You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
 * @returns params que usara el getStaticProps
 */
export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const generate151Id = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    paths: generate151Id.map(id => (
      { params: { id } }
    )),
    fallback: "blocking" /* (ISG) genera paginas no creadas si la ruta existe */
    // fallback: false /* evita params no definidos reenvia al 404 */
  };
};

/**
 * descripción de getStaticProps en page index.tsx
 * @param ctx contexto desde donde se puede leer los params de getStaticPaths
 * @returns props que usara la pagina
 */
export const getStaticProps: GetStaticProps = async (ctx) => {

  const { id } = ctx.params as { id: string; }; // "as" para el tipado de {id}

  const pokemon = await getPokemonInfo(id); /* (ISG)  */

  if (!pokemon) { // si no existe el id para crear la pagina redirecciona
    return {
      redirect: {
        destination: '/',
        permanent: false // falso da posibilidad de entrar a la nueva ruta
      }
    };
  }

  return {
    props: { // props enviadas al componente
      pokemon
    },
    revalidate: 86400 // (ISR) vuelve a validar la pagina en 24 horas
  };
};
