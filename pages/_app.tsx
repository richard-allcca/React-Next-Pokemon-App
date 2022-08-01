import type { AppProps } from 'next/app';

import { NextUIProvider } from '@nextui-org/react';

import '../styles/globals.css';
// import { darkTheme } from '../themes/darktheme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Component {...pageProps} />
    // <NextUIProvider theme={}>
    // </NextUIProvider>
  )
}

export default MyApp
