const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: [
    '@hamrotourist/shared-types',
    '@hamrotourist/theme-adventure-bold',
    '@hamrotourist/theme-serene-journey',
    '@hamrotourist/theme-heritage-classic',
    '@hamrotourist/ui-components',
  ],
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'media.hamrotourist.com' },
      { protocol: 'https', hostname: '**.r2.cloudflarestorage.com' },
    ],
  },
}

module.exports = nextConfig
