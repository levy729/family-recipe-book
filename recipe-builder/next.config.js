/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly override any parent configuration
  // Force server build for local development
  output: undefined, // Explicitly remove output export

  // Simple local development configuration
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
