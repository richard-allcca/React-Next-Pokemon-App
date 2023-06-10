import { FC } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Card, Grid } from '@nextui-org/react';

import { Layout } from '../../components/layouts';
import { Pokemon } from '../../interfaces';
import { getPokemonInfo } from '../../utils';
import { IndividualPokemonCard } from '../../components/ui/IndividualPokemonCard';

interface Props {
  pokeDataOne: Pokemon;
}

const PokemonByIdPage: NextPage<Props> = ({ pokeDataOne }) => {
// const PokemonByNamePage: FC<Props> = ({ pokemon }) => {
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
    fallback: "blocking" /* permite params no definidos aqui */
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

  const pokeDataOne = await getPokemonInfo(id);

  if (!pokeDataOne) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  return {
    props: { // props enviadas al componente
      pokeDataOne
    },
    revalidate: 86400 // tiempo para volver a pedir la data
  };
};
