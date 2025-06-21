/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for local tool
  output: 'export',

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Trailing slash for static export
  trailingSlash: true,

  // Custom webpack config if needed
  webpack: config => {
    return config;
  },
};

module.exports = nextConfig;
