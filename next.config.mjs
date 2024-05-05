/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "360beautyscents.co.ke",
      },
    ],
  },
};

export default nextConfig;
