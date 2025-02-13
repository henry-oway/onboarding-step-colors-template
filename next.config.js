/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true, // Required for static export
  },
  basePath: process.env.NODE_ENV === 'production' ? '/onboarding-step-colors-template' : '',
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during builds
  },
}

module.exports = nextConfig;
