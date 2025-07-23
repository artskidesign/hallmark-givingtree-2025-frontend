/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [], // Add your image domains as needed
    unoptimized: true, // For static export if needed
  },
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  async redirects() {
    return [
      {
        source: '/signup',
        destination: '/your-tree',
        permanent: true,
      },
    ];
  },
  // Support for existing static assets
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
}

module.exports = nextConfig