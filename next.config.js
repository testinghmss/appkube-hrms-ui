/** @type {import('next').NextConfig} */
const nextConfig = {

  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      }t   T 
    ],
  },
};


module.exports = nextConfig;
