# App Pokemon

- Aplicación con Next, probando caracteristicas especiales de Next.js

## Desplegado en Vercel

- [Ver en linea](https://next-pokemon-app-beta.vercel.app/)

## Contenido de temas usados en este proyecto

Multiples componentes de NextUI

Flex Layout

Temas de NextUI

Next _document

Navegación

Parámetros por URL

Parámetros estáticos

Next - GetStaticProps (SSG: Static-site generation)

Next - getStaticPaths

## NPM

    npm i @nextui-org/react": "^1.0.0-beta.9

## Notes

- IMG en caso de usar url de imagenes externas, agrega el dominio en el `next.config.js`

      const nextConfig = {
      reactStrictMode: true,
      images: {
        /* Arr of all allowed domains (in this case img) */
        domains: [ 'raw.githubusercontent.com' ],
        }
      }

- INDEX BARRIL en caso necesites usar exportaciones por defecto en un archivo de barril debes exportarlo:

      export { default as pokeApi } from './pokeApi'

- (STATIC) "Automatically rendered as static HTML" significa que el contenido se genera automáticamente en forma de archivos HTML estáticos sin ninguna interacción o procesamiento adicional. Esto implica que el contenido se genera una vez y luego se almacena como un archivo HTML estático, que luego se sirve directamente al usuario sin modificaciones o personalizaciones adicionales.

- (SSG) "automatically generated as static HTML + JSON " implica que el contenido se genera automáticamente, pero puede haber algún procesamiento o personalización adicional antes de que se almacene como un archivo HTML estático. Esto puede incluir la generación dinámica del contenido en función de ciertos parámetros o condiciones, pero una vez generado, se guarda como un archivo HTML estático que se sirve al usuario sin más procesamiento (no hara mas peticiones http).

    En resumen, la diferencia principal radica en si el contenido se genera completamente sin ninguna modificación adicional antes de guardarlo como un archivo HTML estático ("automatically rendered as static HTML"), o si se genera automáticamente con algún procesamiento o personalización adicional antes de guardarlo como un archivo HTML estático ("automatically generated as static HTML").

- EXAMPLE (getStaticPaths) return:

      return {
        paths: [
           {
             params: { id: '1' }
           },
        ],
      }

## Enlaces

- `GetStaticPath` Rutas Dinámicas Utilizando
- [Next.js getStaticPaths](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths)
  
- `GetStaticProps` Static Site Generation Utilizando
- [Next.js getStaticProps](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)
  
- `ISR` Incremental static regeneration
- [Next.js Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)
  
- `Meta data SEO`
- [Open Graph](https://ahrefs.com/blog/open-graph-meta-tags/)

## Vista Previa

![Pantalla Principal](./public/imagenes/next-pokemon.jpeg)

![Pantalla Principal](./public/imagenes/next-pokemon-one.jpeg)
