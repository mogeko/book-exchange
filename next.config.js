/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["loremflickr.com", "cloudflare-ipfs.com"],
  },
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  webpack: (config) => {
    return Object.assign(config, { experiments: { topLevelAwait: true } });
  },
};

module.exports = nextConfig;
