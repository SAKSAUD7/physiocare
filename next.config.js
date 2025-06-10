/** @type {import('next').NextConfig} */

// Use this configuration for GitHub Pages
const nextConfig = {
  // output: 'export', // Enables static export
  basePath: process.env.NODE_ENV === 'production' ? '/physiocare' : '',
  images: {
    unoptimized: true, // Required for static export
  },
  reactStrictMode: true,
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  // Experimental features
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
}

module.exports = nextConfig 