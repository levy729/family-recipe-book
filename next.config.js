/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/family-recipe-book',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
