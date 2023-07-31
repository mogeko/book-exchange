/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["loremflickr.com"],
  },
  transpilePackages: ["database"],
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
