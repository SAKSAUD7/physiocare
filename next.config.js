/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: false, // Disable source maps in production for better performance
  
  // Image configuration
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com', 'upload.wikimedia.org'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ['image/webp'],
    minimumCacheTTL: 60, // Cache images for at least 60 seconds
  },
  
  // Enable production compression
  compress: true,
  
  // Only use static export in production, not in development
  distDir: '.next',
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  
  // Fix the basePath and assetPrefix for both dev and production (removing these if causing issues)
  // basePath: process.env.NODE_ENV === 'production' ? '/physiocare' : '',
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/physiocare/' : '',

  // Experimental features for better performance
  experimental: {
    optimizeCss: true, // Enable CSS optimization
    scrollRestoration: true, // Better scroll experience
    optimizeServerReact: true, // Optimize server-rendered React
  },
  
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
            minChunks: 3,
            priority: 20,
          },
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
        },
      };

      // Add terser config to reduce bundle size
      config.optimization.minimize = true;
    }
    return config;
  },
}

module.exports = nextConfig 