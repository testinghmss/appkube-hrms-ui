/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
      unoptimized: true, // Disable Image Optimization
  },
};

export default nextConfig;