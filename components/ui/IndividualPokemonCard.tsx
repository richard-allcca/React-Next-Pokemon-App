import React, { FC, useEffect, useState } from 'react';

import { Button, Card, Container, Image, Text } from '@nextui-org/react';

import confetti from 'canvas-confetti';

import { Pokemon } from '../../interfaces';
import { existInFavorites, toggleFavorite } from '../../utils';

interface Props {
  pokemon: Pokemon,
}

export const IndividualPokemonCard: FC<Props> = ({ pokemon }) => {


  const [isInFavorite, setIsInFavorite] = useState(existInFavorites(pokemon.id));

  useEffect(() => {
    setIsInFavorite(existInFavorites(pokemon.id));
  }, [pokemon.id]);


  const onToggleFavorite = () => {
    toggleFavorite(pokemon.id);
    setIsInFavorite(!isInFavorite);
  };

  // Animacion de favoritos
  if (isInFavorite) {
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: { x: 1, y: 0 },
    });

  }

  return (
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
  );
};
