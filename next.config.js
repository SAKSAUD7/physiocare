/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  reactStrictMode: true,
  swcMinify: true,
  
  // Image configuration
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com', 'upload.wikimedia.org'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    unoptimized: true,
  },
  
  // Enable production compression
  compress: true,
  
  // Output mode - always use export for GitHub Pages
  distDir: '.next',
  output: 'export',
  
  // Base path for GitHub Pages (repository name)
  basePath: '/physiocare',
  assetPrefix: '/physiocare/',
  
  // Webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Optimization settings
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 5,
          },
          vendors: false,
        },
      };
    }
    return config;
  },
}

module.exports = nextConfig 