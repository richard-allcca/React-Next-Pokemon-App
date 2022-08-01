import { GetStaticProps, GetStaticPaths } from 'next';
import React, { FC } from 'react'
import { pokeApi } from '../../api';
import { PokemonListResponse } from '../../interfaces';
import { getPokemonInfo } from '../../utils/getPokemonInfo'

interface Props {
  richi: string
}

const dato: FC<Props> = ({ richi }) => {
  return (
    <div>dt</div>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151)');
  const pokemonNames: string[] = data.results.map((pokemon: any) => pokemon.name);
  // console.log(pokemonNames)
  // return {
  //   paths: [
  //     { params: { dato: 'ditto' } },
  //   ],
  //   fallback: false
  // }

  return {
    paths: pokemonNames.map(name => ({
      params: { dato: name }
    })),
    fallback: false // si esta en falso aparece error 404
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { dato } = ctx.params as { dato: string }
  // console.log(dato)

  return {
    props: {
      richi: await getPokemonInfo(dato)
    }
  }
}

export default dato