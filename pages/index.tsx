import type { GetStaticProps, NextPage } from 'next';

import { Grid } from '@nextui-org/react';

import { Layout } from '../components/layouts';
import { PokeCard } from '../components/pokemon';
import { pokeApi } from '../api';

import { PokemonListResponse, SmallPokemon } from '../interfaces';

interface Props {
  pokeData: SmallPokemon[];
}

/*
* (SSG) Static-site generation, genera las card de pokemon con una sola petición
* luego de ser generada se guarda como html static y no hará mas peticiones
 */
const Home: NextPage<Props> = ({ pokeData }) => {

  return (
    <Layout title='Richard'>

      <Grid.Container gap={2} justify='flex-start' >
        {
          pokeData.map((pokemon) => {
            return <PokeCard pokemon={pokemon} key={pokemon.id} />;
          })
        }
      </Grid.Container>

    </Layout>
  );
};

/* STUB - SSG: Static-site generation, nada de esta llega al cliente
  - esta funcion se ejecuta del lado del servidor en el builtime
  - puede leer file system, leer ddbb, hacer peticiones http mandando secretToken
  - usala solo cuando sepas cuales son las props que usara este componente
  - crea las pages de antemano con los datos preinsertaados, clase 47 min 9
  - solo en desarrollo se llamara en cada que se ejecute esta pagina
 */
export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokeData: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  }));

  // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg

  return {
    props: {
      pokeData
    }
  };
};

export default Home;
