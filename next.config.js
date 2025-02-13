/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/onboarding-step-colors-template' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/onboarding-step-colors-template/' : '',
}

module.exports = nextConfig
