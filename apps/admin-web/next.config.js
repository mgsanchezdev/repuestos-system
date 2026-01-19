/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@repuestos-platform/api-client', '@repuestos-platform/types'],
}

module.exports = nextConfig
