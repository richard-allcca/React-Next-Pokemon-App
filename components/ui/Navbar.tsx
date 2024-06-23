import NextLink from 'next/link';
import { Link, Spacer, Text, useTheme } from '@nextui-org/react'
import Image from 'next/image'
import React from 'react'


export const Navbar = () => {

  const { theme } = useTheme()

  return (
    <>
    <div className='nav' style={{ backgroundColor: theme?.colors.gray100.value }}>

    <div className='logo' >
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png"
        alt="Mewtwo"
        width={70}
        height={70}
      />

      <NextLink href='/' passHref >
        <Link>
          <Text color='white' h2>P</Text>
          <Text color='white' h3>okémon</Text>
        </Link>
      </NextLink>
    </div>

      {/* <Spacer css={{ flex: 1 }} /> */}

      <NextLink href='/favoritos' passHref >
        <Link>
          <Text color='white' >Favoritos</Text>
        </Link>
      </NextLink>

    </div>
    <style jsx>
      {`
        .nav {
          display: flex;
          width: 100%;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 0px 20px;
        }

        .logo {
          display: flex;
          align-items: center;
        }
      `}
    </style>
    </>
  )
}
