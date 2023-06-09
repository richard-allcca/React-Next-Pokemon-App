/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    /* Arr of all allowed domains (in this case img) */
    domains: [ 'raw.githubusercontent.com' ],
  }
}

module.exports = nextConfig
