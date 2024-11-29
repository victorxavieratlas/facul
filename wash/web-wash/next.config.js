/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Permitir imagens do localhost (desenvolvimento)
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3007',
        pathname: '/uploads/**',
      },
      // Permitir imagens do bucket S3
      {
        protocol: 'https',
        hostname: 'br-lv-s3-api-images.s3.us-east-1.amazonaws.com',
        pathname: '/**',
      },
      // Permitir imagens em Prod
      {
        protocol: 'https',
        hostname: 'lavarauto.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.lavarauto.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'lavarauto.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'www.lavarauto.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;