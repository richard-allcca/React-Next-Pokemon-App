import { FC, PropsWithChildren } from 'react';

import Head from 'next/head';
import { Navbar } from '../ui/Navbar';

interface Props extends PropsWithChildren {
  title?: string;
}

// Obtiene el dominio de origen para usarlo como path abosoluto de og:image
const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name='author' content='Richard Allcca' />
        <meta name='description' content={`Información sobre ${title}`} />
        <meta name='keywords' content={`pokemon, pokedex`} />
        {/* SEO */}
        <meta property="og:title" content="Pokedex" />
        <meta property="og:description" content={`Información sobre ${title}`} />
        <meta property="og:image" content={`${origin}/_next/image?url=%2Fimagenes%2Fbanner.png&w=640&q=75`} />
      </Head>

      <Navbar />

      <main className='main'>
        {children}
      </main>

    </>
  );
};
