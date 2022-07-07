import NextLink from 'next/link';
import { Link, Spacer, Text, useTheme } from '@nextui-org/react'
import Image from 'next/image'
import React from 'react'

export const Navbar = () => {

  const { theme } = useTheme()

  return (
    <div className='navbar' style={{ backgroundColor: theme?.colors.gray100.value }}>

      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png"
        alt="ditto"
        width={70}
        height={70}
      />

      <NextLink href='/' passHref >
        <Link>
          <Text color='white' h2>P</Text>
          <Text color='white' h3>okémon</Text>
        </Link>
      </NextLink>

      <Spacer css={{ flex: 1 }} />


      <NextLink href='/favoritos' passHref >
        <Link>
          <Text color='white' >Favoritos</Text>
        </Link>
      </NextLink>

    </div>
  )
}

// Notas:
// passHref: para que el path reciba el url