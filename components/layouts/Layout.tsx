import { FC, PropsWithChildren } from 'react';

import Head from 'next/head';
import { Navbar } from '../ui/Navbar';

interface Props extends PropsWithChildren {
  title?: string;
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name='author' content='Richard Allcca' />
        <meta name='description' content={`Información sobre el Pokemon ${title}`} />
        <meta name='keywords' content={`${title}. pokemon, pokedex`} />
        <meta property="og:title" content={`Richard Allcca Llano`} />
        <meta property="og:description" content={`Esta el la página sobre ${title}`} />
        <meta property="og:image" content={`${origin}/_next/image?url=%2Fimagenes%2Fbanner.png&w=640&q=75`} />
        {/* <meta property="og:image" content="http://localhost:3000/_next/image?url=%2Fimagenes%2Fbanner.png&w=640&q=75" /> */}
        {/* <meta property="og:image" content="https://res.cloudinary.com/thouma/image/upload/v1659297257/banner_rrvbdo.png" />  */}
      </Head>

      <Navbar />

      <main className='main'>
        {children}
      </main>

    </>
  );
};
