import { FC } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { Card, Grid } from '@nextui-org/react';

import { Layout } from '../../components/layouts';
import { Pokemon, PokemonListResponse } from '../../interfaces';
import { getPokemonInfo } from '../../utils';
import { IndividualPokemonCard } from '../../components/ui';
import pokeApi from '../../api/pokeApi';
interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
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

export default PokemonByNamePage;

/**
 * Usa un filtro para evitar enviar data innecesaria a getStaticProps
 * You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
 * @returns params que usara el getStaticProps
 */
export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151)');
  const pokemonNames: string[] = data.results.map((pokemon: any) => pokemon.name);

  return {
    paths: pokemonNames.map(name => ({
      params: { name }
    })),
    fallback: 'blocking' /* permite params no definidos aqui */
    // fallback: false  /* evita params no definidos reenvia a 404 */
  };
};

/**
 * descripción de getStaticProps en page index.tsx
 * @param ctx contexto desde donde se puede leer los params de getStaticPaths
 * @returns props que usara la pagina
 */
export const getStaticProps: GetStaticProps = async (ctx) => {

  const { name } = ctx.params as { name: string; };// "as" para el tipo de {name}

  const pokemon = await getPokemonInfo(name);

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false, // false da posibilidad de intentar entrar en la ruta nueva
      }
    };
  }

  return {
    props: { // props enviada al componente
      pokemon
    },
    revalidate: 86400 // tiempo para volver a pedir la data
  };
};
