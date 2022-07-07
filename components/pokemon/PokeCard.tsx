import { Card, Grid, Row, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { SmallPokemon } from '../../interfaces'

interface Props {
  pokemon: SmallPokemon
}

export const PokeCard: FC<Props> = ({ pokemon }) => {
  const { name, id, img } = pokemon

  const router = useRouter();

  const onClick = () => {
    router.push(`/pokemon/${id}`)
  }

  return (
    <Grid xs={6} sm={3} md={2} xl={1}>
      <Card isHoverable isPressable onClick={onClick} >

        <Card.Body css={{ p: 1, maxHeight: "150px" }} >
          <Card.Image
            src={img}
            objectFit='scale-down'
            width="100%"
            alt={name}
          />
        </Card.Body>

        <Card.Footer css={{ justifyItems: "flex-start" }} >
          <Row wrap='wrap' justify='space-between' align='center' >
            <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }} >
              # {id}
            </Text>
            <Text transform='capitalize' > {name} </Text>
          </Row>
        </Card.Footer>

      </Card>
    </Grid>
  )
}
