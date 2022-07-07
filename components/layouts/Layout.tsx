import { FC, PropsWithChildren } from 'react'

import Head from 'next/head'
import { Navbar } from '../ui/Navbar';

interface LayoutProps extends PropsWithChildren {
  title?: string
}


export const Layout: FC<LayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>

        <title>{title || 'Pokemon App'}</title>
        <meta name='author' content='Richard Allcca' />
        <meta name='description' content='Información sobre el Pokemon XXX' />
        <meta name='keywords' content='XXXX. pokemon, pokedex' />

      </Head>

      <Navbar />

      <main className='main'>
        {children}
      </main>

    </>
  )
}
