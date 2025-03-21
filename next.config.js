/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com',
        protocol: 'https',
      },
      {
        hostname: 'lh3.googleusercontent.com',
        protocol: 'https',
      },
      {
        hostname: 'source.unsplash.com',
        protocol: 'https',
      },
      {
        hostname: 'krtgdaklbayxqxyhpcpr.supabase.co',
        protocol: 'https',
      },
      {
        hostname: 'picsum.photos',
        protocol: 'https',
      },
    ]
  },
  serverExternalPackages: ['sharp', 'onnxruntime-node'],
};

module.exports = nextConfig;
